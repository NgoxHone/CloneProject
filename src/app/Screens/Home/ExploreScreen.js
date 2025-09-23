import {
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import TopNavigation from '../../Components/TopNavigation';
import CustomTextInput from '../../Components/CustomTextInput';
import ReusableFlatList from '../../Components/List/List';
import TauItem from '../../Components/TauItem';
import {
  getDanhSachTauChayWithPagination,
  searchTauCa,
} from '../../Api/TauCaService';
import {showToast} from '../../Components/ToastConfig';

const {width} = Dimensions.get('window');

const ExploreScreen = () => {
  // States
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 20;

  // Refs for debounce
  const debounceTimer = useRef(null);
  const DEBOUNCE_DELAY = 500; // 500ms delay

  // Utility function to merge data safely without duplicates
  const mergeDataSafely = (existingData, newData) => {
    const existingIds = new Set(existingData.map(item => item.id));
    const uniqueNewItems = newData.filter(item => !existingIds.has(item.id));
    return [...existingData, ...uniqueNewItems];
  };

  // Safe key extractor with fallback
  const keyExtractor = (item, index) => {
    return item.id || item.sQuanLy || `item_${index}_${Date.now()}`;
  }; // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Debug function to check for duplicate keys
  const checkForDuplicates = dataArray => {
    const ids = dataArray.map(item => item.id);
    const uniqueIds = new Set(ids);
    if (ids.length !== uniqueIds.size) {
      console.warn(
        'Duplicate IDs found in data:',
        ids.length,
        'vs',
        uniqueIds.size,
      );
      const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
      console.warn('Duplicate IDs:', [...new Set(duplicates)]);
    }
    return dataArray;
  };

  // Load data function
  const loadInitialData = async () => {
    setLoading(true);
    try {
      const result = await getDanhSachTauChayWithPagination({
        page: 1,
        pageSize,
      });

      const checkedData = checkForDuplicates(result.items);
      setData(checkedData);
      setFilteredData(checkedData);
      setTotalCount(result.totalCount);
      setHasMore(result.hasMore);
      setCurrentPage(1);
    } catch (error) {
      console.error('Load initial data error:', error);
      showToast('error', 'Lỗi', 'Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  }; // Pull to refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setSearchText('');
    setIsSearching(false);

    try {
      const result = await getDanhSachTauChayWithPagination({
        page: 1,
        pageSize,
      });

      setData(result.items);
      setFilteredData(result.items);
      setTotalCount(result.totalCount);
      setHasMore(result.hasMore);
      setCurrentPage(1);
      showToast('success', 'Thành công', 'Đã cập nhật dữ liệu mới');
    } catch (error) {
      console.error('Refresh error:', error);
      showToast('error', 'Lỗi', 'Không thể làm mới dữ liệu');
    } finally {
      setRefreshing(false);
    }
  }, []);

  const loadMoreData = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const result = await getDanhSachTauChayWithPagination({
        page: nextPage,
        pageSize,
        search: isSearching ? searchText.trim() : '',
      });
      if (isSearching) {
        const newSearchData = mergeDataSafely(filteredData, result.items);
        setFilteredData(newSearchData);
        console.log(
          `Search load more page ${nextPage}: ${result.items.length} new items, total: ${newSearchData.length}`,
        );
      } else {
        const newData = mergeDataSafely(data, result.items);
        const checkedData = checkForDuplicates(newData);
        setData(checkedData);
        setFilteredData(checkedData);
        console.log(
          `Loaded page ${nextPage}: ${result.items.length} new items, total: ${checkedData.length}`,
        );
      }
      setHasMore(result.hasMore);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Load more error:', error);
      showToast('error', 'Lỗi', 'Không thể tải thêm dữ liệu');
    } finally {
      setLoadingMore(false);
    }
  };

  const performSearch = async searchQuery => {
    if (!searchQuery.trim()) {
      setIsSearching(false);
      setFilteredData(data);
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);
    setIsSearching(true);

    try {
      const result = await getDanhSachTauChayWithPagination({
        page: 1,
        pageSize,
        search: searchQuery.trim(),
      });

      setFilteredData(result.items);
      setHasMore(result.hasMore);
      setCurrentPage(1);
      setTotalCount(result.totalCount);
      console.log(
        `Search results for "${searchQuery}": ${result.items.length} items found`,
      );
    } catch (error) {
      console.error('Search error:', error);
      showToast('error', 'Lỗi', 'Không thể tìm kiếm');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearch = text => {
    setSearchText(text);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      performSearch(text);
    }, DEBOUNCE_DELAY);
  };

  const clearSearch = () => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    setSearchText('');
    setIsSearching(false);
    setSearchLoading(false);
    setFilteredData(data);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleItemPress = item => {
    Alert.alert(
      'Chi tiết tàu cá',
      `Tàu: ${item.tenTau}\nSố đăng ký: ${item.soDangKy}\nChủ tàu: ${item.chuTau_Ten}`,
      [
        {text: 'Đóng', style: 'cancel'},
        {
          text: 'Xem chi tiết',
          onPress: () => console.log('Navigate to detail'),
        },
      ],
    );
  };

  const handleFavorite = item => {
    showToast(
      'info',
      'Yêu thích',
      `Đã thêm ${item.tenTau} vào danh sách yêu thích`,
    );
  };

  const handleDelete = item => {
    Alert.alert('Xác nhận xóa', `Bạn có chắc muốn xóa ${item.tenTau}?`, [
      {text: 'Hủy', style: 'cancel'},
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => {
          const newData = filteredData.filter(i => i.id !== item.id);
          setFilteredData(newData);
          showToast('success', 'Thành công', 'Đã xóa tàu cá');
        },
      },
    ]);
  };

  // Render item
  const renderItem = ({item}) => (
    <TauItem
      item={item}
      onPress={handleItemPress}
      onFavorite={handleFavorite}
      onDelete={handleDelete}
    />
  );

  // Empty component
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>
        {isSearching ? 'Không tìm thấy kết quả' : 'Danh sách trống'}
      </Text>
      <Text style={styles.emptyText}>
        {isSearching
          ? `Không có tàu cá nào phù hợp với "${searchText}"`
          : 'Chưa có dữ liệu tàu cá'}
      </Text>
    </View>
  );

  // Loading component
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <TopNavigation title="Danh sách tàu cá" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <TopNavigation title="Danh sách tàu cá" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <CustomTextInput
          value={searchText}
          onChangeText={handleSearch}
          placeholder="Tìm kiếm tàu cá, chủ tàu..."
          isSearch
          style={styles.searchInput}
          onClear={clearSearch}
        />
        {searchLoading && (
          <View style={styles.searchLoadingContainer}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={styles.searchLoadingText}>Đang tìm kiếm...</Text>
          </View>
        )}
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          {isSearching
            ? `Tìm thấy ${totalCount} kết quả${
                searchText ? ` cho "${searchText}"` : ''
              }`
            : `Tổng số: ${totalCount.toLocaleString()} tàu cá`}
        </Text>
        {hasMore && !isSearching && (
          <Text style={styles.hasMoreText}>
            Đang hiển thị {filteredData.length}/{totalCount}
          </Text>
        )}
      </View>

      {/* List */}
      <ReusableFlatList
        data={filteredData}
        renderItem={renderItem}
        onRefresh={onRefresh}
        refreshing={refreshing}
        loadMoreData={loadMoreData}
        loadingMore={loadingMore}
        ListEmptyComponent={renderEmpty}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    marginBottom: 70,
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  searchInput: {
    marginBottom: 0,
  },
  statsContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  hasMoreText: {
    fontSize: 12,
    color: '#666',
  },
  searchLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  searchLoadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#007AFF',
    fontStyle: 'italic',
  },
  debounceHint: {
    fontSize: 10,
    color: '#999',
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
