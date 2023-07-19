import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MapStack, ListStack, ReservationStack } from "./Stack";

const Tab = createBottomTabNavigator();

const MapTab = () => {
    return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen 
            name ="tabMap" 
            component={MapStack} 
            options={{
                tabBarIcon: ({color, size}) => (
                    <Icon name="map" color={color} size={size}></Icon>
                ),
                tabBarLabel: () => null,
            }}>
        </Tab.Screen>
        <Tab.Screen 
            name ="tabList" 
            component={ListStack} 
            options={{
                tabBarIcon: ({color, size}) => (
                    <Icon name="restaurant" color={color} size={size}></Icon>
                ),
                tabBarLabel: () => null,
            }}>
        </Tab.Screen>
        <Tab.Screen 
            name="tabReservation" 
            component={ReservationStack} 
            options={{
                tabBarIcon: ({color, size}) => (
                    <Icon name="schedule" color={color} size={size}></Icon>
                ),
                tabBarLabel: () => null,
            }}/>
      </Tab.Navigator>
    );
};
  
const ListTab = () => {
    return (
      <Tab.Navigator initialRouteName='tabList' screenOptions={{headerShown: false}}>
        <Tab.Screen 
            name ="tabMap" 
            component={MapStack} 
            options={{
                tabBarIcon: ({color, size}) => (
                    <Icon name="map" color={color} size={size}></Icon>
                ),
                tabBarLabel: () => null,
            }}>
        </Tab.Screen>
        <Tab.Screen 
            name ="tabList" 
            component={ListStack} 
            options={{
                tabBarIcon: ({color, size}) => (
                    <Icon name="restaurant" color={color} size={size}></Icon>
                ),
                tabBarLabel: () => null,
            }}>
        </Tab.Screen>
        <Tab.Screen 
            name="tabReservation" 
            component={ReservationStack} 
            options={{
                tabBarIcon: ({color, size}) => (
                    <Icon name="schedule" color={color} size={size}></Icon>
                ),
                tabBarLabel: () => null,
            }}/>
      </Tab.Navigator>
    );
};
  
const ReservationTab = () => {
    return (
      <Tab.Navigator initialRouteName='tabReservation' screenOptions={{headerShown: false}}>
        <Tab.Screen 
            name ="tabMap" 
            component={MapStack} 
            options={{
                tabBarIcon: ({color, size}) => (
                    <Icon name="map" color={color} size={size}></Icon>
                ),
                tabBarLabel: () => null,
            }}>
        </Tab.Screen>
        <Tab.Screen 
            name ="tabList" 
            component={ListStack} 
            options={{
                tabBarIcon: ({color, size}) => (
                    <Icon name="restaurant" color={color} size={size}></Icon>
                ),
                tabBarLabel: () => null,
            }}>
        </Tab.Screen>
        <Tab.Screen 
            name="tabReservation" 
            component={ReservationStack} 
            options={{
                tabBarIcon: ({color, size}) => (
                    <Icon name="schedule" color={color} size={size}></Icon>
                ),
                tabBarLabel: () => null,
            }}/>
      </Tab.Navigator>
    );
};

export { MapTab, ListTab, ReservationTab };