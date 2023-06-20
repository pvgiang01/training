import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Dimensions,
  Platform,
  ToastAndroid,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {setUser} from '../../redux/slices/auth.slice';
import {useDispatch} from 'react-redux';
import {API_SIGNIN} from '../../repository/Type';
import SvgBackground from '../../assets/svg/Background';
import SvgLogo from '../../assets/svg/LogoSvg';
import SvgYoutube from '../../assets/svg/YoutubeSvg';
import SvgWebsite from '../../assets/svg/WebSvg';
import SvgFacebook from '../../assets/svg/FacebookSvg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import i18n from '../../i18n/i18n';
import TouchID from 'react-native-touch-id';
import * as Keychain from 'react-native-keychain';
import {useAppSelector} from '../../redux/store';
import FingerprintScanner from 'react-native-fingerprint-scanner';
export const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [type, setType] = useState('odoo');
  const [login, setLogin] = useState();
  const [password, setPassword] = useState('');
  const [showP, setShowP] = useState(false);
  const [isSupport, setIsSupport] = useState(null);
  const token = useAppSelector(state => state.auth.access_token);
  console.log('token', token);
  const optionalConfigObject = {
    title: 'Xác thực vân tay',
    cancelText: 'Hủy bỏ',
  };

  const handleLogin = () => {
    fetch(API_SIGNIN, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
        login: login,
        password: password,
        device_id: DeviceInfo.getDeviceId(),
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.result?.code === 200) {
          const result = json.result.data;
          Keychain.setGenericPassword(login, password);
          dispatch(setUser(result));
          navigation.navigate('MyTabs');
        } else {
          ToastAndroid.show(json.result.message, ToastAndroid.SHORT);
        }
      })
      .catch(err => console.warn(err));
  };

  async function handleTouchID() {
    try {
      await FingerprintScanner.authenticate({description: 'Xác thực vân tay'});
      await handleLogin();
    } catch (error) {
      ToastAndroid.show('False', ToastAndroid.SHORT);
    }
    // FingerprintScanner.authenticate({description: 'Xác thực vân tay'})
    //   .then(() => {
    //     ToastAndroid.show('True', ToastAndroid.SHORT);
    //     await handleLogin();
    //   })
    //   .catch(() => {
    //     ToastAndroid.show('False', ToastAndroid.SHORT);
    //   });
  }

  // const handleTouchID = () => {
  //   TouchID.authenticate('', optionalConfigObject)
  //     .then(() => {
  //       // Xác thực Touch ID thành công
  //       Keychain.getGenericPassword().then(credentials => {
  //         if (credentials) {
  //           const login = credentials.username;
  //           const password = credentials.password;
  //           fetch(API_SIGNIN, {
  //             method: 'POST',
  //             headers: {
  //               Accept: 'application/json',
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({
  //               type: type,
  //               login: login,
  //               password: password,
  //               device_id: DeviceInfo.getDeviceId(),
  //             }),
  //           })
  //             .then(response => response.json())
  //             .then(json => {
  //               if (json.result?.code === 200) {
  //                 const result = json.result.data;
  //                 dispatch(setUser(result));
  //                 navigation.navigate('MyTabs');
  //               } else {
  //                 ToastAndroid.show(json.result.message, ToastAndroid.SHORT);
  //               }
  //             })
  //             .catch(err => console.warn(err));
  //         }
  //       });
  //     })
  //     .catch(error => {
  //       console.log('Xác thực Touch ID không thành công:', error);
  //     });
  // };

  useEffect(() => {
    TouchID.isSupported()
      .then(biometryType => {
        console.log('success', biometryType);
        setIsSupport(biometryType);
      })
      .catch(err => console.log('Error: ', err));
  }, []);

  return (
    <View style={styles.container}>
      <SvgBackground style={styles.imgBackground} />
      <View>
        <SvgLogo style={styles.imgLogo} />
      </View>
      <View style={styles.inputEmail}>
        <TextInput
          style={{fontFamily: 'Chakra-Petch'}}
          value={login}
          placeholder={i18n.t('User')}
          onChangeText={text => setLogin(text)}
          placeholderTextColor="gray"
        />
      </View>
      <View style={{position: 'relative'}}>
        <View style={styles.inputPass}>
          <TextInput
            style={{fontFamily: 'Chakra-Petch'}}
            value={password}
            placeholder={i18n.t('Password')}
            onChangeText={text => setPassword(text)}
            placeholderTextColor="gray"
            secureTextEntry={!showP}
          />
          <FontAwesome5
            name={showP ? 'eye-slash' : 'eye'}
            onPress={() => setShowP(!showP)}
            color="gray"
            size={20}
            style={{
              position: 'absolute',
              zIndex: 9,
              right: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          position: 'absolute',
        }}>
        <TouchableOpacity style={styles.btnLogin} onPress={() => handleLogin()}>
          <Text style={styles.textLogin}>{i18n.t('SignIn')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnLogin, {marginTop: 50}]}
          onPress={() => handleTouchID()}>
          <Text style={styles.textTouchid}>Đăng nhập vân tay</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewIcon}>
        <View style={{flexDirection: 'column', marginHorizontal: 25}}>
          <SvgWebsite />
          <Text style={styles.textIcon}>Website</Text>
        </View>
        <View style={{flexDirection: 'column', marginHorizontal: 25}}>
          <SvgYoutube />
          <Text style={styles.textYou}>Youtube</Text>
        </View>
        <View style={{flexDirection: 'column', marginHorizontal: 25}}>
          <SvgFacebook />
          <Text style={styles.textFace}>Facebook</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBackground: {
    position: 'absolute',
    flex: 1,
  },
  imgLogo: {
    position: 'absolute',
    width: 216,
    height: 181,
    left: 85,
    top: 70,
  },
  inputEmail: {
    width: SCREEN_WIDTH - 20,
    minHeight: 50,
    paddingLeft: 10,
    top: 294,
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 5,
    flex: 1,
    ...Platform.select({
      android: {
        marginLeft: 10,
        marginRight: 10,
      },
    }),
  },
  inputPass: {
    flex: 1,
    width: SCREEN_WIDTH - 20,
    minHeight: 50,
    alignItems: 'center',
    paddingRight: 50,
    top: 355,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 5,
    flexDirection: 'row',
    paddingLeft: 10,
    ...Platform.select({
      android: {
        marginLeft: 10,
        marginRight: 10,
      },
    }),
  },
  btnLogin: {
    position: 'absolute',
    width: SCREEN_WIDTH - 20,
    height: 46,
    top: 440,
    borderRadius: 5,
    backgroundColor: '#016243',
    ...Platform.select({
      android: {
        marginLeft: 10,
        marginRight: 10,
      },
    }),
  },
  textLogin: {
    height: 30,
    left: 140,
    top: 10,
    color: '#FFFFFF',
    fontFamily: 'Chakra-Petch',
    fontStyle: 'normal',
    fontSize: 18,
  },
  textTouchid: {
    height: 30,
    left: 110,
    top: 10,
    color: '#FFFFFF',
    fontFamily: 'Chakra-Petch',
    fontStyle: 'normal',
    fontSize: 18,
  },
  viewIcon: {
    position: 'absolute',
    width: 300,
    height: 60,
    left: 50,
    top: 547,
    flexDirection: 'row',
  },
  textIcon: {
    color: 'white',
    height: 21,
    width: 65,
    right: 10,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    top: 5,
    fontFamily: 'Chakra-Petch',
  },
  textYou: {
    color: 'white',
    height: 21,
    width: 65,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    top: 10,
    right: 5,
    fontFamily: 'Chakra-Petch',
  },
  textFace: {
    color: 'white',
    height: 21,
    width: 70,
    right: 15,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    top: 5,
    fontFamily: 'Chakra-Petch',
  },
});
