import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MapTab, ListTab, ReservationTab } from "./Tab";
import DrawerContent from "../components/DrawerContent";
import { LoginStack, SignupStack, ProfileStack } from "./Stack";
import BookmarkScreen from "../screens/BookmarkScreen";
import ReviewScreen from "../screens/ReviewScreen";
import CouponScreen from "../screens/CouponScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />} screenOptions={{ headerTitle: 'MobilePos' }}>
      <Drawer.Screen name="ListScreen" component={ListTab} />
      <Drawer.Screen name="MapScreen" component={MapTab} />
      <Drawer.Screen name="LoginScreen" component={LoginStack} />
      <Drawer.Screen name="ReservationScreen" component={ReservationTab} />
      <Drawer.Screen name="SignupScreen" component={SignupStack} />
      <Drawer.Screen name="ProfileScreen" component={ProfileStack} />
      <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
      <Drawer.Screen name="ReviewScreen" component={ReviewScreen} />
      <Drawer.Screen name="CouponScreen" component={CouponScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;