import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {PricingCard, Rating} from 'react-native-elements';
import {Text, Card, Button, Icon} from '@rneui/themed';
const ReviewCard = props => {
  return (
    <Card wrapperStyle={styles.card}>
      <View style={styles.profile}>
        <Card.Image
          style={styles.image}
          source={{
            uri: 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
          }}
        />
        <View>
          <Card.Title>{props.title}</Card.Title>
          <Rating imageSize={15} readonly startingValue={props.rating}></Rating>
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
  image: {
    borderRadius: 50,
    height: 60,
    width: 60,
  },
  card: {
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
  },
});
export default ReviewCard;
