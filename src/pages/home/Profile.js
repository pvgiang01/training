import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import {useAppSelector} from '../../redux/store';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {logout} from '../../redux/slices/auth.slice';
import {STYLES} from '../../styles/styles';
import { useDispatch } from 'react-redux';
const WIDTH = Dimensions.get('window');
const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const handleLogOut = () => {
    fetch('https://vanhuong-poc.izisolution.vn/api/v1/vh/sign_out', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: accessToken,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.result?.code == 200) {
          dispatch(logout());
          navigation.navigate('Login');
        } else {
          console.log('ccccc', json.msg);
        }
      })
      .catch(error => console.log('Error: ', error));
  };
  return (
    <View style={STYLES.container}>
      <View style={STYLES.viewCard}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChangePass')}
          style={STYLES.viewTitles}>
          <FontAwesome
            name="key"
            style={{marginLeft: 10}}
            size={20}
            color="orange"
          />
          <Text style={STYLES.titles}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 2,
          width: 200,
          backgroundColor: 'orange',
          opacity: 0.5,
          alignSelf: 'center',
        }}></View>
      <View style={{width: 350, marginLeft: 30}}>
        <TouchableOpacity
          style={STYLES.viewTitles}
          onPress={() => handleLogOut()}>
          <FontAwesome
            style={{margin: 10}}
            name="sign-out"
            size={20}
            color="orange"
          />
          <Text style={STYLES.titles}> Đăng Xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
