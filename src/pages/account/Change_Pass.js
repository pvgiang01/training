import React, {useState} from 'react';
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
import {useAppSelector} from '../../redux/store';
import {STYLES} from '../../styles/styles';
const ChangePass = ({navigation}) => {
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const [old_password, setOld_password] = useState('');
  const [new_password, setNew_password] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const handleChangePass = () => {
    fetch(
      'https://vanhuong-poc.izisolution.vn/api/v1/vh/website/change_password',
      {
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
      },
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.result?.code == 200) {
          Alert.alert('Đổi mật khẩu thành công !!!');
          navigation.navigate('Profile');
        } else {
          console.log('ccccc', json.msg);
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <View style={STYLES.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={Logo}
        resizeMode="center"
        style={STYLES.wellcome}></ImageBackground>
      <View style={STYLES.bottomView}>
        <View style={{padding: 30}}>
          <Text style={STYLES.title}>Change PassWord</Text>
          <View>
            <Text style={{margin: 5}}>Old_password</Text>
            <View style={STYLES.input_form}>
              <TextInput
                style={STYLES.input}
                value={old_password}
                placeholder="Old_password"
                onChangeText={text => setOld_password(text)}
                placeholderTextColor="gray"
              />
            </View>
            <Text style={{margin: 5}}>New_password</Text>
            <View style={STYLES.input_form}>
              <TextInput
                style={STYLES.input}
                value={new_password}
                placeholder="New_password"
                onChangeText={text => setNew_password(text)}
                placeholderTextColor="gray"
              />
            </View>
            <Text style={{margin: 5}}>Confirm_password</Text>
            <View>
              <View style={STYLES.input_form}>
                <TextInput
                  style={STYLES.input}
                  value={confirm_password}
                  placeholder="Confirm_password"
                  onChangeText={text => setConfirm_password(text)}
                  placeholderTextColor="gray"
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
                onPress={() => handleChangePass()}>
                <Text style={{color: 'white', fontSize: 25}}>Change Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChangePass;

const styles = StyleSheet.create({});
