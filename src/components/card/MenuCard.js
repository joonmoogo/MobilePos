import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Card } from '@rneui/themed';
import { clientApiUrl } from '../../config';

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
          uri: `${clientApiUrl }/serverImage/${props.photo}`,
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
