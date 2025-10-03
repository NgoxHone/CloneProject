import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <View style={styles.btnHeader}>
            <Icon name="menu" size={28} color="#5d5d5d" />
          </View>
          <Text>Nông nghiệp Cà Mau</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={[styles.btnHeader, {marginRight: 10}]}>
            <Icon name="search" size={28} color="#5d5d5d" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnHeader}>
            <Icon name="notifications" size={28} color="#5d5d5d" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  headerLeft: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnHeader: {
    backgroundColor: '#cccc',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45,
  },
});
