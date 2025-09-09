import React from 'react';
import Toast, {BaseToast} from 'react-native-toast-message';
import {Dimensions, Image, Platform} from 'react-native';
import useSafeArea, {getGlobalSafeAreaTop} from '../Hooks/useSafeArea';

// Kiểm tra xem thiết bị có phải là tablet không
const {width} = Dimensions.get('window');
const isTablet = width > 600; // Điều chỉnh ngưỡng nếu cần

// Cấu hình toast tùy chỉnh
const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'green',
        width: isTablet ? '70%' : '60%',
        backgroundColor: '#22bb4dff',
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: '#d0ffddff',
      }}
      text1Style={{fontSize: isTablet ? 20 : 16, fontWeight: 'bold'}}
      text2Style={{fontSize: isTablet ? 18 : 15}}
    />
  ),
  error: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'red', width: isTablet ? '70%' : '60%'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{fontSize: isTablet ? 20 : 16, fontWeight: 'bold'}}
      text2Style={{fontSize: isTablet ? 18 : 15}}
      renderLeadingIcon={() => (
        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg',
          }}
          style={{width: 40, height: 40, borderRadius: 20}}
        />
      )}
      renderTrailingIcon={() => (
        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg',
          }}
          style={{width: 40, height: 40, borderRadius: 20}}
        />
      )}
    />
  ),
};

// Hàm hiển thị toast
const showToast = (type, message, message2) => {
  Toast.show({
    type: type,
    text1: message,
    text2: message2,
    position: 'top',
    visibilityTime: 3000, // Lâu hơn trên tablet
    autoHide: true,
    topOffset: 60, // Dịch lên cao hơn một chút trên tablet
    queue: true,
  });
};

const ToastNotification = () => {
  return <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />;
};

export {ToastNotification, showToast};
