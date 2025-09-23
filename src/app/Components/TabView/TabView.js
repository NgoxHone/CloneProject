import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const { width } = Dimensions.get('window');

const CustomTabView = ({ routes, renderScene, tabBarProps = {}, style, ...otherProps }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={[styles.indicator, tabBarProps.indicatorStyle]}
      style={[styles.tabBar, tabBarProps.style]}
      labelStyle={[styles.label, tabBarProps.labelStyle]}
      activeColor={tabBarProps.activeColor || '#007AFF'}
      inactiveColor={tabBarProps.inactiveColor || '#8E8E93'}
      pressColor={tabBarProps.pressColor || 'rgba(0, 122, 255, 0.1)'}
      scrollEnabled={tabBarProps.scrollEnabled || false}
      tabStyle={[styles.tab, tabBarProps.tabStyle]}
      renderLabel={({ route, focused, color }) => (
        <Text style={[styles.labelText, { color }, tabBarProps.labelStyle]}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
      style={[styles.container, style]}
      {...otherProps}
    />
  );
};

// Component mẫu để demo
const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
    <Text style={styles.sceneText}>Tab đầu tiên</Text>
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
    <Text style={styles.sceneText}>Tab thứ hai</Text>
  </View>
);

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#3f51b5' }]}>
    <Text style={styles.sceneText}>Tab thứ ba</Text>
  </View>
);

// Component demo với dữ liệu mẫu
const DemoTabView = () => {
  const routes = [
    { key: 'first', title: 'Đầu tiên' },
    { key: 'second', title: 'Thứ hai' },
    { key: 'third', title: 'Thứ ba' },
  ];

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <CustomTabView 
      routes={routes} 
      renderScene={renderScene}
      tabBarProps={{
        activeColor: '#007AFF',
        inactiveColor: '#8E8E93',
        indicatorStyle: { backgroundColor: '#007AFF' },
        style: { backgroundColor: '#FFFFFF' },
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  indicator: {
    backgroundColor: '#007AFF',
    height: 3,
    borderRadius: 1.5,
  },
  tab: {
    // Style mặc định cho mỗi tab
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    textTransform: 'none',
  },
  labelText: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sceneText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CustomTabView;
export { DemoTabView };