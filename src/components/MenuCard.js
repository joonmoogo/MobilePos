import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {PricingCard} from 'react-native-elements';
import {Text, Card, Button, Icon} from '@rneui/themed';
const MenuCard = props => {
  return (
    <Card wrapperStyle={styles.card}>
      <View style={styles.container}>
        <Card.Title>{props.title}</Card.Title>
        <View>
          <Text style={styles.text}>{props.text}</Text>
        </View>
      </View>
      <Card.Image
        style={styles.image}
        source={{
          uri: 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
        }}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 100,
    width: 100,
  },
  card: {
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
  },
});
export default MenuCard;
