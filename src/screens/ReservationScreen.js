import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const ReservationScreen = () => {
    return (
        <View style={styles.container}>
          <Text style={styles.text}>예약 중</Text>
        </View>
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