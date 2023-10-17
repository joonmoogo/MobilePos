import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import StoreCard from '../card/StoreCard';
import goodRestaurants from '../../assets/goodrestaurants.json';
import { getStoreByCoordinate } from '../../utils/storeHandler';
import { getData, storeData } from '../../utils/asyncStorageService';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Image, Tab, TabView, Card } from '@rneui/themed';
import { apiUrl, clientApiUrl } from '../../config';
import { subscribe } from '../../utils/notificationHandler';
import { EventSourcePolyfill,EventSource } from 'event-source-polyfill';
const AllMenuComponent = ({ navigation }) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    getData('stores').then((data) => {
      setStores(data);
      console.log(data);
    });
    // getData('hknuToken').then((token)=>{
    //   const EventSource = EventSourcePolyfill;
    //   const source = new EventSource(`${apiUrl}/notifications/subscribe`,{headers:{'access_token':token},heartbeatTimeout:86400000})
    //     source.addEventListener('SERVER_CONNECT',(e)=>{
    //         console.log(e);
    //     })
    //   })
    
    
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {stores.map((e, i) => {
        return (
          <View key={e.id}>
            <TouchableOpacity
              onPress={() => {
                console.log(e.id);
                storeData('clickedStore', e.id).then(() => {
                  console.log('clickedStore was stored', e.id);
                  navigation.navigate('stackDetail');
                });
              }}
            >
              <Card>
                <Image
                  style={{ borderRadius: 10, marginLeft: 20, height: 120, width: 250 }}
                  source={{ uri: `${clientApiUrl}/serverImage/${e?.profilePhoto}` }}
                ></Image>
                <Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 20, color: 'black' }}>{e.name}</Text>
                <Text style={{ marginLeft: 20 }}>{e.address}</Text>
              </Card>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 20, // 스크롤뷰의 아래에 추가적인 여백을 주면 끝까지 스크롤됩니다.
  },
});

export default AllMenuComponent;