import React from 'react';
import DrawerNavigator from "./navigations/Drawer";
import { NavigationContainer } from '@react-navigation/native';
import { getData } from './utils/asyncStorageService';
import { EventSource,EventSourcePolyfill } from 'event-source-polyfill';

const App = () => {

  return (
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
  );
};

export default App;