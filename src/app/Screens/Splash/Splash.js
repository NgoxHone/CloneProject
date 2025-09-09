import {StyleSheet, Text, View, ImageBackground, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useRecoilState} from 'recoil';
import {splashDataState} from './splashState';
import {getApi} from '../../Api/Api';
import {MAX_W} from '../../Common/GlobalStyles';

const Splash = ({setVisible}) => {
  const [splashData, setSplashData] = useRecoilState(splashDataState);
  const {loading, data, error} = splashData;

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let isMounted = true;
    setSplashData({loading: true, data: null, error: null});
    // getApi('/your-api-url')
    //   .then(response => {
    //     if (isMounted)
    //       setSplashData({loading: false, data: response.data, error: null});
    //   })
    //   .catch(err => {
    //     if (isMounted)
    //       setSplashData({loading: false, data: null, error: err.message});
    //   });
    // return () => {
    //   isMounted = false;
    // };
  }, [setSplashData]);

  useEffect(() => {
    // if (!loading && data) {
    //   setVisible(true);
    // }

    setTimeout(() => {
      setVisible(true);
    }, 1500);
    Animated.timing(progress, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => setVisible(false));
  }, [loading, data, setVisible, progress]);

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
        {/* Custom Progress Bar */}
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
        {error && <Text style={styles.errorText}>{error}</Text>}
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
});
