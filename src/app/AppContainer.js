import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { RecoilRoot } from 'recoil';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import Splash from './Screens/Splash/Splash';
import {RootNavigation} from './Common/RootNavigation';
import TabNavigation, { NotificationStack } from './Screens/Home/TabNavigation';
import NotificationDetailScreen from './Screens/Home/NotificationDetailScreen';

export default function () {
  const [visible, setVisible] = React.useState(false);
  const AppStack = () => {
    const MainStack = createNativeStackNavigator();
    return (
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Home" component={TabNavigation} />
        <MainStack.Screen name="NotificationDetail" component={NotificationDetailScreen} options={{ headerShown: false }} />
      </MainStack.Navigator>
    );
  };
  const SplashScreen = setVisible => {
    const SplashStack = createNativeStackNavigator();
    return (
      <SplashStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <SplashStack.Screen
          name="splash"
          children={props => {
            return <Splash {...props} setVisible={setVisible}></Splash>;
          }}
        />
      </SplashStack.Navigator>
    );
  };

  return (
    <RecoilRoot>
      <NavigationContainer ref={RootNavigation}>
        {visible ? AppStack() : SplashScreen(setVisible)}
        {/* {AppStack()} */}
      </NavigationContainer>
    </RecoilRoot>
  );
}
// const HomeScreenS = () => {
//   const Drawer = createDrawerNavigator();
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="HomeScreen" component={HomeScreen} />
//         <Drawer.Screen name="News" component={News} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };
