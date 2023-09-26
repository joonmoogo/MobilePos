import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';

const CouponCard = props => {
  return (
    <Card wrapperStyle={styles.card}>
      <View style={styles.profile}>
        <View style={{flexDirection: 'row'}}>
          <Card.Title style={{fontSize:30, color: 'red'}}>{props.title}</Card.Title>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>{props.text}</Text>
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
    height: 130
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 25,
    color: 'red'
  },
});

export default CouponCard;