import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import ReservationCard from '../components/card/ReservationCard';
import ReservationedCard from '../components/card/ReservationedCard';
import { getData } from '../utils/asyncStorageService';
import { getOrder, getReservations } from '../utils/orderHandler';
import { useIsFocused } from '@react-navigation/native';
import { getReviews } from '../utils/reviewHandler';

const ReservationScreen = () => {
  const [reservations, setReservations] = useState([]);
  const [reservationeds, setReservationeds] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    
    async function fetchData() {
      const token = await getData('hknuToken');
      const data = await getReservations(token); 
      const data2 = await getOrder(token);
      const data3 = await getReviews(token);
      setReservations(data);
      setReservationeds(data2);
      console.log(data3);
    }
    if(isFocused){
    fetchData()
    .catch((error)=>{
      return error;
    })
    }
  }, [isFocused]);

  const cancelReservation = (title) => {
    // reservations에서 해당 예약을 찾아서 삭제
    const updatedReservations = reservations.filter(
      (reservation) => reservation.title !== title
    );

    // 삭제한 예약을 reservationeds에 추가하고 menu 내용 업데이트
    const canceledReservation = reservations.find(
      (reservation) => reservation.title === title
    );

    if (canceledReservation) {
      canceledReservation.menu = '돈가스 2 / 파스타 2 / 치킨 1 / 예약 취소됨'; // menu 내용 업데이트
      setReservations(updatedReservations);
      setReservationeds([...reservationeds, canceledReservation]);
    }
  };

  const ReservationList = reservations.map((reservation,i) => (
    <ReservationCard
      key={i}
      title={reservation.storeId}
      time={reservation.reservationTime}
      orderCode={reservation.orderCode}
      menu={reservation.menu}
      onCancel={() => cancelReservation(reservation.title)} // 예약 취소 버튼 클릭 시 호출
    ></ReservationCard>
  ));

  const ReservationedList = reservationeds.map((reservation,i) => (
    <ReservationedCard
      key={i}
      title={reservation.storeId}
      // time={reservation.orderCode}
      orderCode={reservation.orderCode}
      menu={reservation.menu}
    ></ReservationedCard>
  ));

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.text}>예약 리스트</Text>
        {ReservationList}
      </View>

      <View>
        <Text style={styles.text}>예약 했던 가게</Text>
        {ReservationedList}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
  },
  text: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 30,
    color: 'black',
  },
});

export default ReservationScreen;
