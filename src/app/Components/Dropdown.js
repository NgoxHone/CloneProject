import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
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
  // Lọc options theo label
  const filteredOptions = filter
    ? options.filter(opt =>
        opt.label.toLowerCase().includes(search.toLowerCase()),
      )
    : options;
  // Lấy label của selected value
  const selectedLabel = options.find(opt => opt.value === selected)?.label;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text>{selectedLabel || placeholder}</Text>
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
              data={filteredOptions}
              keyExtractor={item => item.value?.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item.value);
                    setVisible(false);
                  }}>
                  <Text style={styles.option}>{item.label}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={{textAlign: 'center', color: '#888', padding: 10}}>
                  Không có kết quả
                </Text>
              }
              keyboardShouldPersistTaps="handled"
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
    padding: 10,
    backgroundColor: '#fff',
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
    // minHeight: MAX_H * 0.2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    color: '#000',
  },
  option: {padding: 10},
});

export default Dropdown;
