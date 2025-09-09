import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrap}>
        <Ionicons name="person-circle" size={90} color="#74b9ff" />
        <Text style={styles.name}>Người dùng demo</Text>
        <Text style={styles.email}>user@email.com</Text>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('Thông tin cá nhân')}>
          <Ionicons name="person-outline" size={22} color="#636e72" style={styles.menuIcon} />
          <Text style={styles.menuText}>Thông tin cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('Đổi mật khẩu')}>
          <Ionicons name="key-outline" size={22} color="#636e72" style={styles.menuIcon} />
          <Text style={styles.menuText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('Đăng xuất')}>
          <Ionicons name="log-out-outline" size={22} color="#d63031" style={styles.menuIcon} />
          <Text style={[styles.menuText, { color: '#d63031' }]}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    paddingTop: 40,
  },
  avatarWrap: {
    alignItems: 'center',
    marginBottom: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#0984e3',
  },
  email: {
    color: '#636e72',
    fontSize: 15,
    marginTop: 2,
  },
  menu: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
});
