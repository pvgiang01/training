import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Platform,
  Dimensions,
  ToastAndroid
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useAppSelector} from '../../redux/store';
import {API_CHANGE_PASS} from '../../repository/Type';
import i18n from '../../i18n/i18n';
const ChangePass = ({navigation}) => {
  const accessToken = useAppSelector(state => state.auth.access_token);
  const [old_password, setOld_password] = useState('');
  const [new_password, setNew_password] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [showP, setShowP] = useState(false);
  const [showP2, setShowP2] = useState(false);
  const handleChangePass = async () => {
    if(old_password.trim() == 0){
      ToastAndroid.show('Trương mật khẩu cũ không được để trống',ToastAndroid.SHORT);
    } else if(new_password.trim() == 0){
      ToastAndroid.show('Trường mật khẩu mới không được để trống',ToastAndroid.SHORT);
    }else if(confirm_password.trim() == 0){
      ToastAndroid.show('Trường xác nhận mật khẩu mới không được để trống',ToastAndroid.SHORT);
    }else if(new_password.trim() !== confirm_password.trim()){
      ToastAndroid.show('Xác nhận mật khẩu mới không khớp',ToastAndroid.SHORT);
    }else{
    await fetch(API_CHANGE_PASS, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: accessToken,
        old_password: old_password,
        new_password: new_password,
        confirm_password: confirm_password,
      }),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.result?.status) {
          ToastAndroid.show('Đổi mật khẩu thành công',ToastAndroid.SHORT);
          navigation.navigate('Application');
        } else {
          ToastAndroid.show('Đổi mật khẩu không thành công',ToastAndroid.SHORT);
        }
      })
      .catch(err => console.log(err));
    }
  };
  return (
    <View style={styles.container}>
      <View style={{marginTop: 10, marginLeft: 20, paddingRight: 50}}>
        <TextInput
          style={{fontSize: 16, fontFamily: 'Chakra-Petch'}}
          value={old_password}
          onChangeText={text => setOld_password(text)}
          placeholder={i18n.t('Password')}
          secureTextEntry={true}
        />
      </View>
      <View style={[styles.line, {bottom: 10}]}></View>
      <View
        style={{
          marginTop: 20,
          marginLeft: 20,
          flexDirection: 'row',
          paddingRight: 50,
        }}>
        <TextInput
          style={{fontSize: 16, fontFamily: 'Chakra-Petch'}}
          value={new_password}
          onChangeText={text => setNew_password(text)}
          placeholder={i18n.t('NewPass')}
          secureTextEntry={!showP}
        />
        <FontAwesome5
          name={showP ? 'eye-slash' : 'eye'}
          onPress={() => setShowP(!showP)}
          color="gray"
          size={20}
          style={{position: 'absolute', zIndex: 9, right: 20, top: 5}}
        />
      </View>
      <View style={styles.line}></View>
      <View
        style={{
          marginLeft: 20,
          flexDirection: 'row',
          marginTop: 20,
          paddingRight: 50,
        }}>
        <TextInput
          style={{fontSize: 16, fontFamily: 'Chakra-Petch', width: '100%'}}
          value={confirm_password}
          onChangeText={text => setConfirm_password(text)}
          placeholder={i18n.t('ConfirmPass')}
          secureTextEntry={!showP2}
        />
        <FontAwesome5
          name={showP2 ? 'eye-slash' : 'eye'}
          onPress={() => setShowP2(!showP2)}
          color="gray"
          size={20}
          style={{position: 'absolute', zIndex: 9, right: 20, top: 5}}
        />
      </View>
      <View style={styles.line}></View>
      <View>
        <TouchableOpacity
          style={styles.btnChange}
          onPress={() => handleChangePass()}>
          <Text style={styles.textChange}>{i18n.t('ChangePass')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePass;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  line: {
    height: 1,
    width: 390,
    backgroundColor: '#d9d9d9',
    marginLeft: 25,
    bottom: 10,
  },
  btnChange: {
    position: 'absolute',
    width: SCREEN_WIDTH -20,
    height: 50,
    top: 20,
    borderRadius: 5,
    backgroundColor: '#016243',
    ...Platform.select({
      android:{
        marginLeft:10,
        marginRight:10
      }
    })
  },
  textChange: {
    left: 130,
    top: 10,
    color: '#FFFFFF',
    fontFamily: 'Chakra-Petch',
    fontStyle: 'normal',
    fontSize: 18,
  },
});
