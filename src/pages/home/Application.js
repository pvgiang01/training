import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SvgWork from '../../assets/svg/WorkSvg';
import SvgLeave from '../../assets/svg/LeaveSvg';
import SvgChild from '../../assets/svg/ChildSvg';
import SvgProject from '../../assets/svg/ProjectSvg';
import SvgFile from '../../assets/svg/FileSvg';
import SvgTime from '../../assets/svg/TimeSvg';
import {useAppSelector} from '../../redux/store';
import {API_GET_REMAIN_LEAVE} from '../../repository/Type';

const Application = ({navigation,route}) => {
  const access_token = useAppSelector(state => state.auth.accessToken);
  const [dataLeave, setDataLeave] = useState();

  useEffect(() => {
    fetch(API_GET_REMAIN_LEAVE, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: access_token,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.result?.code == 200) {
          const data = json.result.data;
          setDataLeave(data);
        }
      })
      .catch(error => console.log('Error: ', error));
  },[]);

  return (
    <ScrollView style={styles.container}>
      <View style={{backgroundColor: '#016243', height: 170}}>
        <View style={{width: 50}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingScreen')}>
            <Ionicons
              name="settings-outline"
              size={30}
              color="white"
              style={{left: 370, top: 20}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.viewProfile}>
          <View style={styles.imgProfile}></View>
          <Text style={styles.textName}>Bùi Tiến Dũng</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            marginTop: 200,
            marginLeft: 30,
          }}>
          <View style={{flexDirection: 'column', marginRight: 10}}>
            <Text style={styles.text}>Quản lí công</Text>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 20,
                color: '#016243',
                fontFamily: 'Chakra-Petch',
              }}>
              2/24
            </Text>
          </View>
          <View
            style={{
              height: 50,
              width: 2,
              backgroundColor: 'grey',
              marginRight: 15,
            }}></View>
          <View style={{flexDirection: 'column', marginRight: 10}}>
            <Text style={styles.text}>Số phép đã dùng</Text>
            <Text style={styles.leave}>{dataLeave?.used_leave}</Text>
          </View>
          <View style={styles.line}></View>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.text}>Số phép còn lại</Text>
            <Text style={styles.leave}>{dataLeave?.remain_leave}</Text>
          </View>
        </View>
      </View>
      <View style={{marginLeft: 10, marginTop: 100}}>
        <Text style={styles.textCategory}>Ưa thích</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.viewWork}
          onPress={() => navigation.navigate('Work')}>
          <SvgWork />
          <Text style={styles.textWork}>Bảng công</Text>
        </TouchableOpacity>
        <View style={styles.viewWork}>
          <SvgLeave />
          <Text style={styles.textWork}>Xin nghỉ</Text>
        </View>
        <View style={styles.viewWork}>
          <SvgChild style={{marginTop: 15}} />
          <Text
            style={[
              styles.textWork,
              {maxWidth: '100%', flexWrap: 'wrap', textAlign: 'center'},
            ]}>
            Chế độ con nhỏ
          </Text>
        </View>
        <View style={styles.viewWork}>
          <SvgProject style={{margin: 10}} />
          <Text
            style={[
              styles.textWork,
              {maxWidth: '100%', flexWrap: 'wrap', textAlign: 'center'},
            ]}>
            Đăng kí đi dự án
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View style={styles.viewWork}>
          <SvgFile style={{marginTop: 15}} />
          <Text
            style={[
              styles.textWork,
              {maxWidth: '100%', flexWrap: 'wrap', textAlign: 'center'},
            ]}>
            Đăng kí đi muộn về sớm
          </Text>
        </View>
        <View style={styles.viewWork}>
          <SvgTime />
          <Text
            style={[
              styles.textWork,
              {maxWidth: '100%', flexWrap: 'wrap', textAlign: 'center'},
            ]}>
            Số giờ làm thêm
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 5,
          width: '100%',
          backgroundColor: '#cccccc',
          marginTop: 40,
        }}
      />
      <View style={{marginLeft: 10}}>
        <Text style={styles.textCategory}>Hoạt động gần đây</Text>
      </View>
    </ScrollView>
  );
};

export default Application;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  viewProfile: {
    backgroundColor: 'white',
    position: 'absolute',
    height: 160,
    width: 390,
    margin: 10,
    top: 90,
    borderRadius: 20,
    elevation: 2,
  },
  imgProfile: {
    position: 'absolute',
    height: 120,
    width: 120,
    borderRadius: 100,
    backgroundColor: null,
    marginLeft: 130,
    bottom: 120,
    flexDirection: 'column',
    borderColor: 'white',
    borderWidth: 2,
    elevation: 2,
  },
  textName: {
    justifyContent: 'center',
    marginTop: 50,
    fontSize: 25,
    marginLeft: 110,
    color: 'black',
    fontWeight: 'bold',
  },
  line: {
    height: 50,
    width: 2,
    backgroundColor: 'grey',
    marginRight: 15,
  },
  leave: {
    fontSize: 20,
    fontFamily: 'Chakra-Petch',
    marginLeft: 50,
    color: '#016243',
  },
  viewWork: {
    marginLeft: 10,
    height: 110,
    width: 90,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWork: {
    fontSize: 15,
    fontFamily: 'Chakra-Petch',
    color: '#404040',
  },
  textCategory: {
    fontSize: 20,
    fontFamily: 'Chakra-Petch',
    color: '#262626',
  },
});
