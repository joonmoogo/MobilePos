import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import ReservationCard from '../components/ReservationCard';
import ReservationedCard from '../components/ReservationedCard';

const ReservationScreen = () => {
    const [reservations, setReservations] = useState([
      {
        title: '한스델리 안성점',
        time: '2023-08-03 / 13:00 / 4명 / 5T',
        menu: '돈가스 2 / 파스타 2 / 소주 1 / 결제 완료'
      },
      {
        title: '홍익돈가스 안성점',
        time: '2023-08-05 / 18:00 / 4명 / 4T',
        menu: '돈가스 1 / 파스타 2 / 소주 1 '
      },
    ]);

    const [reservationeds, setReservationeds] = useState([
      {
        title: '한스델리 안성점',
        time: '2023-08-03 / 13:00 / 4명 / 5T',
        menu: '돈가스 2 / 파스타 2 / 소주 1 / 결제 완료'
      },
      {
        title: '홍익돈가스 안성점',
        time: '2023-08-05 / 18:00 / 4명 / 4T',
        menu: '돈가스 1 / 파스타 2 / 소주 1 '
      },
    ]);

    const ReservationList = reservations.map(reservation => (
      <ReservationCard key={reservation.title} title={reservation.title} time={reservation.time} menu={reservation.menu}></ReservationCard>
    ));

    const ReservationedList = reservationeds.map(reservation => (
      <ReservationedCard key={reservation.title} title={reservation.title} time={reservation.time} menu={reservation.menu}></ReservationedCard>
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
    )
}

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