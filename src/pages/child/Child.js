import * as React from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import FabButton from '../../component/FabButton';
import {useAppSelector} from '../../redux/store';
import {API_GET_HAVE_CHILDS} from '../../repository/Type';
import {useNavigation} from '@react-navigation/native';
import SvgChild from '../../assets/svg/ChildSvg';
import moment from 'moment';
const TabViewExample = () => {
  const navigation = useNavigation();
  const [index, setIndex] = React.useState(0);
  const access_token = useAppSelector(state => state.auth.access_token);
  const [data, setData] = React.useState([]);
  const [routes, setRoutes] = React.useState([]);
  const [child_id,setChild_id] = React.useState(null)
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getChilds = () => {
        fetch(API_GET_HAVE_CHILDS, {
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
              const child_id = json.result?.data?.app_data[0]?.data[0]?.value?.id;
              setData(json.result.data.app_data);
              setRoutes(stages);
              setChild_id(child_id);
            }
          })
          .catch(error => console.log('Error: ', error));
      };
      getChilds();
    });
    return unsubscribe;
  }, [navigation, index]);
  // React.useEffect(() => {}, [index]);

  const handleDetail = () =>{
    navigation.navigate('DetailChild',{child_id:child_id})
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#016243'}}
      style={{backgroundColor: 'white'}}
      labelStyle={{fontSize: 15, color: '#016243', fontFamily: 'Chakra-Petch'}}
      tabContainerStyle={{justifyContent: 'flex-start'}}
      scrollEnabled={true}
      tabStyle={{flex: 1, padding: 0, height: 50}}
    />
  );

  const Tab = () => {
    return (
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <TouchableOpacity onPress={handleDetail}>
            <View style={{backgroundColor: 'DEE0E2'}}>
              <View
                style={{
                  margin: 10,
                  backgroundColor: 'white',
                  elevation: 1,
                  height: 130,
                  borderRadius: 10,
                  flexDirection: 'row',
                }}>
                <View style={styles.imgFlat}>
                  <View
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 50,
                      backgroundColor: 'white',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <SvgChild />
                  </View>
                </View>
                <View style={{marginLeft: 10, margin: 10}}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Chakra-Petch',
                      fontSize: 16,
                    }}>
                    {item?.value?.name}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'gray', fontSize: 16}}>Từ ngày: </Text>
                    <Text style={{color: 'gray', fontSize: 16}}>
                      {moment(item?.value?.from_date).format(
                        'DD/MM/YYYY',
                      )}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'gray', fontSize: 16}}>
                      Đến ngày:{' '}
                    </Text>
                    <Text style={{color: 'gray', fontSize: 16}}>
                      {moment(item?.value?.to_date).format(
                        'DD/MM/YYYY',
                      )}
                    </Text>
                  </View>
                  <View
                    style={{flexDirection: 'row', marginTop: 20, bottom: 10}}>
                    <Text style={{color: 'gray', fontSize: 16}}>
                      Trạng thái:{' '}
                    </Text>
                    <Text style={{color: 'gray', fontSize: 16}}>
                      {item?.value?.stage_id}
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
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />

      <FabButton onPress={() => navigation.navigate('CreateChild')} />
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
    height: 130,
    width: 120,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
