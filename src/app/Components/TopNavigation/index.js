import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeArea} from 'react-native-safe-area-context';
import {MAX_W} from '../../Common/GlobalStyles';
import {AppColors} from '../../Common/AppColor';

const TopNavigation = ({navigation, title, right}) => {
  const safeArea = useSafeArea();

  const H = safeArea.top + 60;

  return (
    <ImageBackground
      source={{
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR132TBAD0-GhGhN8_2Xr-3obkFd4NzFbk6Hg&s',
      }}
      style={[styles.container, {height: H}]}
      imageStyle={styles.bgImage}
      blurRadius={Platform.OS === 'ios' ? 16 : 10}>
      <View style={[StyleSheet.absoluteFill, styles.overlay]} />
      <View style={[styles.row, {paddingTop: safeArea.top}]}>
        {/* Back */}
        {navigation && (
          <TouchableOpacity
            onPress={() => navigation.goBack?.()}
            activeOpacity={0.7}
            style={styles.BtnBack}
            hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
            <Ionicons name="arrow-back" size={22} color="#2F2F2F" />
          </TouchableOpacity>
        )}
        {/* Title ở giữa */}
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        {/* Slot bên phải (optional), để nút search/more...; nếu không truyền, render spacer */}
        <View style={{width: 40, alignItems: 'flex-end'}}>{right ?? null}</View>
      </View>
    </ImageBackground>
  );
};

export default TopNavigation;

const styles = StyleSheet.create({
  container: {
    width: MAX_W,
    justifyContent: 'center',
    zIndex: 100,
    backgroundColor: '#FFF', // fallback nếu ảnh chưa load
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  // borderBottomWidth: 1,
  // borderBottomColor: '#ddd',
  // Làm ảnh “nhạt nhạt”
  bgImage: {
    opacity: 0.95, // độ nhạt của ảnh; tăng/giảm tuỳ thích
    resizeMode: 'cover',
  },
  // Lớp phủ rất mỏng để đảm bảo độ tương phản
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.1)', // nếu ảnh tối, đổi thành 'rgba(0,0,0,0.2)'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  BtnBack: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',

    // shadow iOS
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    // shadow Android
    elevation: 2,
  },
  title: {
    flex: 1,
    // textAlign: 'center',
    // marginHorizontal: 10,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: '700',
    color: AppColors.Gray, // nếu ảnh tối quá hãy đổi thành '#fff'
  },
});
