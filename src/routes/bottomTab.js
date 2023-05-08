import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from '../pages/home/Home';
import Application from '../pages/home/Application';
import Notifications from '../pages/home/Notifications';

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Application" 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#016243',
        tabBarInactiveTintColor: 'gray',  
        
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabelStyle:{fontFamily:'Chakra-Petch'},
          tabBarLabel: 'Danh bạ',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="book-account-outline"
              color={color}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Application"
        component={Application}
        options={{
          tabBarLabelStyle:{fontFamily:'Chakra-Petch'},
          tabBarLabel: 'Ứng dụng',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="grid" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
      name='Notifications'
      component={Notifications}
      options={{
        tabBarLabelStyle:{fontFamily:'Chakra-Petch'},
        tabBarLabel:'Thông báo',
        tabBarIcon:({color,size}) =>(
          <Ionicons name="notifications" color={color} size={30}/>
        ),
      }}/>
    </Tab.Navigator>
  );
}
export default MyTabs;
