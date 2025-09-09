import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // <— thêm
import {AppColors} from '../Common/AppColor';

const MyDateField = ({label, mode = 'date', theme = 'light'}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleConfirm = d => {
    setOpen(false);
    setDate(d);
  };

  const iconName =
    mode === 'time' ? 'clock-time-four-outline' : 'calendar-month-outline';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
        <Text style={styles.text}>{date.toLocaleString()}</Text>

        {/* Icon bên phải */}
        <View style={styles.right}>
          <Icon name={iconName} size={25} color="#6B7280" />
          {/* <Icon name="chevron-down" size={20} color="#9CA3AF" /> */}
        </View>
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={date}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
        theme={theme} // 'light' | 'dark'
        confirmText="Đồng ý"
        cancelText="Hủy"
        dividerColor={AppColors.MainColor}
        locale="vi"
        title={'Chọn ngày'}
        is24hourSource='locale'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginBottom: 12},
  label: {marginBottom: 6, color: '#374151', fontWeight: '600'},
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // để text trái, icon phải
  },
  text: {color: '#111827', fontWeight: '500'},
  right: {flexDirection: 'row', alignItems: 'center', gap: 4}, // nhóm 2 icon
});

export default MyDateField;
