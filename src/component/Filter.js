import { t } from 'i18next';
import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import i18n from '../i18n/i18n';
const Filter = ({
  visible,
  onBackdropPress,
  value,
  onChange,
  ...modalOtherProps
}) => {
  const inputRef = useRef(null);
  const [valueInput, setValueInput] = useState();
  const [error,setError] = useState()
  const [modalVisible,setModalVisible] = useState(false)
  function validPhoneNumber(number){
    return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(number)
  } 
  const onPressName = () =>{
    if(!validPhoneNumber(valueInput)){
      onChange(valueInput,'name');
      setError('')
      setModalVisible(false)
    }else{
      setError('Vui lòng nhập tên')
    }
  }
  const onPressPhoneNumber = () =>{
    if(validPhoneNumber(valueInput)){
      onChange(valueInput,'phone')
      setError('')
      setModalVisible(false)
    }else{
      setError('Sdt k đúng định dạng')
    }
  }
  return (
    <Modal
      onShow={() => inputRef.current.focus()}
      visible={visible}
      transparent
      {...modalOtherProps}>
      <View style={[styles.container]}>
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        <View style={{flexDirection:'row',backgroundColor: '#016243', position: "relative", alignItems: "center"}}>
          {/* <Feather name="search" color='gray' size={20} style={{top:20,position: 'absolute', zIndex: 9, left: 20}}/> */}

          <TextInput
            defaultValue={value}
            onChangeText={text => {
              setValueInput(text);
            }}
            ref={inputRef}
            autoFocus={false}
            style={styles.search}
            placeholder={i18n.t('Search')}
          />
          <Feather name='refresh-ccw' color='red' size={20} style={{top:20,position:'absolute',marginLeft:370}}/>
          </View>
          <Text style={{color:'red',backgroundColor:'white',marginLeft:15,fontSize:20}}>{error}</Text>
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
        </View>
        </View>
    </Modal>
  );
};

export default Filter;

const styles = StyleSheet.create({
  search: {
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
    margin: 10,
    height: 45,
    paddingRight:40,
    width: '95%',
    paddingLeft:10,
    fontFamily:'Chakra-Petch'
  },
  container: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  viewContent: {
    backgroundColor: '#016243',
    width: '100%',
    
  },
  modalCenter: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
  },
  buttonContainer: {
    height: 35,
    backgroundColor: '#016243',
    width:130,
    borderRadius:5,
    alignItems:'center',
    marginLeft:15,
  },
  buttonTitle: {
    color: 'white',
    paddingHorizontal: 12,
    fontSize:20
  },
});
