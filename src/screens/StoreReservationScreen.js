import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Dimensions,Image } from 'react-native';
import ReservationDetail from '../components/ReservationDetail';
import { getData } from '../utils/asyncStorageService';
import { getStoreById } from '../utils/storeHandler';
import { getMenus } from '../utils/menuHandler';
import { clientApiUrl } from '../config';

const StoreReservationScreen = ({navigation}) => {
  useEffect(()=>{
    
    getData('hknuToken').then((token)=>{
      getData('clickedStore').then((storeId)=>{
        console.log(storeId);
        getStoreById(storeId,token).then((data)=>{
          console.log(data);
          setStore(data);
        })
      })  
    })
  },[])

  const [store,setStore] = useState(undefined); 
    return (
        <View style={styles.container}>
            <View style={{width: Dimensions.get('window').width, flexDirection: 'row', alignSelf: 'flex-start', borderBottomWidth: 1, borderBottomColor: 'lightgray',}}>
                <Image source={{
                  uri: `${clientApiUrl}/serverImage/${store?.profilePhoto}`,
                }} style={styles.profileImage}></Image>
                <Text style={{alignSelf:'center', fontSize:25}}>{store?.name }</Text>
            </View>
            <ReservationDetail />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 30,
      color: 'black'
    },
    profileImage: {
      width: 70,
      height: 70,
      borderRadius: 80,
      backgroundColor:"lightgrey",
      margin: 30
    },
    nextButton: {
      marginTop: 20,
      marginBottom: 40,
      width: Dimensions.get('window').width - 100,
      height: 60,
      borderRadius: 10,
      fontSize: 30,
      backgroundColor: 'red',
      alignSelf: 'center',
      justifyContent:'center'
  },
  });

export default StoreReservationScreen;