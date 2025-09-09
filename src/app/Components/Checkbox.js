import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Checkbox = ({label, checked, onChange, style, labelStyle, disabled}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style, disabled && styles.disabled]}
      onPress={() => !disabled && onChange && onChange(!checked)}
      activeOpacity={0.7}
      disabled={disabled}>
      <View
        style={[
          styles.checkbox,
          checked && styles.checkedBox,
          disabled && styles.disabledBox,
        ]}>
        {checked && <Ionicons name="checkmark" size={18} color="#fff" />}
      </View>
      {label ? (
        <Text
          style={[styles.label, labelStyle, disabled && styles.disabledLabel]}>
          {label}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkedBox: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: '#222',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledBox: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
  },
  disabledLabel: {
    color: '#aaa',
  },
});

export default Checkbox;
