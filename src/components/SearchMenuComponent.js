import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

const SearchMenuComponent = ({navigation}) => {
  return (
    <View>
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={styles.text}>Search List</Text>
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
  
export default SearchMenuComponent;