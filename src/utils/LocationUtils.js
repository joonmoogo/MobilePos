import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';

// 가게 리스트 페이지에서 현재 위치를 찾기 위한 모듈
const useLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isLocationFetched, setIsLocationFetched] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    if (!isLocationFetched) {
      getCurrentLocation();
    }
  }, [isLocationFetched]);

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });

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

  return {
    currentLocation,
    currentAddress,
    isLoadingLocation,
    getCurrentLocation,
  };
};

export default useLocation;