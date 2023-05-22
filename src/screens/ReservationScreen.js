import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ReservationScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Reservation</Text>
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
    }
  });

export default ReservationScreen;