import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity, TextInput, Dimensions, ImageBackground } from 'react-native';
import { apiUrl, clientApiUrl } from '../config';
import { WebView } from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import * as geolib from 'geolib';
import goodRestaurantsData from '../assets/goodrestaurants.json';
import { getData, removeData, storeData } from '../utils/asyncStorageService';
import { getStoreByCoordinate } from '../utils/storeHandler';
import { Image} from '@rneui/themed';
import { getOrderByStoreId } from '../utils/orderHandler';
import { useIsFocused } from '@react-navigation/native';
import { getReviewsByStoreId } from '../utils/reviewHandler';
import { Rating } from 'react-native-elements';



const MapScreen = ({ navigation }) => {
  const [isInfoVisible, setInfoVisible] = useState(false);
  const infoAnimation = useState(new Animated.Value(0))[0];
  const [currentLocation, setCurrentLocation] = useState(null);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [selectedMarkerData, setSelectedMarkerData] = useState(null);
  const [token, setToken] = useState();
  const webViewRef = useRef(null);
  const [newgoodRestaurantsData, setNewGoodRestaurantsData] = useState([]); // 초기 상태는 빈 배열
  const [storeStatus,setStoreStatus] = useState();
  const [totalRating,setTotalRating] = useState();
  const isFocused = useIsFocused();

  const handleMarkerClick = (markerData) => {
    if (markerData) {
      setSelectedMarkerData(markerData);
      getOrderByStoreId(markerData.id,token).then((data)=>{
        setStoreStatus(data.length);
      })
      let total = 0;
      if(markerData?.review.length!==0){
        markerData.review.map((e,i)=>{
          total += e.rating;
        })
        const average = (total/markerData.review.length);
        console.log(average);
        setTotalRating(average);
      }
      else{
        setTotalRating(0);
      }
      setInfoVisible(true);
      Animated.timing(infoAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const closeInfo = () => {
    Animated.timing(infoAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setInfoVisible(false);
      setSelectedMarkerData(null);
      setTotalRating(0);
    });
  };

  useEffect(() => {
    if (selectedMarkerData) {
      console.log("Selected Marker Data:", selectedMarkerData);
      
    } else {
      console.log("Selected Marker Data: null");
    }
  }, [selectedMarkerData]);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        console.log('Current Location:', latitude, longitude);
        setLatitude(latitude);
        setLongitude(longitude);
        getData('hknuToken').then((token) => {
          setToken(token);
          console.log(token);
          getStoreByCoordinate(latitude, longitude, 1000000000000, token).then((storeInfo) => {
            
            storeData('stores', storeInfo);
            
            storeInfo.map((e, i) => {
              getReviewsByStoreId(e.id,token).then((reviews)=>{
                let store;
                if(reviews){
                  store = {
                    BIZEST_NM: e.name,
                    REFINE_WGS84_LAT: e.longitude,
                    REFINE_WGS84_LOGT: e.latitude,
                    photo : e.profilePhoto,
                    id:e.id,
                    review: reviews 
                  };
                }
                else{
                  store = {
                    BIZEST_NM: e.name,
                    REFINE_WGS84_LAT: e.longitude,
                    REFINE_WGS84_LOGT: e.latitude,
                    photo : e.profilePhoto,
                    id:e.id,
                    review: [] 
                  };
                }
                
                              
              console.log(store);
              setNewGoodRestaurantsData((prevData) => [...prevData, store]);
              })
            });
          }).catch((error)=>{return error})
        });
      },
      error => {
        console.log(error.message);
      },
    );
  };

  const syncLocation = () => {
    console.log(navigation);
    getCurrentLocation();
    if (webViewRef.current && currentLocation) {
      webViewRef.current.injectJavaScript(`
        var latitude = ${currentLocation.latitude};
        var longitude = ${currentLocation.longitude};
        var mapCenter = new kakao.maps.LatLng(latitude, longitude);
        map.setCenter(mapCenter);
        map.setLevel(3);
        marker.setPosition(mapCenter);
      `);
    }
  };

  useEffect(() => {
    if(isFocused){
      getCurrentLocation();
    }
    
  }, [isFocused]);

  const infoTranslateY = infoAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [250, 0],
  });

  const handleWebViewMessage = (event) => {
    const message = event.nativeEvent.data;
    console.log(message);
    if (message === 'markerClicked') {
      handleMarkerClick();
    } else {
      const parsedMarkerData = JSON.parse(message);
      setSelectedMarkerData(parsedMarkerData);
      handleMarkerClick(parsedMarkerData);
    }
  };

  const calculateDistance = () => {
    if (currentLocation && currentLocation.latitude && currentLocation.longitude && selectedMarkerData) {
      const distance = geolib.getDistance(
        { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
        { latitude: selectedMarkerData.REFINE_WGS84_LAT, longitude: selectedMarkerData.REFINE_WGS84_LOGT }
      );

      if (distance >= 1000) {
        const kmDistance = (distance / 1000).toFixed(1);
        return `${kmDistance} km`;
      } else {
        return `${distance} m`;
      }
    }
    return null;
  };



  // JSON 데이터를 문자열로 변환
  const jsonDataString = JSON.stringify(newgoodRestaurantsData);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta charset="utf-8">
        <style>
          #map {
            width: 100%;
            height: 100vh;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=f100b132c7c96aa31427b9bd72068ff0&libraries=services"></script>
        <script>
          var mapContainer = document.getElementById('map');
          var mapOptions = {
            center: new kakao.maps.LatLng(${currentLocation?.latitude || 33.450701}, ${currentLocation?.longitude || 126.570667}),
            level: 3
          };

          var map = new kakao.maps.Map(mapContainer, mapOptions);

          var imageSrc = 'https://www.localguidesconnect.com/t5/image/serverpage/image-id/165436i36DCE8AF5DF64A5A/image-size/large?v=v2&px=999';
          var imageSize = new kakao.maps.Size(30, 30);

          var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
          var markerPosition = new kakao.maps.LatLng(37.54699, 127.09598);

          var marker = new kakao.maps.Marker({
            position: mapOptions.center,
            image: markerImage
          });

          var anothermarkers = [];

          var data = ${jsonDataString};

          for (var i = 0; i < data.length; i++) {
            (function () {
              var position = data[i];
              var anothermarker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(position.REFINE_WGS84_LAT, position.REFINE_WGS84_LOGT),
              });

              var markerData = data[i];
              kakao.maps.event.addListener(anothermarker, 'click', function() {
                window.ReactNativeWebView.postMessage(JSON.stringify(markerData));
              });

              anothermarkers.push(anothermarker);
            })();
          }

          for (var j = 0; j < anothermarkers.length; j++) {
            anothermarkers[j].setMap(map);
          }

          marker.setMap(map);         

          kakao.maps.event.addListener(mainmarker, 'click', function() {
            window.ReactNativeWebView.postMessage('markerClicked');
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <View style={styles.inputcontainer}>
        <TextInput style={styles.input} placeholder='Search' onChange={(event) => {
          console.log(event.target);
        }}></TextInput>
      </View>

      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        style={styles.webview}
        onMessage={handleWebViewMessage}
      />
      <View style={styles.syncButtonContainer}>
        <TouchableOpacity style={styles.syncButton} onPress={syncLocation}>
          <MaterialIcons name="my-location" size={25} color="white" />
        </TouchableOpacity>
      </View>
      
      <Animated.View
        style={[ styles.infoContainer, { transform: [{ translateY: infoTranslateY }], flex: 1 ,} ]}>
        <View style={{flexDirection: "row", marginBottom:10}}>
          
          <TouchableOpacity style={{position:'absolute'}} onPress={closeInfo}><MaterialIcons name="cancel" size={20} /></TouchableOpacity>
        </View>
       
        {selectedMarkerData && (
          
          <View style={{flexDirection:"row",left:55,}}>
            
            <View>
            <TouchableOpacity onPress={()=>{
                  storeData('clickedStore', selectedMarkerData.id).then(() => {
                    console.log(selectedMarkerData.id);
                  navigation.navigate('stackDetail');
                });}}>
              <Image style={{height:90,width:'100%',}} source={{ uri: `${clientApiUrl}/serverImage/${selectedMarkerData.photo}` }}></Image>
              <View style={{ alignItems: "center"}}>
                <Text  style={{fontSize: 25,color:'black',fontWeight:'bold' }} numberOfLines={1} ellipsizeMode="tail">{selectedMarkerData.BIZEST_NM}</Text>
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Text style={{fontSize: 15}}>{totalRating}</Text>
                    <View style={{flexDirection: 'row'}}>
                    <Rating  readonly imageSize={20} startingValue={totalRating}/>
                    </View>
                  </View>
                  
              </View>
              </TouchableOpacity>
              <View style={{flexDirection: "row",  alignItems: "center", alignSelf: "center"}}>
                <Text style={{fontWeight:"bold", fontSize:15, marginLeft:15, marginRight:25}} numberOfLines={1}>현재 위치에서 {calculateDistance()}에 있음</Text>
                
              </View>
              <View style={{flexDirection: "row",  alignItems: "center", alignSelf: "center"}}>
                <View style={{alignItems: "center", marginRight:10}}>
                  <MaterialIcons color='skyblue' name="alarm" size={30} ></MaterialIcons>
                  <Text>예약 가능</Text>
                </View>
                <View style={{alignItems: "center", marginRight:10}}>
                  <MaterialIcons color='gold' name="sentiment-satisfied-alt" size={30}></MaterialIcons>
                  <Text>{totalRating>0?totalRating>4?"요즘인기":"성장 중":"신규개업"} </Text>
                </View>

                <View style={{alignItems: "center", marginRight:10}}>
                  <MaterialIcons color={storeStatus&&storeStatus>10?"orange":"green"} name="people" size={30}></MaterialIcons>
                  <Text>{storeStatus&&storeStatus>10?"주문 많음":"한적함"}</Text>
                </View>
                {/* {storeStatus?<View style={{alignItems: "center", marginRight:10}}>
                  <MaterialIcons color={storeStatus&&storeStatus>10?"orange":"green"} name="bulb" size={30}></MaterialIcons>
                  <Text>{storeStatus?"영업 중":null}</Text>
                </View>:null}
                 */}
              </View>
            </View>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  webview: {
    flex: 1,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
    backgroundColor: 'white',
    padding: 15
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 80,
    backgroundColor:"lightgrey",
    margin: 10
  },
  syncButtonContainer: {
    position: 'absolute',
    top: 85,
    right: 20,
  },
  syncButton: {
    backgroundColor: 'deepskyblue',
    borderRadius: 25,
    padding: 10,
  },
});

export default MapScreen;