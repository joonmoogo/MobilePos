import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { PricingCard, Rating } from 'react-native-elements';
import { Text, Card, Button, Icon } from '@rneui/themed';

const BookmarkCard = props => {
  return (
    <Card wrapperStyle={styles.card}>
      <View style={styles.profile}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <TouchableOpacity>
              <Card.Title style={{fontSize:30}}>{props.title}</Card.Title>
            </TouchableOpacity>
          </View>
            <TouchableOpacity
              style={styles.button} 
              onPress={() => {
                console.log('삭제 버튼 클릭됨');
              }}>
              <Text style={styles.buttonText}>삭제</Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Rating imageSize={15} readonly startingValue={props.rating}></Rating>
          <Text style={styles.text}> {props.rating}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'column',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'column',
    height: 90
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
    width: 50,
    height: 40,
    justifyContent:'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
  },
});

export default BookmarkCard;