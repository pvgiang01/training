import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const Filter = ({
  visible,
  onBackdropPress,
  value,
  onChange,
  ...modalOtherProps
}) => {
  const inputRef = useRef(null);

  const [valueInput, setValueInput] = useState();
  const [error, setError] = useState();

  function validPhoneNumber(number) {
    return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(number);
  }

  const onPressName = () => {
    if (!validPhoneNumber(valueInput)) {
      onChange(valueInput, 'name');
      setError('');
    } else {
      setError('Hình như bạn nhập số điên thoại thay vì tên!');
    }
  };

  const onPressPhoneNumber = () => {
    if (validPhoneNumber(valueInput)) {
      onChange(valueInput, 'mobile_phone');
      setError('');
    } else {
      setError('Sdt k đúng định dạng');
    }
  };

  return (
    <Modal
      onShow={() => inputRef.current.focus()}
      visible={visible}
      transparent
      keyboardShouldPersistTaps="always"
      {...modalOtherProps}>
      <View style={[styles.container]}>
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        <View style={[styles.viewContent]}>
          <TextInput
            defaultValue={value}
            onChangeText={text => {
              setValueInput(text);
            }}
            ref={inputRef}
            autoFocus={false}
            style={styles.search}
            placeholder="Search..."
          />
          <Text style={styles.error}>{error}</Text>
          </View>
          <View style={{backgroundColor:null}}>

          <TouchableOpacity
            onPress={onPressName}
            style={styles.buttonContainer}>
            <Text style={styles.buttonTitle}>Tìm tên </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonContainer, {marginTop: 10}]}
            onPress={onPressPhoneNumber}>
            <Text style={styles.buttonTitle}>Tìm sđt </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonContainer, {marginTop: 10}]}
            onPress={()=>onChange(valueInput,'phone_number')}>
            <Text style={styles.buttonTitle}>Tìm sđt </Text>
          </TouchableOpacity>
        </View>
</View>
    </Modal>
  );
};

export default Filter;

const styles = StyleSheet.create({
  search: {
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  viewContent: {
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  modalCenter: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
  },
  buttonContainer: {
    height: 35,
    justifyContent: 'center',
    backgroundColor: 'orange',
    width:130,
    borderRadius:5,
    alignItems:'center',
    marginLeft:15,
    marginTop:5
  },
  buttonTitle: {
    color: 'white',
    paddingHorizontal: 12,
    fontSize:20
  },
  error: {
    color: 'red',
  },
});
