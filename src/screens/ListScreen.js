import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import useLocation from '../utils/LocationUtils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'expo-checkbox';
import AllMenuComponent from '../components/menu/AllMenuComponent';
import KoreanMenuComponent from '../components/menu/KoreanMenuComponent';
import ChineseMenuComponent from '../components/menu/ChineseMenuComponent';
import JapaneseMenuComponent from '../components/menu/JapaneseMenuComponent';
import WesternMenuComponent from '../components/menu/WesternMenuComponent';
import AsianMenuComponent from '../components/menu/AsianMenuComponent';
import SnackMenuComponent from '../components/menu/SnackMenuComponent';
import OneMenuComponent from '../components/menu/OneMenuComponent';

const ListScreen = ({ navigation }) => {
  // 메뉴 섹션 선택, 기본='전체'
  const [selectedMenu, setSelectedMenu] = useState('all');
  const handleMenuPress = (menu) => {
    setSelectedMenu(menu);
  };

  // 현재 위치 찾기, 아이콘 눌러 리프레시
  const { currentLocation, currentAddress, isLoadingLocation, getCurrentLocation } = useLocation();
  const handleIconPress = () => {
    getCurrentLocation();
  };

  // dropdown 박스
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('distance');
  const [items, setItems] = useState([
    {label: '거리 순', value: 'distance'},
    {label: '별점 순', value: 'star'},
    {label: '리뷰 많은 순', value: 'review'},
  ]);

  // 찜한 가게 체크, 기능 구현 필요함
  const [isChecked, setChecked] = useState(false);

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

      <View style={{flexDirection: 'row', margin:15}}>
        <TouchableOpacity onPress={handleIconPress}>
          <Icon style={{ color: 'grey'}} name="room" size={25} />
        </TouchableOpacity>
        {isLoadingLocation ? (
            <Text style={{ color: 'grey', fontSize: 20 }}>위치 검색 중입니다...</Text>
          ) : (
            <Text style={{ color: 'grey', fontSize: 20 }}>{currentAddress}</Text>
          )}
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.dropdownFrame}>
            <DropDownPicker
              style={styles.dropdown}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>

          <View style={styles.checkboxFrame}>
            <Text style={{flexDirection: 'row'}}>
              <CheckBox value={isChecked} onValueChange={setChecked} />
              <Text style={{color: 'grey'}}>  찜한 가게만 보기</Text>
            </Text>
          </View>
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
  dropdownFrame: {
    marginLeft: 15
  },
  dropdown: {
    width: Dimensions.get('window').width - 200,
  },
  storebox: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 28,
    height: 110,
    marginTop: 10,
    fontSize: 25,
    color: 'black',
    padding: 15,
    borderWidth: 1,
    borderColor: 'lightgrey',
    fontWeight: 'bold'
  },
  checkboxFrame: {
    margin: 15
  }
});

export default ListScreen;