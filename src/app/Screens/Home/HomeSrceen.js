import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import ReusableFlatList from '../../Components/List/List';

const HomeSrceen = () => {
  const data = [
    {
      id: '1',
      title: 'First Item',
      image: 'https://via.placeholder.com/400x300.png?text=Image+1', // Placeholder image
      time: '10:00 AM',
      description: 'This is the first item description',
    },
    {
      id: '2',
      title: 'Second Item',
      image: 'https://via.placeholder.com/400x300.png?text=Image+2',
      time: '11:00 AM',
      description: 'This is the second item description',
    },
  ];
  const [items, setItems] = useState(data);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Hàm làm mới
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Lấy dữ liệu mới từ API hoặc cập nhật dữ liệu
    setTimeout(() => {
      const newItems = [
        {
          id: '3',
          title: 'New Item',
          image: 'https://via.placeholder.com/400x300.png?text=Image+3',
          time: '12:00 PM',
          description: 'This is a new item',
        },
        ...items,
      ];
      setItems(newItems);
      setRefreshing(false);
    }, 1500); // Giả lập việc gọi API
  }, [items]);
  const loadMoreData = () => {
    if (loadingMore) return;
    setLoadingMore(true);
    // Gọi API để tải thêm dữ liệu
    setTimeout(() => {
      const moreItems = [
        {
          id: items.length + 1 + '',
          title: `Item ${items.length + 1}`,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${
            items.length + 1
          }.gif`,
          time: '1:00 PM',
          description: `This is item ${items.length + 1} description`,
        },
      ];
      setItems([...items, ...moreItems]);
      setLoadingMore(false);
    }, 1500); // Giả lập việc gọi API
  };
  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.time}>{item.time}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
  const renderEmpty = () => (
    <Text style={styles.emptyText}>No items found</Text>
  );
  return (
    <View style={{flex: 1}}>
      <Text>HomeSrceen</Text>
      <ReusableFlatList
        data={items}
        onRefresh={onRefresh}
        refreshing={refreshing}
        loadMoreData={loadMoreData}
        loadingMore={loadingMore}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

export default HomeSrceen;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 120, // 4:3 ratio (width/height = 4/3)
    height: 90, // Adjust to maintain the aspect ratio
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
  },
});
