import * as React from 'react';
import {View, useWindowDimensions, StyleSheet,TouchableOpacity} from 'react-native';
import {Text} from 'react-native-svg';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
const FirstRoute = ({navigation}) => (
  <View style={{flex: 1, backgroundColor: 'white'}}>
    <TouchableOpacity onPress={()=>navigation.navigate('CreateLeave')}
    style={styles.viewAdd}>
      <Ionicons name="add" size={30} style={{margin: 10}} color="white" />
    </TouchableOpacity>
  </View>
);

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

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
  fifth: FifthRoute,
});
const TabViewProject = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Tất cả'},
    {key: 'second', title: 'Nháp'},
    {key: 'third', title: 'Quản lý trực tiếp duyệt'},
    {key: 'fourth', title: 'Hoàn thành'},
    {key: 'fifth', title: 'Hủy bỏ'},
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
export default TabViewProject;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
