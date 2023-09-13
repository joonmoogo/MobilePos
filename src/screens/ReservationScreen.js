import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import ReservationCard from '../components/ReservationCard';
import ReservationedCard from '../components/ReservationedCard';

const ReservationScreen = () => {
    const [reservations, setReservations] = useState([
      {
        title: '한스델리 안성점',
        time: '2023-09-15 / 22:40 / 4명 / 5T',
        menu: '돈가스 2 / 파스타 2 / 치킨 1 / 예약 승인 대기'
      },
    ]);

    const [reservationeds, setReservationeds] = useState([
    ]);

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

    const ReservationList = reservations.map((reservation) => (
      <ReservationCard
        key={reservation.title}
        title={reservation.title}
        time={reservation.time}
        menu={reservation.menu}
        onCancel={() => cancelReservation(reservation.title)} // 예약 취소 버튼 클릭 시 호출
      ></ReservationCard>
    ));
  
    const ReservationedList = reservationeds.map((reservation) => (
      <ReservationedCard
        key={reservation.title}
        title={reservation.title}
        time={reservation.time}
        menu={reservation.menu}
      ></ReservationedCard>
    ));
  
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.text}>예약 중</Text>
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
      color: 'black'
    }
  });

export default ReservationScreen;