import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CollapsibleView from './CollapsibleView';

const {width} = Dimensions.get('window');

const TauItem = ({item, onPress, onDelete, onFavorite}) => {
  const formatDate = dateString => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatTongDungTich = dungTich => {
    return dungTich ? `${dungTich.toFixed(1)} m³` : 'N/A';
  };

  const formatCongSuat = congSuat => {
    return congSuat ? `${congSuat} CV` : 'N/A';
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(item)}
      activeOpacity={0.7}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.tenTau} numberOfLines={1}>
            {item.tenTau || 'Không có tên'}
          </Text>
          <Text style={styles.soDangKy}>{item.soDangKy || 'N/A'}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => onFavorite?.(item)}>
            <Icon name="heart-outline" size={20} color="#ff6b6b" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Thông tin chủ tàu */}

      <CollapsibleView
        title="Thông tin chi tiết"
        initialCollapsed={true}
        iconColor="#007AFF"
        backgroundColor="#f0f8ff"
        borderColor="#f0f8ff">
        <View style={styles.infoRow}>
          <Icon name="account" size={16} color="#666" />
          <Text style={styles.infoText} numberOfLines={1}>
            {item.chuTau_Ten || 'Không có thông tin'}
          </Text>
        </View>

        {/* Địa chỉ */}
        <View style={styles.infoRow}>
          <Icon name="map-marker" size={16} color="#666" />
          <Text style={styles.infoText} numberOfLines={2}>
            {item.chuTau_DiaChiFull || item.chuTau_DiaChi || 'Không có địa chỉ'}
          </Text>
        </View>

        {/* Thông tin kỹ thuật */}
        <View style={styles.techInfoContainer}>
          <View style={styles.techInfoItem}>
            <Text style={styles.techLabel}>Loại tàu</Text>
            <Text style={styles.techValue}>{item.loaiTau || 'N/A'}</Text>
          </View>
          <View style={styles.techInfoItem}>
            <Text style={styles.techLabel}>Chiều dài</Text>
            <Text style={styles.techValue}>
              {item.chieuDai_Lmax ? `${item.chieuDai_Lmax}m` : 'N/A'}
            </Text>
          </View>
          <View style={styles.techInfoItem}>
            <Text style={styles.techLabel}>Dung tích</Text>
            <Text style={styles.techValue}>
              {formatTongDungTich(item.tongDungTich_GT)}
            </Text>
          </View>
        </View>

        {/* Máy tàu */}
        {item.danhSachMayTau && item.danhSachMayTau.length > 0 && (
          <View style={styles.engineInfo}>
            <Icon name="engine" size={16} color="#666" />
            <Text style={styles.engineText}>
              {item.danhSachMayTau[0].hangMay || 'N/A'} -
              {formatCongSuat(item.danhSachMayTau[0].congSuatCV)}
            </Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.dateText}>
              Đăng ký: {formatDate(item.ngayDangKy)}
            </Text>
            {item.chuTau_DienThoai && (
              <Text style={styles.phoneText}>
                <Icon name="phone" size={14} color="#007AFF" />{' '}
                {item.chuTau_DienThoai}
              </Text>
            )}
          </View>
          <View style={styles.footerRight}>
            <View
              style={[
                styles.statusBadge,
                item.isActive ? styles.activeBadge : styles.inactiveBadge,
              ]}>
              <Text
                style={[
                  styles.statusText,
                  item.isActive ? styles.activeText : styles.inactiveText,
                ]}>
                {item.isActive ? 'Hoạt động' : 'Không hoạt động'}
              </Text>
            </View>
          </View>
        </View>
      </CollapsibleView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
    marginRight: 12,
  },
  headerRight: {
    alignItems: 'center',
  },
  tenTau: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  soDangKy: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#FFF5F5',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  techInfoContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  techInfoItem: {
    flex: 1,
    alignItems: 'center',
  },
  techLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  techValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  engineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  engineText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  footerLeft: {
    flex: 1,
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  phoneText: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: '#E8F5E8',
  },
  inactiveBadge: {
    backgroundColor: '#FFF2F0',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  activeText: {
    color: '#22C55E',
  },
  inactiveText: {
    color: '#EF4444',
  },
});

export default TauItem;
