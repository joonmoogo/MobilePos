import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MapStack, ListStack, ReservationStack } from "./Stack";

const Tab = createBottomTabNavigator();

const TabScreenOptions = (routeName, iconName) => ({
  tabBarIcon: ({ color, size }) => (
    <Icon name={iconName} color={color} size={size}></Icon>
  ),
  tabBarLabel: () => null,
});

const createTabNavigator = (initialRouteName) => {
  return (
    <Tab.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="tabMap" component={MapStack} options={TabScreenOptions('tabMap', 'map')} />
      <Tab.Screen name="tabList" component={ListStack} options={TabScreenOptions('tabList', 'restaurant')} />
      <Tab.Screen name="tabReservation" component={ReservationStack} options={TabScreenOptions('tabReservation', 'schedule')} />
    </Tab.Navigator>
  );
};

const MapTab = () => createTabNavigator('tabMap');
const ListTab = () => createTabNavigator('tabList');
const ReservationTab = () => createTabNavigator('tabReservation');

export { MapTab, ListTab, ReservationTab };