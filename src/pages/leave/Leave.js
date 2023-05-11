import * as React from 'react';
import {
  View,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SvgLeave from '../../assets/svg/LeaveSvg';
import {useAppSelector} from '../../redux/store';
const FirstRoute = ({navigation}) => {
  const access_token = useAppSelector(state => state.auth.accessToken);
  return (
    <View>
      <View style={{flex: 1, backgroundColor: '#DEE0E2'}}>
        <View
          style={{
            backgroundColor: '#e6f9ff',
            width: '100%',
            height: 50,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Chakra-Petch',
              color: 'black',
              margin: 5,
            }}>
            Tháng 5 năm 2023
          </Text>
        </View>
        <View
          style={{
            margin: 10,
            backgroundColor: 'white',
            elevation: 1,
            height: 180,
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <View style={styles.imgFlat}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SvgLeave />
            </View>
          </View>
          <View style={{marginLeft: 10, margin: 10}}>
            <Text style={styles.textFlat}>Đơn xin nghỉ</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'gray', fontSize: 16}}>Nhân sự:</Text>
              <Text style={{color: 'gray', fontSize: 16}}>Bùi Việt Dùng</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'gray', fontSize: 16}}>Phòng ban:</Text>
              <Text style={{color: 'gray', fontSize: 16}}>
                Ban Tư vấn Giám sát
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'gray', fontSize: 16}}>Từ ngày:</Text>
              <Text style={{color: 'gray', fontSize: 16}}>10/05/2023</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'gray', fontSize: 16}}>Đến ngày:</Text>
              <Text style={{color: 'gray', fontSize: 16}}>10/05/2023</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'gray', fontSize: 16}}>Lý do:</Text>
              <Text style={{color: 'gray', fontSize: 16}}>Test</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20, bottom: 10}}>
              <Text style={{color: 'gray', fontSize: 16}}>Trạng thái:</Text>
              <Text style={{color: 'gray', fontSize: 16}}>
                Quản lý trực tiếp duyệt
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateLeave')}
        style={styles.viewAdd}>
        <Ionicons name="add" size={30} style={{margin: 10}} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: 'white'}}>
    <View style={styles.viewAdd}>
      <Ionicons name="add" size={30} style={{margin: 10}} color="white" />
    </View>
  </View>
);
const ThirdRoute = () => (
  <View style={{flex: 1, backgroundColor: 'white'}}>
    <View style={styles.viewAdd}>
      <Ionicons name="add" size={30} style={{margin: 10}} color="white" />
    </View>
  </View>
);
const FourthRoute = () => (
  <View style={{flex: 1, backgroundColor: 'white'}}>
    <View style={styles.viewAdd}>
      <Ionicons name="add" size={30} style={{margin: 10}} color="white" />
    </View>
  </View>
);
const FifthRoute = () => (
  <View style={{flex: 1, backgroundColor: 'white'}}>
    <View style={styles.viewAdd}>
      <Ionicons name="add" size={30} style={{margin: 10}} color="white" />
    </View>
  </View>
);
const SixthRoute = () => (
  <View style={{flex: 1, backgroundColor: 'white'}}>
    <View style={styles.viewAdd}>
      <Ionicons name="add" size={30} style={{margin: 10}} color="white" />
    </View>
  </View>
);
const SeventhRoute = () => (
  <View style={{flex: 1, backgroundColor: 'white'}}>
    <View style={styles.viewAdd}>
      <Ionicons name="add" size={30} style={{margin: 10}} color="white" />
    </View>
  </View>
);
const EighthRoute = () => (
  <View style={{flex: 1, backgroundColor: 'white'}}>
    <View style={styles.viewAdd}>
      <Ionicons name="add" size={30} style={{margin: 10}} color="white" />
    </View>
  </View>
);
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
  fifth: FifthRoute,
  sixth: SixthRoute,
  seventh: SeventhRoute,
  eighth: EighthRoute,
});
const TabViewExample = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Tất cả'},
    {key: 'second', title: 'Nháp'},
    {key: 'third', title: 'Quản lý trực tiếp duyệt'},
    {key: 'fourth', title: 'TB HCNS phê duyệt'},
    {key: 'fifth', title: 'TB/GM phê duyệt'},
    {key: 'sixth', title: 'TGD phê duyệt'},
    {key: 'seventh', title: 'Hoàn thành'},
    {key: 'eighth', title: 'Hủy bỏ'},
  ]);
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#016243'}}
      style={{backgroundColor: 'white'}}
      labelStyle={{fontSize: 15, color: '#016243', fontFamily: 'Chakra-Petch'}}
      tabContainerStyle={{justifyContent: 'flex-start'}}
      scrollEnabled={true}
      tabStyle={{flex: 1, maxWidth: 300, padding: 0, height: 50}}
    />
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
};
export default TabViewExample;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEE0E2',
  },
  viewAdd: {
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: '#016243',
    margin: 350,
    top: 160,
  },
  textAdd: {
    color: 'white',
    fontSize: 20,
  },
  imgFlat: {
    height: 180,
    width: 120,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFlat: {
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'Chakra-Petch',
  },
});
