import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Dimensions } from 'react-native';
import ReservationDetail from '../components/ReservationDetail';

const StoreReservationScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={{width: Dimensions.get('window').width, flexDirection: 'row', alignSelf: 'flex-start', borderBottomWidth: 1, borderBottomColor: 'lightgray',}}>
                <TouchableOpacity style={styles.profileImage}></TouchableOpacity>
                <Text style={{alignSelf:'center', fontSize:25}}>한스델리 안성점</Text>
            </View>
            <ReservationDetail />
            <View>
              <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('stackPin')}>
                <Text style={{alignSelf: 'center', color: 'white', fontSize: 25}}>예약 신청 완료</Text>
              </TouchableOpacity>
            </View>
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