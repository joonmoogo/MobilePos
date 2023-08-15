import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import * as geolib from 'geolib';
import goodRestaurantsData from '../assets/goodrestaurants.json';

const MapScreen = ({ navigation }) => {
  const [isInfoVisible, setInfoVisible] = useState(false);
  const infoAnimation = useState(new Animated.Value(0))[0];
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedMarkerData, setSelectedMarkerData] = useState(null);
  const webViewRef = useRef(null);

  const handleMarkerClick = (markerData) => {
    if (markerData) {
      setSelectedMarkerData(markerData);
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
    });
  };

  useEffect(() => {
    if (selectedMarkerData) {
      console.log("Selected Marker Data:", selectedMarkerData);
    } else {
      console.log("Selected Marker Data: null");
    }
  }, [selectedMarkerData]);

  const infoTranslateY = infoAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [250, 0],
  });

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        console.log('Current Location:', latitude, longitude);
      },
      error => {
        console.log(error.message);
      }
    );
  };

  const syncLocation = () => {
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
    getCurrentLocation();
  }, []);

  const handleWebViewMessage = (event) => {
    const message = event.nativeEvent.data;
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

  const randomRating = (Math.random() * 5).toFixed(1);

  const exampleMarkerData= {
    BIZEST_NM: '한스델리 안성점',
    REFINE_WGS84_LAT: 37.0113,
    REFINE_WGS84_LOGT: 127.2650
  };

  const newgoodRestaurantsData = goodRestaurantsData.concat(exampleMarkerData);

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
          mainmarker.setMap(map);

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
        <TextInput style={styles.input} placeholder='Search'></TextInput>
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
        style={[ styles.infoContainer, { transform: [{ translateY: infoTranslateY }], flex: 1 } ]}>
        <View style={{flexDirection: "row", marginBottom:10}}>
          <Text style={{marginRight: 320}}>Location</Text>
          <TouchableOpacity onPress={closeInfo}><MaterialIcons name="cancel" size={20} /></TouchableOpacity>
        </View>
        {selectedMarkerData && (
          <View style={{flexDirection:"row"}}>
            <View style={{alignSelf:"center"}}>
              <TouchableOpacity style={styles.profileImage}>
              </TouchableOpacity>
            </View>
            <View>
              <View style={{marginBottom:10, alignItems: "center"}}>
                <Text style={{fontSize: 25, maxWidth: 300}} numberOfLines={1} ellipsizeMode="tail">{selectedMarkerData.BIZEST_NM}</Text>
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Text style={{fontSize: 15}}>{randomRating}</Text>
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
              </View>
              <View style={{flexDirection: "row", marginBottom:10, alignItems: "center", alignSelf: "center"}}>
                <Text style={{fontWeight:"bold", fontSize:15, marginLeft:10, marginRight:20}} numberOfLines={1}>현재 위치에서 {calculateDistance()}에 있음</Text>
                <TouchableOpacity style={{backgroundColor:"red", borderRadius: 5, padding:5}}><Text style={{color:"white"}}>    3{"\n"}   min   </Text></TouchableOpacity>
              </View>
              <View style={{flexDirection: "row", marginBottom:10, alignItems: "center", alignSelf: "center"}}>
                <View style={{alignItems: "center", marginRight:10}}>
                  <MaterialIcons name="alarm" size={35}></MaterialIcons>
                  <Text>예약 가능</Text>
                </View>
                <View style={{alignItems: "center", marginRight:10}}>
                  <MaterialIcons name="sentiment-satisfied-alt" size={35}></MaterialIcons>
                  <Text>혼밥 가능</Text>
                </View>
                <View style={{alignItems: "center"}}>
                  <MaterialIcons name="people" size={35}></MaterialIcons>
                  <Text>단체 가능</Text>
                </View>
                <TouchableOpacity style={{marginLeft: 20, backgroundColor:"deepskyblue", borderRadius: 5, padding:5}} onPress={() => navigation.navigate("stackDetail")}><Text style={{color:"white"}}>  예약{"\n"}  하기  </Text></TouchableOpacity>
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
    width: 125,
    height: 125,
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