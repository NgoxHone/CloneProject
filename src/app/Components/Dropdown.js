import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MAX_H, MAX_W} from '../Common/GlobalStyles';

const Dropdown = ({
  options = [],
  selected,
  onSelect,
  placeholder = 'Select...',
  filter = false,
}) => {
  // options: [{label, value}]
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const flatListRef = useRef(null);
  
  // Lọc options theo label
  const filteredOptions = filter
    ? options.filter(opt =>
        opt.label.toLowerCase().includes(search.toLowerCase()),
      )
    : options;
    
  // Lấy label của selected value
  const selectedLabel = options.find(opt => opt.value === selected)?.label;
  
  // Tự động scroll đến item đã chọn khi mở modal
  const scrollToSelected = () => {
    if (selected && flatListRef.current) {
      const selectedIndex = filteredOptions.findIndex(opt => opt.value === selected);
      if (selectedIndex >= 0) {
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({
            index: selectedIndex,
            animated: true,
            viewPosition: 0.5, // Scroll để item ở giữa màn hình
          });
        }, 100);
      }
    }
  };

  // Xử lý khi mở modal
  const openModal = () => {
    setVisible(true);
    setSearch(''); // Reset search khi mở modal
    scrollToSelected();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={[styles.buttonText, !selectedLabel && styles.placeholderText]}>
          {selectedLabel || placeholder}
        </Text>
        <Icon name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}>
          <View style={styles.dropdown}>
            {filter && (
              <TextInput
                style={styles.input}
                placeholder="Tìm kiếm..."
                value={search}
                onChangeText={setSearch}
                autoFocus
              />
            )}
            <FlatList
              ref={flatListRef}
              data={filteredOptions}
              keyExtractor={item => item.value?.toString()}
              renderItem={({item}) => {
                const isSelected = item.value === selected;
                return (
                  <TouchableOpacity
                    style={[
                      styles.optionContainer,
                      isSelected && styles.selectedOptionContainer
                    ]}
                    onPress={() => {
                      onSelect(item.value);
                      setVisible(false);
                    }}>
                    <Text style={[
                      styles.option,
                      isSelected && styles.selectedOption
                    ]}>
                      {item.label}
                    </Text>
                    {isSelected && (
                      <Icon name="check" size={20} color="#007AFF" />
                    )}
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <Text style={{textAlign: 'center', color: '#888', padding: 10}}>
                  Không có kết quả
                </Text>
              }
              keyboardShouldPersistTaps="handled"
              onScrollToIndexFailed={(info) => {
                // Xử lý lỗi scroll nếu index không hợp lệ
                const wait = new Promise(resolve => setTimeout(resolve, 500));
                wait.then(() => {
                  flatListRef.current?.scrollToIndex({ 
                    index: info.index, 
                    animated: true,
                    viewPosition: 0.5
                  });
                });
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginVertical: 8},
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    width: MAX_W - 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 4,
    maxHeight: MAX_H * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    color: '#000',
    fontSize: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
    marginVertical: 1,
  },
  selectedOptionContainer: {
    backgroundColor: '#e3f2fd',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  option: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectedOption: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default Dropdown;
