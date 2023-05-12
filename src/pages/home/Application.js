import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SvgWork from '../../assets/svg/WorkSvg';
import SvgLeave from '../../assets/svg/LeaveSvg';
import SvgChild from '../../assets/svg/ChildSvg';
import SvgProject from '../../assets/svg/ProjectSvg';
import SvgFile from '../../assets/svg/FileSvg';
import SvgTime from '../../assets/svg/TimeSvg';
import SvgPlane from '../../assets/svg/plane';
import {useAppSelector} from '../../redux/store';
import {API_GET_REMAIN_LEAVE} from '../../repository/Type';

const Application = ({navigation}) => {
  const access_token = useAppSelector(state => state.auth.accessToken);
  const [dataLeave, setDataLeave] = useState();
  const image =
    'https://vanhuong-poc.izisolution.vn/web/image/employee/5966?timestamp=1683516718';
  useEffect(() => {
    async function getRemainLeave(){
     await fetch(API_GET_REMAIN_LEAVE, {
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
        if (json.result?.status) {
          const data = json.result.data;
          setDataLeave(data);
        }
      })
      .catch(error => console.log('Error: ', error));
    };
    getRemainLeave();
  }, []);

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
          <View style={styles.imgProfile}>
            <Image
              source={{uri: image}}
              style={styles.img}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.textName}>Bùi Việt Dũng</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            marginTop: 190,
            marginLeft: 30,
            marginRight:30
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
      <View style={{flexDirection: 'row',marginLeft:5,marginRight:10}}>
        <TouchableOpacity
          style={styles.viewWork}
          onPress={() => navigation.navigate('Work')}>
          <SvgWork />
          <Text style={styles.textWork}>Bảng công</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('LeaveScreen')}
          style={styles.viewWork}>
          <SvgLeave />
          <Text style={styles.textWork}>Xin nghỉ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateChild')}
          style={styles.viewWork}>
          <SvgChild style={{marginTop: 15}} />
          <Text
            style={[
              styles.textWork,
              {maxWidth: '100%', flexWrap: 'wrap', textAlign: 'center'},
            ]}>
            Chế độ con nhỏ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateProject')}
          style={styles.viewWork}>
          <SvgProject style={{margin: 10}} />
          <Text
            style={[
              styles.textWork,
              {maxWidth: '100%', flexWrap: 'wrap', textAlign: 'center'},
            ]}>
            Đăng kí đi dự án
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginTop: 10,marginLeft:5,marginRight:5}}>
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
          <SvgPlane />
          <Text
            style={[
              styles.textWork,
              {maxWidth: '100%', flexWrap: 'wrap', textAlign: 'center'},
            ]}>
            Đơn công tác
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
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  img: {
    borderRadius: 100,
    height: 110,
    width: 110,
    marginTop: 6,
  },
  viewProfile: {
    backgroundColor: 'white',
    position: 'absolute',
    height: 160,
    width: 390,
    marginLeft:10,
    marginRight:10,
    top: 90,
    borderRadius: 20,
    elevation: 2,
    flex:1
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
    height: 110,
    width: 90,
    marginHorizontal:5,
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
