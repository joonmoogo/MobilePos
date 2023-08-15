import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'expo-checkbox';
import {useForm, Controller} from 'react-hook-form';
import StoreCard from '../components/StoreCard';
import goodRestaurants from '../assets/goodrestaurants.json';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';

const AllMenuComponent = ({navigation}) => {
  const [isChecked, setChecked] = useState(false);
  const [DropdownOpen, setDropdownOpen] = useState(false);
  const [DropdownLabel, setDropdownLabel] = useState([
    { label: "거리순", value: "distance" },
    { label: "별점순", value: "star" },
    { label: "리뷰 많은 순", value: "review" },
  ]);
  const { control } = useForm();

  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedStores = goodRestaurants.map(item => ({ title: item.BIZEST_NM }));
        setStores(updatedStores);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const storeList = stores.slice(0, 20).map((store, index) => (
    <StoreCard key={index} title={store.title} />
  ));
  
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isLocationFetched, setIsLocationFetched] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    if (!isLocationFetched) { // 추가: 현재 위치가 가져와지지 않았을 때만 실행
      getCurrentLocation();
    }
  }, [isLocationFetched]); 

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        console.log('Current Location:', latitude, longitude);

        getCurrentAddress(latitude, longitude).then((address) => {
          setCurrentAddress(address);
          setIsLocationFetched(true);
          setIsLoadingLocation(false);
        });
      },
      error => {
        console.log(error.message);
        setIsLocationFetched(true);
        setIsLoadingLocation(false);
      }
    );
  };
  
  const getCurrentAddress = async (latitude, longitude) => {
      const API_KEY = "14d118e34461f75776da95a77eea8c74";
      const apiUrl = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`;
  
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `KakaoAK ${API_KEY}`,
          },
        });

        console.log('API 응답:', response.data);
  
        if (response?.data?.documents && response.data.documents.length > 0) {
          const addressData = response.data.documents[0].address;
          const region1 = addressData.region_1depth_name; 
          const region2 = addressData.region_2depth_name; 
          const region3 = addressData.region_3depth_name;
          return `${region1} ${region2} ${region3}`;
        } else {
          return '주소를 찾을 수 없습니다.';
        }
      } catch (error) {
        console.log('API 요청 에러:', error);
        return '주소를 찾을 수 없습니다.';
      }
    };

  const handleIconPress = () => {
    getCurrentLocation();
  };

  return (
    <View>
      <View>
        <View style={{flexDirection: 'row', margin:15}}>
        <TouchableOpacity onPress={handleIconPress}>
          <Icon style={{ color: 'grey'}} name="room" size={25} />
        </TouchableOpacity>
        {isLoadingLocation ? ( // Display loading message while fetching location
            <Text style={{ color: 'grey', fontSize: 20 }}>위치 검색 중입니다...</Text>
          ) : (
            <Text style={{ color: 'grey', fontSize: 20 }}>{currentAddress}</Text>
          )}
        </View>

        <View style={{flexDirection: 'row'}}>
            <Controller
            name="dropdown"
            defaultValue="distance"
            control={control}
            render={({ field: { onChange, value } }) => (
                <View style={styles.dropdownFrame}>
                    <DropDownPicker
                      style={styles.dropdown}
                      open={DropdownOpen}
                      value={value} 
                      items={DropdownLabel}
                      setOpen={setDropdownOpen}
                      setValue={onChange}
                      setItems={setDropdownLabel} />
                  </View>
                )} />
            <Text style={{flexDirection: 'row', margin:10}}>
                <CheckBox value={isChecked} onValueChange={setChecked} />
                <Text style={{color: 'grey'}}>  찜한 가게만 보기</Text>
            </Text>
        </View>

        <ScrollView>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("stackDetail")}>
                <Text style={styles.storebox}>한스델리 안성점{"\n"}</Text>
              </TouchableOpacity>
            </View>
            {storeList}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    dropdown: {
      borderColor: "#B7B7B7",
      height: 30,
    },
    dropdownFrame: {
      marginHorizontal: 10,
      width: "55%",
      marginBottom: 25,
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
    }
  });
  
export default AllMenuComponent;