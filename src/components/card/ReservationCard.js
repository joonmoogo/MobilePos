import React, { useEffect,useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { getStoreById } from '../../utils/storeHandler';
import { getData } from '../../utils/asyncStorageService';

const ReservationCard = props => {
  function convertToStandardTime(dateString) {
    const date = new Date(dateString);
  
    // 날짜 객체에서 필요한 정보를 추출
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // 표준 시간 형식으로 변환
    const standardTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return standardTime; 
  }

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
        <TouchableOpacity
            style={styles.button} 
            onPress={props.onCancel}>
            <Text style={styles.buttonText}>예약 취소</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>{props.orderCode=="RESERVATION"?"예약 중":"예약 대기 중"}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>{convertToStandardTime(props.time)}</Text>
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
    height:150
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize:15
  },
  button: {
    backgroundColor: '#1c8adb',
    padding: 10,
    borderRadius: 5,
    marginLeft:50,
    height: 40
  },
  buttonText: {
    color: 'white'
  },
});

export default ReservationCard;
