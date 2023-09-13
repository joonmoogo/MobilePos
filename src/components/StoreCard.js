import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Card } from '@rneui/themed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const StoreCard = props => {
  const randomRating = (Math.random() * 5).toFixed(1);

  return (
    <TouchableOpacity>
      <Card wrapperStyle={styles.card}>
        <View style={styles.container}>
          <Card.Title style={styles.title}>{props.title}</Card.Title>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 20}}>{randomRating}</Text>
          <View style={{flexDirection: 'row'}}>
            {[1, 2, 3, 4, 5].map((idx) => (
              <FontAwesome
                key={idx}
                name="star"
                size={15}
                color={idx <= randomRating ? 'gold' : 'lightgray'}
                style={{ marginLeft: 5 }}
              />
            ))}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    height: 80,
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 25,
  },
});
export default StoreCard;
