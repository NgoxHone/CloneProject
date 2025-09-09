import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (!email.includes('@')) {
      setError('Email không hợp lệ');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    setError('');
    // TODO: Xử lý đăng nhập thực tế ở đây
    alert('Đăng nhập thành công!');
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1080',
      }}
      style={styles.backgroundImage}
      blurRadius={1}>
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
        style={styles.gradient}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}>
              <Animated.View
                style={[
                  styles.innerContainer,
                  {
                    opacity: fadeAnim,
                    transform: [{translateY: slideAnim}, {scale: scaleAnim}],
                  },
                ]}>
                {/* Glass Card Container */}
                <View style={styles.glassCard}>
                  {/* Logo Section */}
                  <View style={styles.logoContainer}>
                    <LinearGradient
                      colors={['#667eea', '#764ba2']}
                      style={styles.logoGradient}>
                      <Icon name="lock" size={25} color="#fff" />
                    </LinearGradient>
                  </View>

                  <Text style={styles.title}>CSC</Text>
                  <Text style={styles.subtitle}>
                    Đăng nhập vào tài khoản của bạn
                  </Text>

                  {/* Email Input */}
                  <View
                    style={[
                      styles.inputContainer,
                      emailFocused && styles.inputContainerFocused,
                    ]}>
                    <Icon
                      name="mail"
                      size={20}
                      color={emailFocused ? '#667eea' : '#999'}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Email hoặc Tên đăng nhập"
                      placeholderTextColor="#999"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                    />
                  </View>

                  {/* Password Input */}
                  <View
                    style={[
                      styles.inputContainer,
                      passwordFocused && styles.inputContainerFocused,
                    ]}>
                    <Icon
                      name="lock"
                      size={20}
                      color={passwordFocused ? '#667eea' : '#999'}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Mật khẩu"
                      placeholderTextColor="#999"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.showHideBtn}>
                      <Icon
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={20}
                        color="#667eea"
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Error Message */}
                  {error ? (
                    <Animated.View style={styles.errorContainer}>
                      <Icon name="alert-circle" size={16} color="#ff6b6b" />
                      <Text style={styles.errorText}>{error}</Text>
                    </Animated.View>
                  ) : null}

                  {/* Remember Me & Forgot Password */}
                  <View style={styles.optionsContainer}>
                    <TouchableOpacity style={styles.rememberContainer}>
                      <Icon name="check-square" size={18} color="#667eea" />
                      <Text style={styles.rememberText}>Nhớ mật khẩu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.forgotText}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Login Button */}
                  <TouchableOpacity
                    style={styles.loginBtnContainer}
                    onPress={handleLogin}
                    activeOpacity={0.8}>
                    <LinearGradient
                      colors={['#667eea', '#764ba2']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={styles.loginBtn}>
                      <Text style={styles.loginBtnText}>Đăng nhập</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* Social Login */}
                  <View style={styles.socialContainer}>
                    <View style={styles.dividerContainer}>
                      <View style={styles.divider} />
                      <Text style={styles.dividerText}>
                        Hoặc đăng nhập bằng
                      </Text>
                      <View style={styles.divider} />
                    </View>

                    {/* <View style={styles.socialButtons}>
                      <TouchableOpacity style={styles.socialBtn}>
                        <Icon name="facebook" size={24} color="#3b5998" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.socialBtn}>
                        <MaterialIcon name="google" size={24} color="#ea4335" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.socialBtn}>
                        <Icon name="github" size={24} color="#333" />
                      </TouchableOpacity>
                    </View> */}
                    <TouchableOpacity
                      style={styles.loginBtnContainer}
                      onPress={handleLogin}
                      activeOpacity={0.8}>
                      <LinearGradient
                        colors={['#9FC5E8', '#c39977']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={styles.loginBtn}>
                        <Text style={styles.loginBtnText}>Đăng nhập SSO</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  {/* Sign Up Link */}
                  <View style={styles.signupContainer}>
                    <Text style={styles.signupTextNormal}>
                      Chưa có tài khoản?
                    </Text>
                    <TouchableOpacity>
                      <Text style={styles.signupText}> Đăng ký ngay</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Animated.View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  glassCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 20,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoGradient: {
    width: 49,
    height: 49,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#636e72',
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 56,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    transition: 'all 0.3s',
  },
  inputContainerFocused: {
    borderColor: '#667eea',
    backgroundColor: '#fff',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2d3436',
    paddingVertical: 0,
  },
  showHideBtn: {
    padding: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    color: '#636e72',
    fontSize: 14,
    marginLeft: 6,
  },
  forgotText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '600',
  },
  loginBtnContainer: {
    width: '100%',
    marginBottom: 24,
  },
  loginBtn: {
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe0e0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  errorText: {
    color: '#ff6b6b',
    marginLeft: 6,
    fontSize: 14,
    flex: 1,
  },
  socialContainer: {
    width: '100%',
    marginBottom: 24,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#dfe6e9',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#636e72',
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e4e8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupTextNormal: {
    color: '#636e72',
    fontSize: 15,
  },
  signupText: {
    color: '#667eea',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
