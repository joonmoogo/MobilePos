import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { getData } from '../../utils/asyncStorageService';
import { getStoreById } from '../../utils/storeHandler';
import ReviewForm from '../../screens/ReviewFormScreen';
import { useNavigation } from '@react-navigation/native';


const ReservationedCard = props => {
  const navigation = useNavigation();
  const [storeName,setStoreName] = useState();

  useEffect(() => {
    const fetchStoreName = async () => {
      try {
        const token = await getData('hknuToken');
        const data = await getStoreById(props.title, token);
        console.log(data);
        setStoreName(data.name);
      } catch (error) {
        console.error('Error fetching store name:', error);
      }
      
    };
  
    fetchStoreName();
  }, []);
  return (
    <>
    <Card wrapperStyle={styles.card}>
      <View style={styles.profile}>
        <View style={{flexDirection: 'row'}}>
          <Card.Title style={{fontSize:20}}>{storeName}</Card.Title>
        </View>
        {props.orderCode==='PAYMENT'?<TouchableOpacity
            style={styles.button} 
            onPress={()=>{
              navigation.navigate('stackReservationReview',{props:props.title});
            }}>
            <Text style={styles.buttonText}>리뷰 쓰기</Text>
          </TouchableOpacity>:null}
                
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>{props.orderCode==='ORDER'?"주문중":"결제완료"}</Text>
      </View>
      

      
    </Card>
    </>
  );
};

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'column',
    
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize:15
  },
  button: {
    backgroundColor: 'teal',
    padding: 10,
    borderRadius: 5,
    marginLeft:50,
    height: 40
  },
  buttonText: {
    color: 'white',
  },
});


export default ReservationedCard;
