import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import LoginScreen from '../pages/account/SignIn';
import {useAppSelector} from '../redux/store';
import MyTabs from '../routes/bottomTab';
import DetailScreen from '../pages/detail/DetailEmployee';
import ChangePass from '../pages/account/Change_Pass';
import Application from '../pages/home/Application';
import SettingScreen from '../pages/home/Setting';
import DetailNotification from '../pages/detail/DetailNotification';
import LanguageScreen from '../pages/home/Language';
import WorkScreen from '../pages/work/Work';
import LeaveScreen from '../pages/leave/Leave';
import CreateLeave from '../pages/leave/Create_leave';
import TabViewChild from '../pages/child/Child';
import TabViewProject from '../pages/project/GoProject';
import CreateChild from '../pages/child/Create_Child';
import CreateProject from '../pages/project/Create_Project';
import DetailWork from '../pages/work/DetailWork';
import DetailLeave from '../pages/leave/DetailLeave';
import DetailChild from '../pages/child/DetailChild';
const Stack = createNativeStackNavigator();

const RootNav = () => {
  const isSignedIn = useAppSelector(state => state.auth.isSignedIn);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isSignedIn ? 'MyTabs' : 'Login'}
          screenOptions={{
            gestureDirection: 'horizontal',
          }}>
          <Stack.Screen
            name="Application"
            component={Application}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangePass"
            component={ChangePass}
            options={{
              headerTitle: 'Đổi mật khẩu',
              headerTintColor: 'white',
              headerStyle: {backgroundColor: '#016243'},
              headerTitleStyle: {fontFamily: 'Chakra-Petch'},
            }}
          />
          <Stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{
              headerTitle: 'Hồ sơ nhân sự',
              headerTintColor: 'white',
              headerStyle: {backgroundColor: '#016243'},
              headerTitleStyle: {fontFamily: 'Chakra-Petch'},
            }}
          />
          <Stack.Screen
            name="SettingScreen"
            component={SettingScreen}
            options={{
              headerTitle: 'Cài đặt',
              headerTintColor: 'white',
              headerStyle: {backgroundColor: '#016243'},
              headerTitleStyle: {fontFamily: 'Chakra-Petch'},
            }}
          />
          <Stack.Screen
            name="DetailNotification"
            component={DetailNotification}
            options={{
              headerTitle: 'Bảng công',
              headerTintColor: 'white',
              headerStyle: {backgroundColor: '#016243'},
              headerTitleStyle: {fontFamily: 'Chakra-Petch'},
            }}
          />
          <Stack.Screen
            name="Work"
            component={WorkScreen}
            options={{
              headerTitle: 'Bảng công',
              headerTintColor: 'white',
              headerStyle: {backgroundColor: '#016243'},
              headerTitleStyle: {fontFamily: 'Chakra-Petch'},
            }}
          />
           <Stack.Screen
            name="DetailWork"
            component={DetailWork}
            options={{
              headerTitle: 'Bảng công',
              headerTintColor: 'white',
              headerStyle: {backgroundColor: '#016243'},
              headerTitleStyle: {fontFamily: 'Chakra-Petch'},
            }}
          />
          <Stack.Screen
            name="LanguageScreen"
            component={LanguageScreen}
            options={{
              headerTitle: 'Cài đặt ngôn ngữ',
              headerTintColor: 'white',
              headerStyle: {backgroundColor: '#016243'},
              headerTitleStyle: {fontFamily: 'Chakra-Petch'},
            }}
          />
          <Stack.Screen
            name="LeaveScreen"
            component={LeaveScreen}
            options={{
              headerTitle: 'Xin nghỉ',
              headerTintColor: 'white',
              headerStyle: {backgroundColor: '#016243'},
              headerTitleStyle: {fontFamily: 'Chakra-Petch'},
            }}
          />
          <Stack.Screen
            name="CreateLeave"
            component={CreateLeave}
            options={{
              headerTitle: 'Tạo phép nghỉ mới',
              headerTintColor: 'white',
              headerStyle: {backgroundColor: '#016243'},
              headerTitleStyle: {fontFamily: 'Chakra-Petch'},
            }}
          />
          <Stack.Screen
            name="TabViewChild"
            component={TabViewChild}
            options={{
              headerTitle: 'Chế độ con nhỏ',
              headerTintColor: 'white',
              headerStyle: {backgroundColor: '#016243'},
              headerTitleStyle: {fontFamily: 'Chakra-Petch'},
            }}
          />
           <Stack.Screen
            name="DetailChild"
            component={DetailChild}
            options={{
              headerTitle: 'Chế độ con nhỏ',
              headerTintColor: 'white',
              headerStyle: {backgroundColor: '#016243'},
              headerTitleStyle: {fontFamily: 'Chakra-Petch'},
            }}
          />
          <Stack.Screen
            name="TabViewProject"
            component={TabViewProject}
            options={{
              headerTitle: 'Đăng kí đi dự án',
              headerTintColor: 'white',
              headerStyle: {backgroundColor: '#016243'},
              headerTitleStyle: {fontFamily: 'Chakra-Petch'},
            }}
          />
          <Stack.Screen
            name="CreateChild"
            component={CreateChild}
            options={{
              headerTitle: 'Đăng kí chế độ con nhỏ',
              headerTintColor: 'white',
              headerStyle: {backgroundColor: '#016243'},
              headerTitleStyle: {fontFamily: 'Chakra-Petch'},
            }}
          />
          <Stack.Screen
            name="CreateProject"
            component={CreateProject}
            options={{
              headerTitle: 'Tạo mới đăng kí đi dự án',
              headerTintColor: 'white',
              headerStyle: {backgroundColor: '#016243'},
              headerTitleStyle: {fontFamily: 'Chakra-Petch'},
            }}
          />
          <Stack.Screen
            name="DetailLeave"
            component={DetailLeave}
            options={{
              headerTitle: 'Xin nghỉ',
              headerTintColor: 'white',
              headerStyle: {backgroundColor: '#016243'},
              headerTitleStyle: {fontFamily: 'Chakra-Petch'},
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootNav;
