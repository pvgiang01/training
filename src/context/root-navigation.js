import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import LoginScreen from '../pages/account/SignIn';
import {useAppSelector} from '../redux/store';
import MyTabs from '../routes/bottomTab';
import DetailScreen from '../pages/home/Detail';
import ChangePass from '../pages/account/Change_Pass';
const Stack = createNativeStackNavigator();

const RootNav = () => {
  const isSignedIn = useAppSelector(state => state.auth.isSignedIn);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isSignedIn ? 'MyTabs' : 'Login'}>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
          <Stack.Screen name='ChangePass' component={ChangePass}/>
          <Stack.Screen name="MyTabs" component={MyTabs} options={{headerShown:false}}/>
          <Stack.Screen name='Detail' component={DetailScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootNav;
