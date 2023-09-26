import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';
import DetailScreen from '../screens/DetailScreen';
import ReservationScreen from '../screens/ReservationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StoreReservationScreen from '../screens/StoreReservationScreen';
import { LoginScreen, FindIDScreen, FindPasswordScreen } from '../screens/LoginScreen';
import { SignupScreen1, SignupScreen2, SignupScreen3 } from '../screens/SignupScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

const MapStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="stackMap" component={MapScreen} />
      </Stack.Navigator>
    );
};
  
const ListStack = () => {
  return (
    <Stack.Navigator initialRouteName='stackList' screenOptions={{headerShown: false}}>
      <Stack.Screen name="stackList" component={ListScreen} />
      <Stack.Screen name="stackDetail" component={DetailScreen} />
      <Stack.Screen name="stackStoreReservation" component={StoreReservationScreen} />
      <Stack.Screen name="stackSearch" component={SearchScreen} />
    </Stack.Navigator>
  );
};

const ReservationStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="stackReservation" component={ReservationScreen} />
    </Stack.Navigator>
  );
};

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName='stackLogin' screenOptions={{headerShown: false}}>
      <Stack.Screen name="stackLogin" component={LoginScreen} />
      <Stack.Screen name="stackProfile" component={ProfileScreen} />
      <Stack.Screen name="stackFindID" component={FindIDScreen} />
      <Stack.Screen name="stackFindPassword" component={FindPasswordScreen} />
    </Stack.Navigator>
  );
};

const SignupStack = () => {
  return (
    <Stack.Navigator initialRouteName='stackSignup1' screenOptions={{headerShown: false}}>
      <Stack.Screen name="stackSignup1" component={SignupScreen1} />
      <Stack.Screen name="stackSignup2" component={SignupScreen2} />
      <Stack.Screen name="stackSignup3" component={SignupScreen3} />
      <Stack.Screen name="stackLogin" component={LoginScreen} />
      <Stack.Screen name="stackFindID" component={FindIDScreen} />
      <Stack.Screen name="stackFindPassword" component={FindPasswordScreen} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="stackProfile" component={ProfileScreen} />
    </Stack.Navigator>
  )
}

export { MapStack, ListStack, ReservationStack, LoginStack, SignupStack, ProfileStack };