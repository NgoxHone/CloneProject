import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Animated,
  Dimensions,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const mockNotifications = [
  {
    id: '1',
    type: 'like',
    title: 'maya.daryen và 15 người khác',
    content: 'đã thích bài viết của bạn',
    time: '2 phút',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616c27c1812?w=100',
    postImage:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100',
    isRead: false,
    isNew: true,
  },
  {
    id: '2',
    type: 'comment',
    title: 'alex_johnson',
    content: 'đã bình luận: "Amazing collection! 🔥"',
    time: '5 phút',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    postImage:
      'https://images.unsplash.com/photo-1506629905607-21e2e3d38c96?w=100',
    isRead: false,
    isNew: true,
  },
  {
    id: '3',
    type: 'follow',
    title: 'sarah.wilson',
    content: 'đã bắt đầu theo dõi bạn',
    time: '15 phút',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    isRead: false,
    isNew: true,
  },
  {
    id: '4',
    type: 'story',
    title: 'emma.style',
    content: 'đã thích story của bạn',
    time: '30 phút',
    avatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
    isRead: true,
    isNew: false,
  },
  {
    id: '5',
    type: 'tag',
    title: 'fashion_week',
    content: 'đã gắn thẻ bạn trong một bài viết',
    time: '1 giờ',
    avatar:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100',
    postImage:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100',
    isRead: true,
    isNew: false,
  },
  {
    id: '6',
    type: 'like',
    title: 'model_kate và 8 người khác',
    content: 'đã thích bài viết của bạn',
    time: '2 giờ',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    postImage:
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=100',
    isRead: true,
    isNew: false,
  },
  {
    id: '7',
    type: 'promotion',
    title: 'Instagram',
    content: 'Khuyến mãi đặc biệt: Nhận ưu đãi 50% cho đơn hàng đầu tiên! 🎉',
    time: '1 ngày',
    avatar:
      'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=100',
    isRead: true,
    isNew: false,
    isPromo: true,
  },
];

export default function NotificationScreen() {
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedTab, setSelectedTab] = useState('all'); // all, following, you
  const navigation = useNavigation();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnims = useRef(
    mockNotifications.map(() => new Animated.Value(1)),
  ).current;

  useEffect(() => {
    // Initial animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const filtered = notifications.filter(n => {
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase());

    if (selectedTab === 'all') return matchesSearch;
    if (selectedTab === 'following')
      return matchesSearch && (n.type === 'like' || n.type === 'comment');
    if (selectedTab === 'you')
      return matchesSearch && (n.type === 'follow' || n.type === 'tag');

    return matchesSearch;
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // Add new notification animation
      const newNotification = {
        id: Date.now().toString(),
        type: 'like',
        title: 'new_user',
        content: 'đã thích bài viết mới của bạn',
        time: 'Vừa xong',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        postImage:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
        isRead: false,
        isNew: true,
      };
      setNotifications([newNotification, ...notifications]);
    }, 1000);
  };

  const handleNotificationPress = (item, index) => {
    // Scale animation
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Mark as read
    if (!item.isRead) {
      const updatedNotifications = notifications.map(notif =>
        notif.id === item.id ? {...notif, isRead: true, isNew: false} : notif,
      );
      setNotifications(updatedNotifications);
    }

    // Navigate to detail (commented out since route doesn't exist)
    // navigation.navigate('NotificationDetail', {notification: item});
  };

  // Trả về component Icon đẹp cho từng loại notification
  const getNotificationIcon = type => {
    switch (type) {
      case 'like':
        return <Icon name="heart" size={18} color="#e74c3c" />;
      case 'comment':
        return <Icon name="comment-text-outline" size={18} color="#3498db" />;
      case 'follow':
        return <Icon name="account-plus" size={18} color="#27ae60" />;
      case 'story':
        return <Icon name="camera" size={18} color="#9b59b6" />;
      case 'tag':
        return <Icon name="tag" size={18} color="#f1c40f" />;
      case 'promotion':
        return <Icon name="gift" size={18} color="#e67e22" />;
      default:
        return <Icon name="bullhorn" size={18} color="#888" />;
    }
  };

  const renderTabButton = (tab, title) => (
    <TouchableOpacity
      style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
      onPress={() => setSelectedTab(tab)}
      activeOpacity={0.8}>
      <Text
        style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderNotificationItem = (item, index) => (
    <View
      key={item.id}
      style={[
        styles.notificationContainer,
        // {
        //   opacity: fadeAnim,
        //   transform: [{translateY: slideAnim}, {scale: scaleAnims[index] || 1}],
        // },
      ]}>
      <TouchableOpacity
        style={[
          styles.notificationCard,
          !item.isRead && styles.unreadCard,
          item.isPromo && styles.promoCard,
        ]}
        onPress={() => handleNotificationPress(item, index)}
        activeOpacity={0.9}>
        {/* Avatar with online indicator */}
        <View style={styles.avatarContainer}>
          <Image source={{uri: item.avatar}} style={styles.avatar} />
          {item.isNew && <View style={styles.onlineIndicator} />}
          <View style={styles.iconBadge}>
            {getNotificationIcon(item.type)}
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText} numberOfLines={1}>
              <Text style={styles.boldText}>{item.title}</Text>
              <Text style={styles.normalText}> {item.content}</Text>
            </Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>

        {/* Post image or follow button */}
        {item.postImage ? (
          <TouchableOpacity
            style={styles.postImageContainer}
            activeOpacity={0.8}>
            <Image source={{uri: item.postImage}} style={styles.postImage} />
          </TouchableOpacity>
        ) : item.type === 'follow' ? (
          <TouchableOpacity style={styles.followButton} activeOpacity={0.8}>
            <Text style={styles.followButtonText}>Theo dõi lại</Text>
          </TouchableOpacity>
        ) : null}

        {/* Unread indicator */}
        {!item.isRead && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hoạt động</Text>
        <TouchableOpacity style={styles.searchButton} activeOpacity={0.8}>
          <Icon name="magnify" size={30} color="#333" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {renderTabButton('all', 'Tất cả')}
        {renderTabButton('following', 'Đang theo dõi')}
        {renderTabButton('you', 'Bạn')}
      </View>

      {/* Today/New section */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#000"
            colors={['#000']}
          />
        }>
        {/* New notifications */}
        {filtered.filter(n => n.isNew).length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Mới</Text>
            {filtered
              .filter(n => n.isNew)
              .map((item, index) => renderNotificationItem(item, index))}
          </View>
        )}

        {/* Earlier notifications */}
        {filtered.filter(n => !n.isNew).length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Trước đó</Text>
            {filtered
              .filter(n => !n.isNew)
              .map((item, index) =>
                renderNotificationItem(
                  item,
                  filtered.filter(n => n.isNew).length + index,
                ),
              )}
          </View>
        )}

        {filtered.length === 0 && (
          <View style={styles.emptyContainer}>
            <Icon name="bell-outline" size={54} color="#bbb" style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>Không có thông báo</Text>
            <Text style={styles.emptySubtitle}>
              Khi ai đó thích hoặc bình luận bài viết của bạn, bạn sẽ thấy ở đây.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 18,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  activeTabText: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  sectionContainer: {
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  notificationContainer: {
    marginBottom: 1,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    position: 'relative',
  },
  unreadCard: {
    backgroundColor: '#f8f9ff',
  },
  promoCard: {
    backgroundColor: '#fff3e0',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
  },
  onlineIndicator: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  iconBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 2,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  normalText: {
    fontWeight: 'normal',
    color: '#333',
  },
  timeText: {
    fontSize: 12,
    color: '#888',
  },
  postImageContainer: {
    marginLeft: 8,
  },
  postImage: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#0095f6',
    borderRadius: 6,
    marginLeft: 8,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  unreadDot: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0095f6',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.3,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
});
