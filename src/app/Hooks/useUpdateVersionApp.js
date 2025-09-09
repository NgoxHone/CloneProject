// src/hooks/useUpdateVersion.js
import {useState} from 'react';
import axios from 'axios';
import HotUpdate from 'react-native-ota-hot-update';
import DeviceInfo from 'react-native-device-info';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {Alert} from 'react-native';
import {Platform} from 'react-native';
import Global from '../LocalData/Global';

const API_URL = 'https://ota-update.csctech.vn';

const requestUpdateBundle = async token => {
  const endpoint = Platform.OS === 'ios' ? 'ios-ipads' : 'androids';
  const version = DeviceInfo.getVersion();

  const res = await axios.get(
    `${API_URL}/api/${endpoint}?populate=*&filters[targetVersion][$eq]=${version}&sort=id:desc&filters[note][$contains]=${Global.updateVersionAppName}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

const getJwtToken = async () => {
  try {
    const res = await axios.post(`${API_URL}/api/auth/local`, {
      identifier: 'guest@gmail.com',
      password: '1q2w3E*',
    });

    return res.data.jwt;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Không thể lấy token xác thực');
  }
};

export const useUpdateVersion = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [updateInfo, setUpdateInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const checkUpdate = async (silentMode = false) => {
    // Tránh gọi lại khi đang loading hoặc modal đã hiện
    if (isLoading || showModal) return;
    setIsLoading(true);
    try {
      const token = await getJwtToken();
      const bundle = await requestUpdateBundle(token);
      const currentVersion = await HotUpdate.getCurrentVersion();

      if (bundle?.data?.length) {
        const enabled = bundle.data.filter(item => item.enable === true);
        if (enabled.length === 0) {
          if (!silentMode) {
            Alert.alert('Thông báo', 'Không có bản cập nhật nào.');
          }
          return false;
        }

        const item = enabled[0];
        const latestVersion = item.id || 0;
        const isRequired = item.required || false;
        const updateNotes = item.note || 'Có bản cập nhật mới cho ứng dụng';

        if (latestVersion > currentVersion) {
          const bundleUrl = item?.bundle?.[0]?.url
            ? `${API_URL}${item.bundle[0].url}`
            : null;

          if (!bundleUrl) {
            if (!silentMode)
              Alert.alert('Lỗi', 'Không tìm thấy file cập nhật.');
            return false;
          }

          // Chỉ set state nếu khác giá trị cũ
          setUpdateInfo(prev => {
            if (
              prev &&
              prev.version === latestVersion &&
              prev.bundleUrl === bundleUrl
            ) {
              return prev;
            }
            return {
              version: latestVersion,
              notes: updateNotes,
              required: isRequired,
              bundleUrl,
            };
          });
          if (!showModal) setShowModal(true);
          return true;
        } else {
          if (!silentMode)
            Alert.alert('Thông báo', 'Bạn đang dùng phiên bản mới nhất!');
        }
      } else {
        if (!silentMode)
          Alert.alert('Thông báo', 'Không tìm thấy bản cập nhật.');
      }
    } catch (error) {
      console.error('Update check error:', error);
      if (!silentMode) {
        Alert.alert('Lỗi', error.message || 'Không thể kiểm tra cập nhật');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const startUpdateBundle = async (url, version) => {
    setIsLoading(true);
    try {
      await HotUpdate.downloadBundleUri(ReactNativeBlobUtil, url, version, {
        updateSuccess: async () => {
          const current = await HotUpdate.getCurrentVersion();
          Alert.alert('Cập nhật thành công', `Khởi động lại app (${current})`);
          setTimeout(() => HotUpdate.resetApp(), 1000);
        },
        updateFail: error => {
          Alert.alert('Lỗi', error.message || 'Không thể cài bản cập nhật');
        },
        restartAfterInstall: true,
        progress: (received, total) => {
          const pct = Math.round((received / total) * 100);
          setProgress(pct);
        },
      });
    } catch (error) {
      Alert.alert('Lỗi', error.message || 'Không thể tải bản cập nhật');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUpdate = async () => {
    try {
      setIsLoading(true);
      await HotUpdate.removeUpdate();
      Alert.alert('Thành công', 'Đã xóa bản cập nhật.');
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setUpdateInfo(null);
  };

  return {
    checkUpdate,
    deleteUpdate,
    isLoading,
    progress,
    updateInfo,
    showModal,
    setShowModal,
    closeModal,
    startUpdateBundle,
  };
};
