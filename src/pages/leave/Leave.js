import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useState } from 'react';
import { SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import SvgLeave from '../../assets/svg/LeaveSvg';
import FabButton from '../../component/FabButton';
import { useAppSelector } from '../../redux/store';
import { API_GET_LEAVES } from '../../repository/Type';

const TabViewExample = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);

  const access_token = useAppSelector(state => state.auth.access_token);
  const [data, setData] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [leave_id,setLeave_id] = useState(null)
// console.log("99999", routes.length !== 0 ? routes[index]?.key : 0,);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getLeaves = () => {
        fetch(API_GET_LEAVES, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_token,
            from_date: moment().startOf('year').format('YYYY-MM-DD'),
            to_date: moment().endOf('year').format('YYYY-MM-DD'),
            stage_name_id: routes.length !== 0 ? routes[index]?.key : 0,
          }),
        })
          .then(response => response.json())
          .then(json => {
            if (json.result?.status) {
              const stages = json.result.data.stages.map(item => ({
                key: item.stage_name_id,
                title: item.stage_name,
              }));
              const leave_id = json.result?.data?.app_data[0]?.data[0]?.value?.id;
              setData(json.result.data.app_data);
              setRoutes(stages);
              setLeave_id(leave_id)
            }
          })
          .catch(error => console.log('Error: ', error));
      };
      getLeaves();
    });
    return unsubscribe;
  }, [navigation,index]);
  const handleDetail = () =>{
    navigation.navigate('DetailLeave',{leave_id:leave_id})
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#016243' }}
      style={{ backgroundColor: 'white' }}
      labelStyle={{ fontSize: 15,color:'black', fontFamily: 'Chakra-Petch'}}
      tabContainerStyle={{ justifyContent: 'flex-start' }}
      scrollEnabled={true}
      tabStyle={{ flex: 1,padding:0}}
    />
  );
  const Tab = () => {
    return (
      <SectionList 
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={handleDetail}>
            <View style={{ backgroundColor: '#DEE0E2' }}>
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
                <View style={{ marginLeft: 10, margin: 10 }}>
                  <Text style={styles.textFlat}>Đơn xin nghỉ</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'gray', fontSize: 16 }}>Nhân sự: </Text>
                    <Text style={{ color: 'gray', fontSize: 16 }}>
                      {item?.value?.employee?.name}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'gray', fontSize: 16 }}>
                      Phòng ban:{' '}
                    </Text>
                    <Text style={{ color: 'gray', fontSize: 16 }}>
                      {item?.value?.department?.name}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'gray', fontSize: 16 }}>Từ ngày: </Text>
                    <Text style={{ color: 'gray', fontSize: 16 }}>
                      {moment(item?.value?.request_date_from).format('DD/MM/YYYY')}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'gray', fontSize: 16 }}>
                      Đến ngày:{' '}
                    </Text>
                    <Text style={{ color: 'gray', fontSize: 16 }}>
                      {moment(item?.value?.request_date_to).format('DD/MM/YYYY')}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'gray', fontSize: 16 }}>Lý do:</Text>
                    <Text style={{ color: 'gray', fontSize: 16 }}>
                      {item?.value?.note}
                    </Text>
                  </View>
                  <View
                    style={{ flexDirection: 'row', marginTop: 20, bottom: 10 }}>
                    <Text style={{ color: 'gray', fontSize: 16 }}>
                      Trạng thái:{' '}
                    </Text>
                    <Text style={{ color: 'gray', fontSize: 16 }}>
                      {item?.value?.state}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section }) => (
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
              {section?.month}
            </Text>
          </View>
        )}
      />
    );
  };

  const renderScene = () => {
    return Tab();
  };
  return (
    <>
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
      

      <FabButton onPress={() => navigation.navigate('CreateLeave')} />
    </>
  );
};
export default TabViewExample;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEE0E2',
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
