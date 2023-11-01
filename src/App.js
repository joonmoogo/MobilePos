import React, { useEffect } from 'react';
import DrawerNavigator from "./navigations/Drawer";
import { NavigationContainer } from '@react-navigation/native';
import { getData } from './utils/asyncStorageService';
import { EventSource,EventSourcePolyfill } from 'event-source-polyfill';
// import EventSource from 'react-native-sse';
import { apiUrl } from './config';


const App = () => {
  // useEffect(()=>{
  //   getData('hknuToken').then((token)=>{
  //   let access_token = token;
  //   const headers = {
  //     'access_token' : access_token
  //   };
  //   const eventSource = new EventSourcePolyfill(`${apiUrl}/notifications/subscribe`, { headers: headers, heartbeatTimeout: 86400000,withCredentials:true });
  //   console.log(eventSource);
  //   eventSource.addEventListener('message',(e)=>{
  //     console.log(e);
  //     console.log('yayaya');
  //   })
  //   eventSource.addEventListener('SERVER_CONNECT', (e) => { 
  //     console.log(e);
  //     console.log('yyy');
  //    });
  // })
  // },[])
  return (
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
  );
};

export default App;