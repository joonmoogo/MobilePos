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
import { useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { useIsFocused } from '@react-navigation/native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { getData } from '../utils/asyncStorageService';
import { getStoreByCoordinate } from '../utils/storeHandler';


const ListScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [stores, setStores] = useState();
  const [koreans, setKoreans] = useState();
  const [chineses, setChineses] = useState();
  const [japaneses, setJapaneses] = useState();
  const [westerns, setWesterns] = useState();
  const [distance, setDistance] = useState(10000);

  useEffect(() => {
    if (isFocused) {
  
      getData('hknuToken').then((token) => {
        Geolocation.getCurrentPosition((data) => {
          console.log(data);
          const latitude = (data.coords.latitude);
          const longitude = (data.coords.longitude);
          getStoreByCoordinate(longitude, latitude, distance, token).then((storeData) => {
            setStores(storeData);
            const koreanStores = storeData.filter((store) => store.storeCategory === 'KOREAN');
            setKoreans(koreanStores);
            const westernStores = storeData.filter((store) => store.storeCategory === 'WESTERN');
            setWesterns(westernStores);
            const japaneseStores = storeData.filter((store) => store.storeCategory === 'JAPANESE');
            setJapaneses(japaneseStores);
            const chineseStores = storeData.filter((store) => store.storeCategory === 'CHINESE');
            setChineses(chineseStores);
          }).catch((error)=>{console.log(error)})
        });
      })

    }
  }, [isFocused, distance]);

  // 메뉴 섹션 선택, 기본='전체'
  const [selectedMenu, setSelectedMenu] = useState('all');
  const handleMenuPress = (menu) => {
    setSelectedMenu(menu);
  };

  const customDistance = ['1,000', '2,000', '3,000', '4,000', '5,000', '6,000', '7,000','8,000','9,000','10,000']
  // 현재 위치 찾기, 아이콘 눌러 리프레시
  const { currentLocation, currentAddress, isLoadingLocation, getCurrentLocation } = useLocation();
  const handleIconPress = () => {
    getCurrentLocation();
  };

  // dropdown 박스
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('distance');
  const [items, setItems] = useState([
    { label: '거리 순', value: 'distance' },
    { label: '별점 순', value: 'star' },
    { label: '리뷰 많은 순', value: 'review' },
  ]);

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function removeCommasFromString(str) {
    return str.replace(/,/g, '');
  }
  // 찜한 가게 체크, 기능 구현 필요함
  const [isChecked, setChecked] = useState(false);
  const [handlePicker, setHandlerPicker] = useState(false);

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
            <Text style={selectedMenu === 'japanese' ? styles.selectedMenuText : styles.menuText}>일식</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedMenu === 'western' ? styles.selectedMenu : styles.menu}
            onPress={() => handleMenuPress('western')}>
            <Text style={selectedMenu === 'western' ? styles.selectedMenuText : styles.menuText}>양식</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedMenu === 'one' ? styles.selectedMenu : styles.menu}
            onPress={() => handleMenuPress('one')}>
            <Text style={selectedMenu === 'one' ? styles.selectedMenuText : styles.menuText}>찜한 가게</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={{ flexDirection: 'row', margin: 15 }}>
        <TouchableOpacity onPress={handleIconPress}>
          <Icon style={{ color: 'grey' }} name="room" size={25} />
        </TouchableOpacity>
        {isLoadingLocation ? (
          <Text style={{ color: 'grey', fontSize: 20 }}>위치 검색 중입니다...</Text>
        ) : (
          <Text style={{ color: 'grey', fontSize: 20 }}>{currentAddress}</Text>
        )}
      </View>

      <View style={{ flexDirection: 'row' }}>
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
          <Text style={{ flexDirection: 'row' }}>
            <View style={{ marginBottom: 20 }}>

            </View>
            <TouchableOpacity onPress={() => {
              setHandlerPicker(!handlePicker);
            }}>
              <Text style={{ color: 'grey' }}>{`${formatNumberWithCommas(distance)}m 거리 보기`}</Text>
            </TouchableOpacity>
          </Text>
        </View>

        {handlePicker ? <View style={{ ...styles.infoContainer, flexDirection: 'row', marginBottom: 10 }}>
          <ScrollPicker
            dataSource={customDistance}
            onValueChange={(data) => { setDistance(removeCommasFromString(data)) }}
            wrapperColor='#FFFFFF'
          />
        </View> : null}
      </View>

      <View>
        {selectedMenu === 'all' && (<AllMenuComponent navigation={navigation} store={stores} distance={distance} />)}
        {selectedMenu === 'korean' && (<KoreanMenuComponent navigation={navigation} store={koreans} />)}
        {selectedMenu === 'chinese' && (<ChineseMenuComponent navigation={navigation} store={chineses} />)}
        {selectedMenu === 'japanese' && (<JapaneseMenuComponent navigation={navigation} store={japaneses} />)}
        {selectedMenu === 'western' && (<WesternMenuComponent navigation={navigation} store={westerns} />)}
        {selectedMenu === 'one' && (<OneMenuComponent navigation={navigation}  />)}

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 280,
    height: 250,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 30,
    borderWidth: 1, // 테두리 두께
    borderColor: 'lightgrey', // 테두리 색상
    zIndex: 1,
  },
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