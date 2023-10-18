import React, { useEffect } from 'react';
import DrawerNavigator from "./navigations/Drawer";
import { NavigationContainer } from '@react-navigation/native';
import { getData } from './utils/asyncStorageService';
import { EventSource,EventSourcePolyfill } from 'event-source-polyfill';
import { apiUrl } from './config';


const App = () => {
  useEffect(()=>{
    getData('hknuToken').then((token)=>{
    let access_token = token;
    const headers = {
      'access_token' : access_token
    };
    const eventSource = new EventSourcePolyfill(`${apiUrl}/notifications/subscribe`,{headers:headers,heartbeatTimeout:86400000});
    eventSource.onmessage = (event) =>{console.log(event)};
    eventSource.onopen = (event) =>{ console.log(event) };
    eventSource.onerror = (event) =>{ console.error('로그인이 필요합니다.') };
    eventSource.addEventListener('SERVER_CONNECT',(e)=>{console.log(e)});
    eventSource.addEventListener('RESERVATION_INSERT',(e)=>{console.log(e)});
    eventSource.addEventListener('RESERVATION_UPDATE',(e)=>{console.log(e)});
    eventSource.addEventListener('RESERVATION_DELETE',(e)=>{console.log(e)});
    console.log(eventSource);
    })
  },[])
  return (
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
  );
};

export default App;