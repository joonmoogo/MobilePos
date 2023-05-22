import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import WebView from 'react-native-webview';

const MapScreen = () => {
  const htmlContent = `
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
          // 카카오맵 API 사용 코드
          // ...

          // 예시: 지도 생성 및 마커 표시
          var mapContainer = document.getElementById('map');
          var mapOptions = {
            center: new kakao.maps.LatLng(37.5665, 126.9780),
            level: 3
          };

          var map = new kakao.maps.Map(mapContainer, mapOptions);
          
          var markerPosition = new kakao.maps.LatLng(37.5665, 126.9780);
          var marker = new kakao.maps.Marker({
            position: markerPosition
          });

          marker.setMap(map);
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: htmlContent }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default MapScreen;