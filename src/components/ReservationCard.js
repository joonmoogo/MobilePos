import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';

const ReservationCard = props => {
  return (
    <Card wrapperStyle={styles.card}>
      <View style={styles.profile}>
        <View style={{flexDirection: 'row'}}>
          <Card.Title style={{fontSize:30}}>{props.title}</Card.Title>
          <TouchableOpacity
            style={styles.button} 
            onPress={() => {
              console.log('예약 취소 버튼 클릭됨');
            }}>
            <Text style={styles.buttonText}>예약 취소</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>{props.time}</Text>
        <Text style={styles.text}>{props.menu}</Text>
      </View>
    </Card>
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
    marginLeft: 50,
    height: 40
  },
  buttonText: {
    color: 'white'
  },
});

export default ReservationCard;
