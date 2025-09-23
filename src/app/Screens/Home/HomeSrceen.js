import {Image, StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import PushNotificationButton from '../../Components/PushNotificationButton';
import React, {useCallback, useState} from 'react';
import Button from '../../Components/Button';
import MultiSelect from '../../Components/MultiSelect';
import ReusableFlatList from '../../Components/List/List';
import Checkbox from '../../Components/Checkbox';
import Table from '../../Components/Table';
import Dropdown from '../../Components/Dropdown';
import ImageViewer from '../../Components/ImageViewer';
import FileViewer from '../../Components/FileViewer';
import FileUpload from '../../Components/FileUpload';
import CustomTextInput from '../../Components/CustomTextInput';

import DateTimePicker from '../../Components/DateTimePicker';
import Loading from '../../Components/Loading';
import {showInfoToast, showToast} from '../../Components/ToastConfig';
import ActionMenu from '../../Components/ActionMenu';
import SwipeableRow from '../../Components/List/Item';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RichTextEditor from '../../Components/RichTextEditor';
import CustomTabView from '../../Components/TabView/TabView';
import {SceneMap} from 'react-native-tab-view';
import CollapsibleView from '../../Components/CollapsibleView';
const HomeSrceen = () => {
  // State cho search input
  const [searchText, setSearchText] = useState('');
  // Demo data cho FlatList cũ
  const data = [
    {
      id: '1',
      title: 'First Item',
      image:
        'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg',
      time: '10:00 AM',
      description: 'This is the first item description',
    },
    {
      id: '2',
      title: 'Second Item',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      time: '11:00 AM',
      description: 'This is the second item description',
    },
  ];
  const [items, setItems] = useState(data);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  // State cho các component demo
  const [checked, setChecked] = useState(false);
  const [dropdownValue, setDropdownValue] = useState();
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [imageViewerIndex, setImageViewerIndex] = useState(0);
  const [dateValue, setDateValue] = useState(new Date());
  const [multiSelected, setMultiSelected] = useState([]);
  const multiOptions = [
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 'Orange', value: 'orange'},
    {label: 'Mango', value: 'mango'},
    {label: 'Grape', value: 'grape'},
    {label: 'Pineapple', value: 'pineapple'},
    {label: 'Watermelon', value: 'watermelon'},
  ];
  const [richValue, setRichValue] = useState('');

  // TabView state và data
  const tabRoutes = [
    {key: 'home', title: 'Trang chủ'},
    {key: 'search', title: 'Tìm kiếm'},
    {key: 'profile', title: 'Hồ sơ'},
  ];

  // Render scenes cho TabView
  const renderTabScene = ({route}) => {
    switch (route.key) {
      case 'home':
        return (
          <View style={styles.tabScene}>
            <Icon name="home" size={50} color="#007AFF" />
            <Text style={styles.tabText}>Trang chủ</Text>
            <Text style={styles.tabDescription}>
              Nội dung trang chủ hiển thị ở đây
            </Text>
          </View>
        );
      case 'search':
        return (
          <View style={styles.tabScene}>
            <Icon name="magnify" size={50} color="#007AFF" />
            <Text style={styles.tabText}>Tìm kiếm</Text>
            <Text style={styles.tabDescription}>
              Chức năng tìm kiếm sẽ được hiển thị ở đây
            </Text>
          </View>
        );
      case 'profile':
        return (
          <View style={styles.tabScene}>
            <Icon name="account" size={50} color="#007AFF" />
            <Text style={styles.tabText}>Hồ sơ</Text>
            <Text style={styles.tabDescription}>Thông tin cá nhân của bạn</Text>
          </View>
        );
      default:
        return null;
    }
  };
  const imageList = [
    {
      uri: 'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg',
    },
    {uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'},
    {uri: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca'},
  ];
  console.log('dropdown', dropdownValue);
  const onRefresh = useCallback(() => {
    // setRefreshing(true);
    // setTimeout(() => {
    //   setRefreshing(false);
    // }, 1000);
  }, []);
  const loadMoreData = () => {
    if (loadingMore) return;
    // setLoadingMore(true);
    // setTimeout(() => {
    //   setLoadingMore(false);
    // }, 1000);
  };
  // const renderItem = ({item}) => (
  //   <View style={styles.card}>
  //     <Image source={{uri: item.image}} style={styles.image} />
  //     <View style={styles.textContainer}>
  //       <Text style={styles.title}>{item.title}</Text>
  //       <Text style={styles.time}>{item.time}</Text>
  //       <Text style={styles.description}>{item.description}</Text>
  //     </View>
  //   </View>
  // );
  const renderEmpty = () => (
    <Text style={styles.emptyText}>No items found</Text>
  );

  const renderItem = ({item}) => (
    <SwipeableRow
      item={item}
      onRead={it => console.log('Đã đọc', it.id)}
      onDelete={it => console.log('Xoá', it.id)}>
      <View style={styles.card}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </SwipeableRow>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f8f9fa'}}>
      <ScrollView
        style={{flex: 1, backgroundColor: '#f8f9fa', marginBottom: 70}}
        contentContainerStyle={{padding: 16}}>
        {/* Nút test push notification */}
        <PushNotificationButton />
        <Text style={styles.bigTitle}>Home Screen OTA!</Text>

        {/* Thanh tìm kiếm demo */}
        <CustomTextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Tìm kiếm..."
          isSearch
          style={{marginBottom: 16}}
          onSearch={() => Alert('Tìm: ' + searchText)}
        />
        <CustomTextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Tìm kiếm..."
          // isSearch
          style={{marginBottom: 16}}
          // onSearch={() => Alert('Tìm: ' + searchText)}
        />

        {/* Collapsible View Demo */}
        <CollapsibleView
          title="📋 Thông tin chi tiết"
          initialCollapsed={true}
          iconColor="#007AFF"
          backgroundColor="#f0f8ff">
          <View style={{padding: 16}}>
            <Text style={styles.sectionTitle}>Nội dung có thể thu gọn</Text>
            <Text style={{fontSize: 14, color: '#666', marginBottom: 12}}>
              Đây là một component Collapsible View có thể mở rộng hoặc thu gọn
              nội dung bên trong.
            </Text>
            <View
              style={{
                backgroundColor: '#e8f4fd',
                padding: 12,
                borderRadius: 8,
                marginBottom: 12,
              }}>
              <Text
                style={{fontWeight: 'bold', color: '#007AFF', marginBottom: 8}}>
                🎯 Tính năng chính:
              </Text>
              <Text style={{color: '#333', lineHeight: 20}}>
                • Animation mượt mà{'\n'}• Có thể tùy chỉnh giao diện{'\n'}• Hỗ
                trợ nội dung bất kỳ{'\n'}• Dễ sử dụng và tích hợp
              </Text>
            </View>
            <Button
              title="Thử nghiệm"
              variant="outline"
              onPress={() =>
                showToast('success', 'Collapsible View hoạt động!')
              }
            />
          </View>
        </CollapsibleView>

        <CollapsibleView
          title="🛠️ Cài đặt nâng cao"
          initialCollapsed={false}
          iconColor="#28a745"
          backgroundColor="#f0fff0">
          <View style={{padding: 16}}>
            <Text style={{fontSize: 14, color: '#666', marginBottom: 12}}>
              Một ví dụ khác với nội dung mở sẵn và màu sắc khác.
            </Text>
            <Checkbox
              label="Bật thông báo"
              checked={checked}
              onChange={setChecked}
              style={{marginBottom: 12}}
            />
            <Dropdown
              options={[
                {label: 'Tiếng Việt', value: 'vi'},
                {label: 'English', value: 'en'},
                {label: '中文', value: 'zh'},
              ]}
              selected={dropdownValue}
              onSelect={setDropdownValue}
              placeholder="Chọn ngôn ngữ"
            />
          </View>
        </CollapsibleView>

        <Text style={styles.sectionTitle}>Checkbox Component</Text>
        <Checkbox
          label="Tôi đồng ý với điều khoản"
          checked={checked}
          onChange={setChecked}
          style={{marginBottom: 12}}
        />

        <Text style={styles.sectionTitle}>Table Component</Text>
        <Table
          columns={['Name', 'Age', 'City', '22']}
          data={[
            ['John', '28', 'Hanoi', '123'],
            ['Anna', '24', 'Saigon', '456'],
            ['Mike', '32', 'Danang', '789'],
            ['Mike', '11', 'Danang', '222'],
          ]}
        />

        <Text style={styles.sectionTitle}>Dropdown Component</Text>
        <Dropdown
          options={[
            {label: 'Option 1', value: 'option1'},
            {label: 'Option 2', value: 'option2'},
            {label: 'Option 3', value: 'option3'},
          ]}
          selected={dropdownValue}
          onSelect={setDropdownValue}
          placeholder="Demo dropdown"
          filter
        />

        <Text style={styles.sectionTitle}>Image Viewer</Text>
        <View style={{flexDirection: 'row', gap: 10}}>
          {imageList.map((img, idx) => (
            <Image
              key={img.uri}
              source={{uri: img.uri}}
              style={[styles.demoImage, {width: 80, height: 80}]}
              resizeMode="cover"
              onTouchEnd={() => {
                setImageViewerIndex(idx);
                setImageViewerVisible(true);
              }}
            />
          ))}
        </View>
        <ImageViewer
          visible={imageViewerVisible}
          images={imageList}
          index={imageViewerIndex}
          onRequestClose={() => setImageViewerVisible(false)}
        />

        <Text style={styles.sectionTitle}>File Viewer</Text>
        <FileViewer
          fileName="demo_file.pdf"
          filePath={
            'https://shinec.com.vn/wp-content/uploads/2021/12/DAY-LA-FILE-MAU-PDF.pdf'
          }
          onOpen={() => Alert.alert('Open file', 'Bạn vừa nhấn mở file!')}
        />

        <Text style={styles.sectionTitle}>DateTime Picker</Text>
        <DateTimePicker
          value={dateValue}
          onChange={setDateValue}
          mode="datetime" // date, time, datetime
          label="Chọn ngày giờ"
        />

        <Text style={styles.sectionTitle}>File Upload</Text>
        <FileUpload />

        {/* FlatList cũ demo bên dưới */}
        <Text style={styles.sectionTitle}>FlatList</Text>
        <ReusableFlatList
          data={items}
          onRefresh={onRefresh}
          refreshing={refreshing}
          loadMoreData={loadMoreData}
          loadingMore={loadingMore}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
        />

        {/* Demo Button component mới */}
        <Text style={styles.sectionTitle}>Button Component</Text>
        <Button
          // style={{marginBottom: 12}}
          title="Primary Button"
          icon={<Icon name="check" size={20} color="#fff" />}
          onPress={() =>
            showToast('success', 'Bạn đã nhấn Primary!', '350 xé đôi')
          }
        />
        <Button
          title="Secondary Button"
          variant="secondary"
          onPress={() => showToast('info', 'Bạn đã nhấn Secondary!')}
        />
        <Button
          title="Outline Button"
          variant="outline"
          onPress={() => showToast('info', 'Bạn đã nhấn Outline!')}
        />
        <Button
          title="Danger Button"
          variant="danger"
          onPress={() => showToast('error', 'Bạn đã nhấn Danger!')}
        />
        <Button title="Loading Button" loading />
        <Button title="Disabled Button" disabled />
        {/* MultiSelect mới */}
        <Text style={styles.sectionTitle}>MultiSelect (Mới)</Text>
        <MultiSelect
          options={multiOptions}
          selected={multiSelected}
          onChange={setMultiSelected}
          placeholder="Chọn trái cây..."
          modalTitle="Chọn nhiều loại trái cây"
        />
        {/* RichTextEditor mới */}
        <Text style={styles.sectionTitle}>RichTextEditor (Mới)</Text>
        <RichTextEditor
          value={richValue}
          onChange={setRichValue}
          placeholder="Nhập nội dung mô tả..."
        />

        {/* TabView Demo */}
        <Text style={styles.sectionTitle}>TabView Demo</Text>
        <View style={styles.tabViewContainer}>
          <CustomTabView
            routes={tabRoutes}
            renderScene={renderTabScene}
            tabBarProps={{
              activeColor: '#007AFF',
              inactiveColor: '#8E8E93',
              indicatorStyle: {backgroundColor: '#007AFF'},
              style: {backgroundColor: '#FFFFFF'},
            }}
          />
        </View>
        {/* <Loading message="Đang tải dữ liệu..." /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeSrceen;

const styles = StyleSheet.create({
  bigTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#2d3436',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 18,
    marginBottom: 8,
    color: '#0984e3',
  },
  demoImage: {width: '100%', height: 180, borderRadius: 10, marginBottom: 8},
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    // marginVertical: 8,
    borderRadius: 8,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.15,
    // shadowRadius: 2,
    // elevation: 2,
  },
  image: {
    width: 120,
    height: 90,
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
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 16,
  },
  tabViewContainer: {
    height: 500,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  tabScene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  tabDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
