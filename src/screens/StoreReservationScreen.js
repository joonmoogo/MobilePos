import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const StoreReservationScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Store Reservation</Text>
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

export default StoreReservationScreen;