import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  Platform,
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
  const access_token = useAppSelector(state => state.auth.access_token);
  const auth = useAppSelector(state => state.auth);
  const [dataLeave, setDataLeave] = useState();

  useEffect(() => {
    async function getRemainLeave() {
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
    }
    getRemainLeave();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{backgroundColor: '#016243', height: 140}}>
        <View style={styles.viewProfile}>
          <Pressable onPress={() => {}} style={styles.imgProfile}>
            <Image
              source={{uri: auth?.employee_id?.img_url}}
              style={styles.img}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={styles.textName}>{auth?.employee_id?.name}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingScreen')}>
            <Ionicons
              style={{top: 5, marginRight: 20}}
              name="settings-outline"
              size={30}
              color="#016243"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            marginTop: 110,
            marginLeft: 140,
          }}>
          <View style={{flexDirection: 'column', marginRight: 10}}>
            <Text style={styles.text}>Quản lí công</Text>
            <Text style={styles.leave}>4.5/24</Text>
          </View>
          <View style={styles.line} />
          <View style={{flexDirection: 'column', marginLeft: 10}}>
            <Text style={styles.text}>Số giờ nghỉ bù</Text>
            <Text style={styles.leave}>{dataLeave?.remaining_hours}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            marginTop: 170,
            marginLeft: 140,
          }}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.text}>Số phép đã dùng</Text>
            <Text style={styles.leave}>{dataLeave?.used_leave}</Text>
          </View>
          <View style={styles.line2} />
          <View style={{flexDirection: 'column', marginLeft: 10}}>
            <Text style={styles.text}>Số phép còn lại</Text>
            <Text style={styles.leave}>{dataLeave?.remain_leave}</Text>
          </View>
        </View>
      </View>
      <View style={{marginLeft: 10, marginTop: 100}}>
        <Text style={styles.textCategory}>Ưa thích</Text>
      </View>
      <View style={{flexDirection: 'row', padding: 5}}>
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
          onPress={() => navigation.navigate('TabViewChild')}
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
      <View
        style={{
          flexDirection: 'row',
          paddingLeft: 5,
          paddingTop: 5,
        }}>
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
const SCREEN_WIDTH = Dimensions.get('screen').width;
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
    height: 130,
    width: 100,
    top: 20,
    left: 10,
    borderRadius: 5,
  },
  viewProfile: {
    backgroundColor: 'white',
    position: 'absolute',
    height: 170,
    width: SCREEN_WIDTH - 20,
    top: 60,
    borderRadius: 20,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Platform.select({
      android: {
        marginLeft: 10,
        marginRight: 10,
      },
    }),
  },
  imgProfile: {
    position: 'absolute',
  },
  textName: {
    justifyContent: 'center',
    marginTop: 5,
    fontSize: 20,
    paddingLeft: 130,
    color: 'black',
    fontWeight: 'bold',
  },
  line: {
    height: 35,
    width: 2,
    backgroundColor: '#cccccc',
    marginLeft: 30,
    top: 15,
  },
  line2: {
    height: 35,
    width: 2,
    backgroundColor: '#cccccc',
    marginLeft: 10,
    top: 15,
  },
  leave: {
    fontSize: 17,
    fontFamily: 'Chakra-Petch',
    color: '#016243',
  },
  viewWork: {
    height: 110,
    width: 90,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        marginLeft: 5,
        marginRight: 5,
      },
    }),
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
