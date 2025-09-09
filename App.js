// App.js
import React, {useEffect, useState, useMemo} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import AppContainer from './src/app/AppContainer';
import HotUpdate from 'react-native-ota-hot-update';
import {useUpdateVersion} from './src/app/Hooks/useUpdateVersionApp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RecoilRoot} from 'recoil';
import Toast from 'react-native-toast-message';

const {width} = Dimensions.get('window');
const isSmallScreen = width < 360;

// Hàm throttle để giới hạn tần suất cập nhật
const throttle = (func, wait) => {
  let timeout;
  return (...args) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func(...args);
      }, wait);
    }
  };
};

/** ============ Modal cập nhật ============ */
const UpdateModal = ({
  visible,
  updateInfo,
  onClose,
  onUpdate,
  isLoading,
  progress,
  error,
}) => {
  if (!updateInfo) return null;

  const isRequired = !!updateInfo.required;

  return (
    <Modal
      visible={visible}
      transparent
      animationType={isRequired ? 'none' : 'fade'}
      onRequestClose={() => {
        if (!isRequired) onClose();
      }}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Icon name="system-update" size={28} color="#4285F4" />
            <Text style={styles.modalTitle}>Bản cập nhật mới</Text>
          </View>

          <View style={[styles.modalBody, {marginTop: 10}]}>
            <Text style={styles.notesText}>
              Đã có bản cập nhật mới.{'\n'}Vui lòng cập nhật để có trải nghiệm
              tốt nhất.
            </Text>
            {isRequired && !isLoading && (
              <Text
                style={[styles.notesText, {marginTop: 6, color: '#D93025'}]}>
                Cập nhật bắt buộc — đang chuẩn bị tải…
              </Text>
            )}
            {error && (
              <Text
                style={[styles.notesText, {marginTop: 6, color: '#D93025'}]}>
                Lỗi: {error.message}. Vui lòng thử lại.
              </Text>
            )}
          </View>

          {isLoading && (
            <View style={styles.modalBody}>
              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>
                  {progress < 100
                    ? `Đang tải: ${progress}%`
                    : 'Đang áp dụng cập nhật...'}
                </Text>
                <View style={styles.progressBar}>
                  <View
                    style={[styles.progressFill, {width: `${progress}%`}]}
                  />
                </View>
              </View>
            </View>
          )}

          <View style={styles.modalFooter}>
            {!isRequired && !isLoading && (
              <TouchableOpacity
                style={[styles.button, styles.buttonSecondary]}
                onPress={onClose}>
                <Text style={styles.buttonSecondaryText}>Để sau</Text>
              </TouchableOpacity>
            )}
            {error && (
              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary]}
                onPress={() =>
                  onUpdate(updateInfo.bundleUrl, updateInfo.version)
                }>
                <Icon name="refresh" size={16} color="#FFF" />
                <Text style={styles.buttonPrimaryText}>Thử lại</Text>
              </TouchableOpacity>
            )}
            {!isRequired && !isLoading && !error && (
              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary]}
                onPress={() =>
                  onUpdate(updateInfo.bundleUrl, updateInfo.version)
                }>
                <Icon name="download" size={16} color="#FFF" />
                <Text style={styles.buttonPrimaryText}>Cập nhật ngay</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

/** ============ App ============ */
const App = () => {
  const {
    checkUpdate,
    isLoading,
    progress,
    updateInfo,
    showModal,
    closeModal,
    startUpdateBundle,
    error,
  } = useUpdateVersion();

  const [initialized, setInitialized] = useState(false);
  const [checkingForUpdates, setCheckingForUpdates] = useState(true);

  // Memoize updateInfo để tránh rerender không cần thiết
  const memoizedUpdateInfo = useMemo(
    () => updateInfo,
    [updateInfo?.version, updateInfo?.bundleUrl],
  );

  useEffect(() => {
    const init = async () => {
      try {
        const v = await HotUpdate.getCurrentVersion();
        console.log('App started with bundle version:', v);
        const hasUpdate = await checkUpdate(true);
        if (!hasUpdate) setTimeout(() => setInitialized(true), 800);
      } catch (e) {
        console.warn('Initialization error:', e);
        setInitialized(true);
      } finally {
        setCheckingForUpdates(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (showModal && memoizedUpdateInfo?.required && !isLoading && !error) {
      startUpdateBundle(
        memoizedUpdateInfo.bundleUrl,
        memoizedUpdateInfo.version,
      );
    }
  }, [showModal, memoizedUpdateInfo, isLoading, error, startUpdateBundle]);

  const handleCloseModal = () => {
    closeModal();
    if (memoizedUpdateInfo && !memoizedUpdateInfo.required)
      setInitialized(true);
  };

  const canEnterApp = initialized && !showModal;

  return (
    <RecoilRoot>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {canEnterApp ? (
        <>
          <AppContainer />
          <Toast />
        </>
      ) : (
        <ImageBackground
          source={{
            uri: 'https://png.pngtree.com/thumb_back/fw800/background/20231230/pngtree-web-page-design-enhanced-with-abstract-dot-background-texture-image_13891510.png',
          }}
          style={styles.container}
          resizeMode="cover">
          {!showModal && (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#1A73E8" />
              <Text style={styles.loadingText}>
                {checkingForUpdates
                  ? 'Đang kiểm tra cập nhật…'
                  : 'Chuẩn bị khởi chạy…'}
              </Text>
            </View>
          )}

          <UpdateModal
            visible={showModal}
            updateInfo={memoizedUpdateInfo}
            onClose={handleCloseModal}
            onUpdate={startUpdateBundle}
            isLoading={isLoading}
            progress={progress}
            error={error}
          />
        </ImageBackground>
      )}
    </RecoilRoot>
  );
};

export default App;

/** ============ Styles ============ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  loadingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 12,
  },
  loadingText: {
    marginTop: 10,
    fontSize: isSmallScreen ? 14 : 16,
    color: '#5F6368',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * (isSmallScreen ? 0.9 : 0.8),
    maxWidth: 500,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: isSmallScreen ? 20 : 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {elevation: 8},
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: isSmallScreen ? 20 : 22,
    fontWeight: '700',
    color: '#212121',
    marginLeft: 12,
  },
  modalBody: {
    marginBottom: 20,
  },
  notesText: {
    fontSize: isSmallScreen ? 14 : 15,
    color: '#5F6368',
    lineHeight: 22,
    textAlign: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 12,
    width: '100%',
  },
  progressText: {
    marginBottom: 8,
    fontSize: isSmallScreen ? 14 : 15,
    color: '#5F6368',
    fontWeight: '500',
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#E8EAED',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1A73E8',
    borderRadius: 5,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {elevation: 3},
    }),
  },
  buttonPrimary: {
    backgroundColor: '#1A73E8',
  },
  buttonSecondary: {
    backgroundColor: '#F1F3F4',
    borderWidth: 1,
    borderColor: '#DADCE0',
  },
  buttonPrimaryText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: isSmallScreen ? 15 : 16,
    marginLeft: 10,
    letterSpacing: 0.3,
  },
  buttonSecondaryText: {
    color: '#3C4043',
    fontWeight: '600',
    fontSize: isSmallScreen ? 15 : 16,
    letterSpacing: 0.3,
  },
});
