import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Pressable, Text} from 'react-native';

const Checkbox = props => {
  const {value, onChange, disabled} = props;
  return (
    <Pressable
      disabled={disabled}
      onPress={() => {
        onChange(!value);
      }}>
      {!value ? (
        <Ionicons name="square-outline" size={20} color="#3F3F3F" />
      ) : (
        <Ionicons name="ios-checkbox" size={20} color="#016243" />
      )}
    </Pressable>
  );
};

export default Checkbox;
