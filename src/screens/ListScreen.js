import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import AllMenuComponent from '../components/AllMenuComponent';
import KoreanMenuComponent from '../components/KoreanMenuComponent';
import ChineseMenuComponent from '../components/ChineseMenuComponent';
import JapaneseMenuComponent from '../components/JapaneseMenuComponent';
import WesternMenuComponent from '../components/WesternMenuComponent';
import AsianMenuComponent from '../components/AsianMenuComponent';
import SnackMenuComponent from '../components/SnackMenuComponent';
import OneMenuComponent from '../components/OneMenuComponent';
import SearchScreen from '../screens/SearchScreen';

const ListScreen = ({ navigation }) => {
  const [selectedMenu, setSelectedMenu] = useState('all');

  const handleMenuPress = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          placeholder='Search'
          placeholderTextColor='grey'
          onFocus={() => navigation.navigate('stackSearch')}
        />
      </View>

      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={selectedMenu === 'all' ? styles.selectedMenu : styles.menu}
          onPress={() => handleMenuPress('all')}>
          <Text style={selectedMenu === 'all' ? styles.selectedMenuText : styles.menuText}>전체</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedMenu === 'korean' ? styles.selectedMenu : styles.menu}
          onPress={() => handleMenuPress('korean')}>
          <Text style={selectedMenu === 'korean' ? styles.selectedMenuText : styles.menuText}>한식</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedMenu === 'chinese' ? styles.selectedMenu : styles.menu}
          onPress={() => handleMenuPress('chinese')}>
          <Text style={selectedMenu === 'chinese' ? styles.selectedMenuText : styles.menuText}>중식</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedMenu === 'japanese' ? styles.selectedMenu : styles.menu}
          onPress={() => handleMenuPress('japanese')}>
          <Text style={selectedMenu === 'japanese' ? styles.selectedMenuText : styles.menuText}>일식 돈가스</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedMenu === 'western' ? styles.selectedMenu : styles.menu}
          onPress={() => handleMenuPress('western')}>
          <Text style={selectedMenu === 'western' ? styles.selectedMenuText : styles.menuText}>양식</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedMenu === 'asian' ? styles.selectedMenu : styles.menu}
          onPress={() => handleMenuPress('asian')}>
          <Text style={selectedMenu === 'asian' ? styles.selectedMenuText : styles.menuText}>동남아</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedMenu === 'snack' ? styles.selectedMenu : styles.menu}
          onPress={() => handleMenuPress('snack')}>
          <Text style={selectedMenu === 'snack' ? styles.selectedMenuText : styles.menuText}>분식</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedMenu === 'one' ? styles.selectedMenu : styles.menu}
          onPress={() => handleMenuPress('one')}>
          <Text style={selectedMenu === 'one' ? styles.selectedMenuText : styles.menuText}>혼밥</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>

      <View>
        {selectedMenu === 'all' && (<AllMenuComponent navigation={navigation} />)}
        {selectedMenu === 'korean' && (<KoreanMenuComponent navigation={navigation} />)}
        {selectedMenu === 'chinese' && (<ChineseMenuComponent navigation={navigation} />)}
        {selectedMenu === 'japanese' && (<JapaneseMenuComponent navigation={navigation} />)}
        {selectedMenu === 'western' && (<WesternMenuComponent navigation={navigation} />)}
        {selectedMenu === 'asian' && (<AsianMenuComponent navigation={navigation} />)}
        {selectedMenu === 'snack' && (<SnackMenuComponent navigation={navigation} />)}
        {selectedMenu === 'one' && (<OneMenuComponent navigation={navigation} />)}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 30,
    color: 'black'
  },
  inputcontainer: {
    backgroundColor: 'deepskyblue',
    width: Dimensions.get('window').width, 
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '95%',
    height: 35,
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    fontSize: 15,
  },
  menu: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'deepskyblue'
  },
  selectedMenu: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  selectedMenuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey'
  },
  placeholderStyles: {
    color: "grey",
  },
});

export default ListScreen;