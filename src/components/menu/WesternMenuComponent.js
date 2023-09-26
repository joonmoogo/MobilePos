import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const WesternMenuComponent = ({navigation}) => {
  return (
    <View>
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <Text style={styles.text}>This Is Western Menu List</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 30,
  },
});
  
export default WesternMenuComponent;