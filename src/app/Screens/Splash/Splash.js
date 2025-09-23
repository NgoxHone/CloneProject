import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Animated,
  Alert,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useRecoilState} from 'recoil';
import {splashDataState} from './splashState';
import {MAX_W} from '../../Common/GlobalStyles';
import {
  getMenu,
  getPermission,
  guestLogin,
  guestLogin2,
} from '../../Api/Actions';
import {showToast} from '../../Components/ToastConfig';
// import {getApi} from '../../Api/Api'; // ví dụ: nếu cần thêm API khác thì import

const STEP_DURATION = 400; // thời gian animate cho mỗi bước (ms)

const Splash = ({setVisible}) => {
  const [splashData, setSplashData] = useRecoilState(splashDataState);
  const {loading, error} = splashData;

  const progress = useRef(new Animated.Value(0)).current;
  const currentAnimRef = useRef(null);

  // tiện ích animate đến 1 "tỉ lệ" (0..1)
  const animateTo = (ratio, onEnd) => {
    if (currentAnimRef.current) {
      currentAnimRef.current.stop();
    }
    const anim = Animated.timing(progress, {
      toValue: ratio,
      duration: STEP_DURATION,
      useNativeDriver: false, // animate width => false
    });
    currentAnimRef.current = anim;
    anim.start(({finished}) => {
      if (finished && onEnd) onEnd();
    });
  };

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      // Khai báo danh sách API theo thứ tự muốn gọi
      const apiTasks = [
        () => guestLogin(),
        () => getPermission(),
        () => getMenu(),
      ];
      const total = apiTasks.length;
      setSplashData({loading: true, data: null, error: null});
      progress.setValue(0);

      const results = [];
      try {
        for (let i = 0; i < total; i++) {
          const res = await apiTasks[i]();
          if (cancelled) return;

          if (!res) {
            console.log('LOII', res);
          }

          results.push(res);
          const done = i + 1;
          const ratio = done / total;
          if (done === total) {
            animateTo(1, () => {
              if (!cancelled) {
                setSplashData({loading: false, data: results, error: null});
                setVisible(true);
              }
            });
          } else {
            animateTo(ratio);
          }
        }
      } catch (err) {
        console.log('Splash error:', err);
        showToast('error', 'Đã có lỗi xảy ra vui lòng thử lại sau!', false);
        if (cancelled) return;
        setSplashData({
          loading: false,
          data: null,
          error: err?.message || 'Có lỗi xảy ra',
        });
      }
    };

    run();

    return () => {
      cancelled = true;
      if (currentAnimRef.current) currentAnimRef.current.stop();
      progress.stopAnimation();
    };
  }, []);
  console.log(splashData);
  return (
    <ImageBackground
      // source={require('../../asset/Image/default_image.png')}
      source={{
        uri: 'https://static.vecteezy.com/system/resources/thumbnails/040/890/255/small_2x/ai-generated-empty-wooden-table-on-the-natural-background-for-product-display-free-photo.jpg',
      }}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.overlay}>
        <Text style={styles.title}>Splash</Text>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>

        {loading && <Text style={styles.loadingText}>Loading...</Text>}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {'Hiện tại không thể kết nối đến máy chủ vui lòng thử lại sau'}
            </Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 40,
    textTransform: 'uppercase',
  },
  progressBarContainer: {
    width: MAX_W * 0.6,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00b894',
    borderRadius: 5,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
  errorContainer: {
    backgroundColor: '#FFE6E6', // Màu đỏ nhạt cho nền
    padding: 10, // Khoảng cách bên trong
    borderRadius: 8, // Bo góc
    borderWidth: 0.5, // Viền
    borderColor: '#FF9999', // Màu viền đỏ nhạt
    marginVertical: 10, // Khoảng cách trên dưới
    marginHorizontal: 15, // Khoảng cách trái phải
  },
  errorText: {
    color: '#CC0000', // Màu chữ đỏ đậm để nổi bật
    fontSize: 14, // Kích thước chữ
    fontWeight: '500', // Độ đậm chữ
    textAlign: 'center', // Căn giữa
  },
});
