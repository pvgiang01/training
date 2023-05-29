import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View,Dimensions,Platform} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import {API_LOGOUT} from '../../repository/Type';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/slices/auth.slice';
import {useAppSelector} from '../../redux/store';
import DeviceInfo from 'react-native-device-info';
import i18n from '../../i18n/i18n';
const SettingScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const accessToken = useAppSelector(state => state.auth.access_token);
  const handleLogOut = async () => {
    await fetch(API_LOGOUT, {
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
          console.log('failed!!', json.msg);
        }
      })
      .catch(error => console.log('Error: ', error));
  };
  const appVersion = DeviceInfo.getVersion();
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LanguageScreen')}
          style={{flexDirection: 'row'}}>
          <FontAwesome name="language" size={30} style={{margin: 10}} />
          <Text style={styles.text}>{i18n.t('ChangeLanguage')}</Text>
          <AntDesign
            name="arrowright"
            size={25}
            style={{marginTop: 10, right: 10}}
          />
        </TouchableOpacity>
        <View style={styles.line}></View>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => navigation.navigate('ChangePass')}>
          <FontAwesome5 name="key" size={30} style={{margin: 10}} />
          <Text style={styles.text}>{i18n.t('ChangePass')}</Text>
          <AntDesign
            name="arrowright"
            size={25}
            style={{marginTop: 10, right: 10}}
          />
        </TouchableOpacity>
        <View style={styles.line}></View>
        <View style={{flexDirection: 'row'}}>
          <Octicons name="versions" size={30} style={{margin: 10}} />
          <Text style={styles.text}>{i18n.t('Version')}</Text>
          <Text
            style={{
              marginTop: 10,
              right: 10,
              fontSize: 20,
              color: 'black',
            }}>
            {appVersion}
          </Text>
        </View>
        <View style={styles.line}></View>
        <View>
          <TouchableOpacity
            onPress={() => handleLogOut()}
            style={styles.btnLogin}>
            <Text style={styles.textLogout}>{i18n.t('Logout')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SettingScreen;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  btnLogin: {
    width: SCREEN_WIDTH - 20,
    height: 46,
    top: 20,
    borderRadius: 5,
    borderColor: '#016243',
    borderWidth: 1,
    ...Platform.select({
      android:{
        marginLeft:10,
        marginRight:10
      }
    })
  },
  textLogout: {
    width: 93,
    height: 30,
    left: 140,
    top: 10,
    color: '#016243',
    fontFamily: 'Chakra-Petch',
    fontSize: 18,
  },
  text: {
    fontSize: 16,
    marginLeft: 20,
    marginTop: 10,
    color: '#666666',
    fontFamily: 'Chakra-Petch',
    flex: 1,
  },
  line: {
    width: 350,
    height: 1,
    backgroundColor: 'grey',
    marginLeft: 65,
  },
});
