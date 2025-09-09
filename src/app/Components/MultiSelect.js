import React, {useState, useMemo} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';

/**
 * MultiSelect component
 * Props:
 * - options: [{ label, value }]
 * - selected: array of values
 * - onChange: (array) => void
 * - placeholder: string
 * - searchPlaceholder: string
 * - modalTitle: string
 * - style, modalStyle, optionStyle, selectedStyle, ...
 */
const MultiSelect = ({
  options = [],
  selected = [],
  onChange,
  placeholder = 'Chọn...',
  searchPlaceholder = 'Tìm kiếm...',
  modalTitle = 'Chọn nhiều mục',
  style,
  modalStyle,
  optionStyle,
  selectedStyle,
}) => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    return options.filter(opt =>
      opt.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, options]);

  const toggleSelect = value => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  // Checkbox component đơn giản
  const CheckBox = ({checked}) => (
    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
      {checked && <Text style={styles.checkboxTick}>✓</Text>}
    </View>
  );

  // Check all logic
  const allValues = options.map(opt => opt.value);
  const isAllChecked =
    allValues.length > 0 && allValues.every(v => selected.includes(v));
  const isIndeterminate = selected.length > 0 && !isAllChecked;

  const toggleSelectAll = () => {
    if (isAllChecked) {
      onChange([]);
    } else {
      onChange(allValues);
    }
  };

  const renderOption = ({item}) => (
    <TouchableOpacity
      style={[
        styles.option,
        optionStyle,
        selected.includes(item.value) && [styles.selected, selectedStyle],
      ]}
      onPress={() => toggleSelect(item.value)}>
      <CheckBox checked={selected.includes(item.value)} />
      <Text style={{flex: 1, marginLeft: 8}}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity
        style={[styles.input, style]}
        onPress={() => setVisible(true)}>
        <Text
          style={{
            color: selected.length ? '#333' : '#888',
            // fontWeight: 'bold',
          }}>
          {selected.length
            ? selected.length > 3
              ? `Đã chọn ${selected.length} mục`
              : options
                  .filter(opt => selected.includes(opt.value))
                  .map(opt => opt.label)
                  .join(', ')
            : placeholder}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={visible}
        animationType="fade"
        transparent
        onRequestClose={() => setVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modal, modalStyle]}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <TextInput
              style={styles.search}
              placeholder={searchPlaceholder}
              value={search}
              onChangeText={setSearch}
              autoFocus
            />
            {/* Check all */}
            <TouchableOpacity
              style={[styles.option, {marginBottom: 4}]}
              onPress={toggleSelectAll}>
              <CheckBox checked={isAllChecked} />
              <Text style={{flex: 1, marginLeft: 8, fontWeight: 'bold'}}>
                {isAllChecked ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
              </Text>
              {selected.length > 0 && (
                <Text style={{color: 'gray', fontWeight: 'bold'}}>
                  Đã chọn: {selected.length}
                </Text>
              )}
            </TouchableOpacity>
            <ScrollView style={{maxHeight: 300}}>
              <FlatList
                data={filteredOptions}
                keyExtractor={item => item.value.toString()}
                renderItem={renderOption}
                keyboardShouldPersistTaps="handled"
              />
            </ScrollView>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setVisible(false)}>
              <Text style={{color: '#007AFF', fontWeight: 'bold'}}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    width: '85%',
    maxWidth: 400,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  search: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    minHeight: 40,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkboxTick: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 18,
  },
  selected: {
    backgroundColor: '#e6f0ff',
  },
  check: {
    color: '#007AFF',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  closeBtn: {
    marginTop: 16,
    alignSelf: 'center',
    padding: 8,
  },
});

export default MultiSelect;
