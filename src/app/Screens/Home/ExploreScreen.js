import React from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import CustomTextInput from '../../Components/CustomTextInput';
import Checkbox from '../../Components/Checkbox';
import Dropdown from '../../Components/Dropdown';
import DateTimePicker from '../../Components/DateTimePicker';
import ActionMenu from '../../Components/ActionMenu';

const options = [
  {label: 'Option 1', value: 'option1'},
  {label: 'Option 2', value: 'option2'},
  {label: 'Option 3', value: 'option3'},
];

export default function ExploreScreen() {
  const {control, handleSubmit, reset, watch} = useForm({
    defaultValues: {
      search: '',
      agree: false,
      dropdown: null,
      date: new Date(),
    },
  });

  const onSubmit = data => {
    Alert.alert('Dữ liệu form', JSON.stringify(data, null, 2));
  };
  //   console.log('watch', watch());
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="search"
        render={({field: {onChange, value}}) => (
          <CustomTextInput
            value={value}
            onChangeText={onChange}
            placeholder="Tìm kiếm..."
            isSearch
            style={{marginBottom: 16}}
          />
        )}
      />
      <Controller
        control={control}
        name="agree"
        render={({field: {onChange, value}}) => (
          <Checkbox
            label="Tôi đồng ý với điều khoản"
            checked={value}
            onChange={onChange}
            style={{marginBottom: 16}}
          />
        )}
      />
      <Controller
        control={control}
        name="dropdown"
        render={({field: {onChange, value}}) => (
          <Dropdown
            options={options}
            selected={value}
            onSelect={onChange}
            placeholder="Chọn một option"
            style={{marginBottom: 16}}
            filter
          />
        )}
      />
      <Controller
        control={control}
        name="date"
        render={({field: {onChange, value}}) => (
          <DateTimePicker
            value={value}
            onChange={onChange}
            mode="date"
            label="Chọn ngày"
            style={{marginBottom: 16}}
          />
        )}
      />
      <ActionMenu
        title="Chọn tác vụ"
        items={[
          {label: 'Thẩm xét (CV)', onPress: () => console.log('CV')},
          {label: 'Xét duyệt (P.TP)', onPress: () => console.log('PTP')},
          {label: 'Ký duyệt (TP)', onPress: () => console.log('TP')},
          {
            label: 'Thu hồi',
            danger: true,
            onPress: () => console.log('Thu hồi'),
          },
        ]}
      />
      <Button title="Gửi" onPress={handleSubmit(onSubmit)} />
      <Button title="Reset" onPress={() => reset()} color="#888" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#0984e3',
    textAlign: 'center',
  },
});
