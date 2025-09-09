import * as React from 'react';
import {useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
// Import your screens
import HomeSrceen from './HomeSrceen';
import LoginScreen from '../Login/LoginScreen';
import NotificationScreen from './NotificationScreen';
import ProfileScreen from './ProfileScreen';
import ExploreScreen from './ExploreScreen';
// Placeholder screens with bottom padding to avoid tab bar overlap

// function NotificationScreen() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingBottom: 80,
//       }}>
//       <Icon name="bell" size={50} color="#667eea" />
//       <Text style={{marginTop: 10, fontSize: 18, color: '#2d3436'}}>
//         Thông báo
//       </Text>
//     </View>
//   );
// }

// Đã import ProfileScreen từ file riêng

// Animated Tab Icon Component
const AnimatedTabIcon = ({focused, icon, label, iconType = 'Feather'}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;
  const backgroundValue = useRef(new Animated.Value(0)).current;
  const translateYValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (focused) {
      // Parallel animations when focused
      Animated.parallel([
        Animated.spring(animatedValue, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.spring(scaleValue, {
            toValue: 1.1,
            friction: 3,
            useNativeDriver: true,
          }),
          Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
          }),
        ]),
        Animated.spring(rotateValue, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
        Animated.spring(backgroundValue, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
        Animated.spring(translateYValue, {
          toValue: -8,
          friction: 4,
          useNativeDriver: true,
        }),
        Animated.spring(opacityValue, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotateValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateYValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [focused]);

  const backgroundColor = backgroundValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', 'rgba(102, 126, 234, 0.1)'],
  });

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const IconComponent =
    iconType === 'Material'
      ? MaterialIcon
      : iconType === 'Ion'
      ? IonIcon
      : Icon;

  return (
    <Animated.View
      style={[
        styles.tabIconContainer,
        {
          backgroundColor,
          transform: [{translateY: translateYValue}, {scale: scaleValue}],
        },
      ]}>
      {/* <Animated.View style={{transform: [{rotate: focused ? rotate : '0deg'}]}}> */}
      <Animated.View>
        {focused ? (
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.iconGradientContainer}>
            <IconComponent name={icon} size={20} color="#fff" />
          </LinearGradient>
        ) : (
          <IconComponent name={icon} size={25} color="#95a5a6" />
        )}
      </Animated.View>
      {focused && (
        <Animated.Text
          style={[
            styles.tabLabel,
            {
              opacity: opacityValue,
              transform: [{scale: opacityValue}],
            },
          ]}>
          {label}
        </Animated.Text>
      )}
      {focused && (
        <Animated.View
          style={[
            styles.activeDot,
            {
              opacity: opacityValue,
              transform: [{scale: opacityValue}],
            },
          ]}
        />
      )}
    </Animated.View>
  );
};

// Custom Tab Bar Component with animation
const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.customTabBar}>
      <LinearGradient
        colors={['rgba(255,255,255,0.98)', 'rgba(255,255,255,1)']}
        style={styles.tabBarGradient}>
        <View style={styles.tabBarContent}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabButton}
                activeOpacity={1}>
                {options.tabBarIcon({focused: isFocused})}
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="HomeNavigation"
        component={HomeSrceen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({focused}) => (
            <AnimatedTabIcon focused={focused} icon="home" label="Trang chủ" />
          ),
        }}
      />
      <Tab.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Khám phá',
          tabBarIcon: ({focused}) => (
            <AnimatedTabIcon
              focused={focused}
              icon="compass"
              label="Khám phá"
            />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({focused}) => (
            <AnimatedTabIcon focused={focused} icon="bell" label="Thông báo" />
          ),
          tabBarBadge: 3, // Số thông báo
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({focused}) => (
            <AnimatedTabIcon focused={focused} icon="user" label="Tài khoản" />
          ),
        }}
      />
      <Tab.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Đăng nhập',
          tabBarIcon: ({focused}) => (
            <AnimatedTabIcon
              focused={focused}
              icon="log-in"
              label="Đăng nhập"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  customTabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    // Prevent tab bar from covering content
    // backgroundColor: 'transparent',
  },
  tabBarGradient: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  tabBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    minWidth: 60,
  },
  iconGradientContainer: {
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
    color: '#667eea',
    letterSpacing: 0.3,
  },
  activeDot: {
    position: 'absolute',
    bottom: -8,
    width: 30,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#667eea',
  },
});

// Alternative Modern Tab Bar Design (Optional)
export const ModernTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 10,
          backgroundColor: '#ffffff',
          borderRadius: 25,
          height: 70,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.15,
          shadowRadius: 15,
          paddingBottom: 0,
        },
      }}>
      <Tab.Screen
        name="HomeNavigation"
        component={HomeSrceen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.modernTabIcon}>
              <Icon
                name="home"
                size={26}
                color={focused ? '#667eea' : '#95a5a6'}
              />
              {focused && <View style={styles.modernActiveDot} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.modernTabIcon}>
              <Icon
                name="compass"
                size={26}
                color={focused ? '#667eea' : '#95a5a6'}
              />
              {focused && <View style={styles.modernActiveDot} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AddScreen"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.centerButton}>
              <Icon name="plus" size={30} color="#fff" />
            </LinearGradient>
          ),
        }}
      />
      <Tab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.modernTabIcon}>
              <Icon
                name="bell"
                size={26}
                color={focused ? '#667eea' : '#95a5a6'}
              />
              {focused && <View style={styles.modernActiveDot} />}
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.modernTabIcon}>
              <Icon
                name="user"
                size={26}
                color={focused ? '#667eea' : '#95a5a6'}
              />
              {focused && <View style={styles.modernActiveDot} />}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Additional styles for modern design
const modernStyles = StyleSheet.create({
  modernTabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
  },
  modernActiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#667eea',
    marginTop: 4,
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 30,
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -5,
    backgroundColor: '#ff6b6b',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
