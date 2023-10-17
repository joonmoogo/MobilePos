import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Text, Card } from '@rneui/themed';
import { clientApiUrl } from '../../config';

const OrderMenuCard = ({ title, text, count, increaseCount, decreaseCount, menu }) => {
  return (
    <Card wrapperStyle={styles.card}>
      <View style={styles.container}>
        <Card.Title>{title}</Card.Title>
        <View>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button title="-" onPress={decreaseCount} />
          <Text style={{ alignSelf: "center" }}>   {count}   </Text>
          <Button title="+" onPress={increaseCount} />
        </View>
      </View>
      <Card.Image
        style={styles.image}
        source={{
          uri: `${clientApiUrl}/serverImage/${menu.photo}`,
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

export default OrderMenuCard;