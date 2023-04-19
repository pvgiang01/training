import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Logo from '../../assets/images/logo.jpg';
import DeviceInfo from 'react-native-device-info';
import {setUser} from '../../redux/slices/auth.slice';
import { useDispatch } from 'react-redux';
import {STYLES} from '../../styles/styles';
export const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [type, setType] = useState('odoo');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    if (login.trim() == 0) {
      Alert.alert('Vui lòng nhập login');
    } else if (password.trim() == 0) {
      Alert.alert('Vui lòng nhập password');
    } else {
      fetch('https://vanhuong-poc.izisolution.vn/api/v1/vh/sign_in', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type,
          login: login,
          password: password,
          device_id: '123',
        }),
      })
        .then(response => response.json())
        .then(json => {
          if (json.result?.code == 200) {
            const token = json.result.data.access_token;
            dispatch(setUser(token));
            navigation.navigate('MyTabs');
          } else {
            Alert.alert('Tài khoản hoặc mật khẩu không đúng');
            console.log('ccccc', json.msg);
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <View style={STYLES.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={Logo}
        resizeMode="center"
        style={STYLES.wellcome} />
      <View style={STYLES.bottomView}>
        <View style={{padding: 20}}>
          <Text style={STYLES.title}>Sign In</Text>
          <View>
            <Text style={{margin: 5}}>Email</Text>
            <View style={STYLES.input_form}>
              <TextInput
                style={STYLES.input}
                value={login}
                placeholder="Email"
                onChangeText={text => setLogin(text)}
                placeholderTextColor="gray"
              />
            </View>
            <View>
              <Text style={{margin: 5}}>Password</Text>
              <View style={STYLES.input_form}>
                <TextInput
                  style={STYLES.input}
                  value={password}
                  placeholder="Password"
                  onChangeText={text => setPassword(text)}
                  placeholderTextColor="gray"
                  secureTextEntry={true}
                />
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
              }}>
              <TouchableOpacity
                style={STYLES.bottomBtn}
                onPress={() => handleLogin()}>
                <Text style={{color: 'white', fontSize: 25}}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
