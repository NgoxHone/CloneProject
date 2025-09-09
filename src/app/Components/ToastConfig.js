import React from 'react';
import Toast, {BaseToast} from 'react-native-toast-message';
import {Dimensions, Platform} from 'react-native';

// Kiểm tra xem thiết bị có phải là tablet không
const {width} = Dimensions.get('window');
const isTablet = width > 600; // Điều chỉnh ngưỡng nếu cần

// Cấu hình toast tùy chỉnh
const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'green', width: isTablet ? '70%' : '60%'}}
      contentContainerStyle={{paddingHorizontal: 15}}
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
    />
  ),
};

// Hàm hiển thị toast
const showToast = (type, message, message2) => {
  Toast.show({
    type: type,
    text1: message,
    text2: message2,
    position: 'bottom',
    visibilityTime: 3000, // Lâu hơn trên tablet
    autoHide: true,
    bottomOffset: isTablet ? 80 : 50, // Dịch lên cao hơn một chút trên tablet
    queue: true,
  });
};

const ToastNotification = () => {
  return <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />;
};

export {ToastNotification, showToast};
