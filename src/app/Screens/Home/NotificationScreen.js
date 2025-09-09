import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';
import ReusableFlatList from '../../Components/List/List';
import {useNavigation} from '@react-navigation/native';
import SwipeableRow from '../../Components/List/Item';

const mockNotifications = [
  {
    id: '1',
    title: 'Thông báo mới',
    content: 'Bạn có một thông báo mới.',
    time: '2025-09-08 10:00',
  },
  {
    id: '2',
    title: 'Cập nhật hệ thống',
    content: 'Hệ thống sẽ bảo trì lúc 23:00.',
    time: '2025-09-07 15:30',
  },
  {
    id: '3',
    title: 'Khuyến mãi',
    content: 'Nhận ưu đãi 50% cho đơn hàng đầu tiên!',
    time: '2025-09-06 09:00',
  },
];

export default function NotificationScreen() {
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const filtered = mockNotifications.filter(
    n =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()),
  );

  const onRefresh = () => {
    setRefreshing(true);
    // Giả lập delay refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  //   const renderItem = ({item}) => (
  //     <TouchableOpacity
  //       style={styles.card}
  //       onPress={() =>
  //         navigation.navigate('NotificationDetail', {notification: item})
  //       }>
  //       <Text style={styles.title}>{item.title}</Text>
  //       <Text style={styles.content} numberOfLines={2}>
  //         {item.content}
  //       </Text>
  //       <Text style={styles.time}>{item.time}</Text>
  //     </TouchableOpacity>
  //   );

  const renderItem = ({item}) => (
    <SwipeableRow
      item={item}
      // onPin={it => console.log('Ghim', it.id)}
      onRead={it => console.log('Đã đọc', it.id)}
      onDelete={it => console.log('Xoá', it.id)}
      // stylesOuter={{ card: styles.card, image: styles.image }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.card}
        onPress={() =>
          navigation.navigate('NotificationDetail', {notification: item})
        }>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content} numberOfLines={2}>
          {item.content}
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </TouchableOpacity>
    </SwipeableRow>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <CustomTextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Tìm kiếm thông báo..."
          isSearch
          style={{marginBottom: 16}}
        />

        <ReusableFlatList
          data={filtered}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={
            <Text style={styles.empty}>Không có thông báo</Text>
          }
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 30,
  },
  card: {
    backgroundColor: '#f1f2f6',
    borderRadius: 5,
    padding: 14,
    // marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    marginBottom: 4,
  },
  content: {
    color: '#555',
    fontSize: 14,
    marginBottom: 6,
  },
  time: {
    color: '#888',
    fontSize: 12,
    textAlign: 'right',
  },
  empty: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 40,
    fontSize: 16,
  },
});
