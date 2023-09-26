import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SnackMenuComponent = ({navigation}) => {
  return (
    <View>
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <Text style={styles.text}>This Is Snack Menu List</Text>
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
  
export default SnackMenuComponent;