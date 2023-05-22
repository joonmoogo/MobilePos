import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MapTab, ListTab, ReservationTab } from "./Tab";
import DrawerContent from "../components/DrawerContent";
import { LoginStack, SignupStack, ProfileStack } from "./Stack";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />} screenOptions={{ headerTitle: 'MobilePos' }}>
      <Drawer.Screen name="ListScreen" component={ListTab} />
      <Drawer.Screen name="MapScreen" component={MapTab} />
      <Drawer.Screen name="LoginScreen" component={LoginStack} />
      <Drawer.Screen name="SignupScreen" component={SignupStack} />
      <Drawer.Screen name="ProfileScreen" component={ProfileStack} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;