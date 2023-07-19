import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';
import * as geolib from 'geolib';

const MapScreen = ({navigation}) => {
  const [isInfoVisible, setInfoVisible] = useState(false);
  const infoAnimation = useState(new Animated.Value(0))[0];
  const [currentLocation, setCurrentLocation] = useState(null);
  const webViewRef = useRef(null);

  const handleMarkerClick = () => {
    setInfoVisible(true);
    Animated.timing(infoAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeInfo = () => {
    Animated.timing(infoAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setInfoVisible(false);
    });
  };

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
    }
  };

  const calculateDistance = () => {
    if (currentLocation && currentLocation.latitude && currentLocation.longitude) {
      const distance = geolib.getDistance(
        { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
        { latitude: 37.0113, longitude: 127.2650 }
      );
      return distance;
    }
    return null;
  };

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

        var imageSrc = 'https://www.localguidesconnect.com/t5/image/serverpage/image-id/165436i36DCE8AF5DF64A5A/image-size/large?v=v2&px=999'; // 마커이미지의 주소입니다
        var imageSize = new kakao.maps.Size(30, 30); // 마커이미지의 크기입니다

        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        var markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

        var marker = new kakao.maps.Marker({
          position: mapOptions.center,
          image: markerImage
        });

        var mainmarkerPosition = new kakao.maps.LatLng(37.0113, 127.2650);
        var mainmarker = new kakao.maps.Marker({
          position: mainmarkerPosition,
        });

        // 다른 마커를 저장할 배열
        var anothermarkers = [];

        // JSON 데이터
        var data = [
          {
            "SUM_YY": "2021",
            "QU": "하반기",
            "SIGUN_NM": "가평군",
            "BIZEST_NM": "산이좋은사람들",
            "TELNO": "031-585-8645",
            "BIZCOND_NM": "경양식",
            "MAIN_MENU_NM": "돈까스",
            "REFINE_ZIPNO": "12432",
            "REFINE_LOTNO_ADDR": "경기도 가평군 조종면 운악리 486-13번지",
            "REFINE_ROADNM_ADDR": "경기도 가평군 조종면 와곡길 3-16",
            "REFINE_WGS84_LAT": "37.86603198",
            "REFINE_WGS84_LOGT": "127.3491805"
          },
          {"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"가평군","BIZEST_NM":"산이좋은사람들","TELNO":"031-585-8645","BIZCOND_NM":"경양식","MAIN_MENU_NM":"돈까스","REFINE_ZIPNO":"12432","REFINE_LOTNO_ADDR":"경기도 가평군 조종면 운악리 486-13번지","REFINE_ROADNM_ADDR":"경기도 가평군 조종면 와곡길 3-16","REFINE_WGS84_LAT":"37.86603198","REFINE_WGS84_LOGT":"127.3491805"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"가평군","BIZEST_NM":"종점가든","TELNO":"031-584-0716","BIZCOND_NM":"한식","MAIN_MENU_NM":"잣칼국수","REFINE_ZIPNO":"12473","REFINE_LOTNO_ADDR":"경기도 가평군 설악면 가일리 249-3번지","REFINE_ROADNM_ADDR":"경기도 가평군 설악면 유명산길 76","REFINE_WGS84_LAT":"37.59531959","REFINE_WGS84_LOGT":"127.4903106"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"가평군","BIZEST_NM":"가평(서울방향)휴게소 한식당","TELNO":"031-584-1425","BIZCOND_NM":"한식","MAIN_MENU_NM":"황태해장국","REFINE_ZIPNO":"12462","REFINE_LOTNO_ADDR":"경기도 가평군 설악면 미사리 145-3번지","REFINE_ROADNM_ADDR":"경기도 가평군 설악면 미사리로 544","REFINE_WGS84_LAT":"37.70307919","REFINE_WGS84_LOGT":"127.5449912"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"가평군","BIZEST_NM":"가평(춘천방향)휴게소 한식당","TELNO":"031-584-1426","BIZCOND_NM":"한식","MAIN_MENU_NM":"황태해장국","REFINE_ZIPNO":"12462","REFINE_LOTNO_ADDR":"경기도 가평군 설악면 미사리 149-4번지","REFINE_ROADNM_ADDR":"경기도 가평군 설악면 미사리로540번길 51","REFINE_WGS84_LAT":"37.70158567","REFINE_WGS84_LOGT":"127.5464998"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"가평군","BIZEST_NM":"가평축협 한우명가","TELNO":"031-581-1592","BIZCOND_NM":"한식","MAIN_MENU_NM":"등심","REFINE_ZIPNO":"12422","REFINE_LOTNO_ADDR":"경기도 가평군 가평읍 달전리 382-1번지","REFINE_ROADNM_ADDR":"경기도 가평군 가평읍 달전로 19","REFINE_WGS84_LAT":"37.81584438","REFINE_WGS84_LOGT":"127.5161283"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"가평군","BIZEST_NM":"가평축협 한우명가(설악지점)","TELNO":"031-585-4200","BIZCOND_NM":"한식","MAIN_MENU_NM":"등심","REFINE_ZIPNO":"12465","REFINE_LOTNO_ADDR":"경기도 가평군 설악면 신천리 121-9번지","REFINE_ROADNM_ADDR":"경기도 가평군 설악면 한서로 3","REFINE_WGS84_LAT":"37.6766157","REFINE_WGS84_LOGT":"127.4941405"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"가평군","BIZEST_NM":"늘 봄","TELNO":"031-582-1441","BIZCOND_NM":"한식","MAIN_MENU_NM":"양념돼지갈비","REFINE_ZIPNO":"12413","REFINE_LOTNO_ADDR":"경기도 가평군 가평읍 읍내리 680-10번지","REFINE_ROADNM_ADDR":"경기도 가평군 가평읍 가화로 173-16","REFINE_WGS84_LAT":"37.83476351","REFINE_WGS84_LOGT":"127.5100002"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"가평군","BIZEST_NM":"두메산골식당","TELNO":"031-584-9380","BIZCOND_NM":"한식","MAIN_MENU_NM":"불고기","REFINE_ZIPNO":"12446","REFINE_LOTNO_ADDR":"경기도 가평군 상면 덕현리 402-10번지","REFINE_ROADNM_ADDR":"경기도 가평군 상면 청군로 430","REFINE_WGS84_LAT":"37.75985492","REFINE_WGS84_LOGT":"127.3955416"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"가평군","BIZEST_NM":"들풀","TELNO":"031-585-4322","BIZCOND_NM":"한식","MAIN_MENU_NM":"청국장","REFINE_ZIPNO":"12464","REFINE_LOTNO_ADDR":"경기도 가평군 설악면 창의리 420-6번지","REFINE_ROADNM_ADDR":"경기도 가평군 설악면 한서로124번길 16-12","REFINE_WGS84_LAT":"37.67105477","REFINE_WGS84_LOGT":"127.5031942"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"가평군","BIZEST_NM":"미락무교동낚지","TELNO":"031-582-7644","BIZCOND_NM":"한식","MAIN_MENU_NM":"낚지볶음","REFINE_ZIPNO":"12424","REFINE_LOTNO_ADDR":"경기도 가평군 가평읍 하색리 63-1번지","REFINE_ROADNM_ADDR":"경기도 가평군 가평읍 경춘로 2055","REFINE_WGS84_LAT":"37.8153483","REFINE_WGS84_LOGT":"127.501577"},
          {"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"고양시","BIZEST_NM":"도도해","TELNO":"031-906-8892","BIZCOND_NM":"한식","MAIN_MENU_NM":"아구찜","REFINE_ZIPNO":"10414","REFINE_LOTNO_ADDR":"경기도 고양시 일산동구 마두동 799-1번지","REFINE_ROADNM_ADDR":"경기도 고양시 일산동구 강석로 151","REFINE_WGS84_LAT":"37.65393527","REFINE_WGS84_LOGT":"126.7775432"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"고양시","BIZEST_NM":"돈풍김치삼겹살","TELNO":"031-965-8248","BIZCOND_NM":"한식","MAIN_MENU_NM":"삼겹살","REFINE_ZIPNO":"10463","REFINE_LOTNO_ADDR":"경기도 고양시 덕양구 성사동 697-3번지","REFINE_ROADNM_ADDR":"경기도 고양시 덕양구 고양대로1369번길 51","REFINE_WGS84_LAT":"37.65654875","REFINE_WGS84_LOGT":"126.8378468"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"고양시","BIZEST_NM":"동대문닭한마리·찜닭","TELNO":"031-963-5030","BIZCOND_NM":"한식","MAIN_MENU_NM":"닭한마리","REFINE_ZIPNO":"10559","REFINE_LOTNO_ADDR":"경기도 고양시 덕양구 원흥동 656-3번지","REFINE_ROADNM_ADDR":"경기도 고양시 덕양구 서삼릉길 350","REFINE_WGS84_LAT":"37.65332686","REFINE_WGS84_LOGT":"126.8773346"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"고양시","BIZEST_NM":"두리원","TELNO":"031-977-6544","BIZCOND_NM":"한식","MAIN_MENU_NM":"두부전골","REFINE_ZIPNO":"10253","REFINE_LOTNO_ADDR":"경기도 고양시 일산동구 설문동 197-6번지","REFINE_ROADNM_ADDR":"경기도 고양시 일산동구 장진천길46번길 22-11","REFINE_WGS84_LAT":"37.71195663","REFINE_WGS84_LOGT":"126.8129781"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"고양시","BIZEST_NM":"들안길","TELNO":"031-907-0977","BIZCOND_NM":"한식","MAIN_MENU_NM":"갈비찜","REFINE_ZIPNO":"10311","REFINE_LOTNO_ADDR":"경기도 고양시 일산동구 풍동 619번지","REFINE_ROADNM_ADDR":"경기도 고양시 일산동구 애니골길 108","REFINE_WGS84_LAT":"37.67554294","REFINE_WGS84_LOGT":"126.7935741"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"고양시","BIZEST_NM":"뚜띠쿠치나","TELNO":"031-938-6296","BIZCOND_NM":"한식","MAIN_MENU_NM":"스파게티","REFINE_ZIPNO":"10486","REFINE_LOTNO_ADDR":"경기도 고양시 덕양구 행신동 1058-5번지","REFINE_ROADNM_ADDR":"경기도 고양시 덕양구 서정마을2로7번길 27-7","REFINE_WGS84_LAT":"37.62194535","REFINE_WGS84_LOGT":"126.8465886"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"고양시","BIZEST_NM":"라벤하임","TELNO":"031-901-2353","BIZCOND_NM":"경양식","MAIN_MENU_NM":"이태리 경양식","REFINE_ZIPNO":"10301","REFINE_LOTNO_ADDR":"경기도 고양시 일산동구 풍동 573-9번지","REFINE_ROADNM_ADDR":"경기도 고양시 일산동구 애니골길43번길 17-1","REFINE_WGS84_LAT":"37.6712668","REFINE_WGS84_LOGT":"126.7904577"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"고양시","BIZEST_NM":"마니산산채","TELNO":"031-915-8712","BIZCOND_NM":"한식","MAIN_MENU_NM":"약초정식","REFINE_ZIPNO":"10204","REFINE_LOTNO_ADDR":"경기도 고양시 일산서구 가좌동 582번지","REFINE_ROADNM_ADDR":"경기도 고양시 일산서구 산남로 210","REFINE_WGS84_LAT":"37.69981462","REFINE_WGS84_LOGT":"126.7163209"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"고양시","BIZEST_NM":"마스터쉬림프","TELNO":"031-906-4666","BIZCOND_NM":"경양식","MAIN_MENU_NM":"이태리경양식","REFINE_ZIPNO":"10301","REFINE_LOTNO_ADDR":"경기도 고양시 일산동구 풍동 665-14번지","REFINE_ROADNM_ADDR":"경기도 고양시 일산동구 애니골길43번길 42","REFINE_WGS84_LAT":"37.67310302","REFINE_WGS84_LOGT":"126.789489"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"고양시","BIZEST_NM":"마실촌","TELNO":"031-932-6767","BIZCOND_NM":"한식","MAIN_MENU_NM":"한정식","REFINE_ZIPNO":"10301","REFINE_LOTNO_ADDR":"경기도 고양시 일산동구 풍동 562-33번지","REFINE_ROADNM_ADDR":"경기도 고양시 일산동구 애니골길 16","REFINE_WGS84_LAT":"37.66918541","REFINE_WGS84_LOGT":"126.790373"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"고양시","BIZEST_NM":"메밀꽃이피었습니다","TELNO":"031-977-5569","BIZCOND_NM":"한식","MAIN_MENU_NM":"모밀소바","REFINE_ZIPNO":"10245","REFINE_LOTNO_ADDR":"경기도 고양시 일산동구 설문동 722-60번지","REFINE_ROADNM_ADDR":"경기도 고양시 일산동구 고봉로 749","REFINE_WGS84_LAT":"37.72354197","REFINE_WGS84_LOGT":"126.7912386"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"고양시","BIZEST_NM":"108@돌삼겹","TELNO":"031-911-1108","BIZCOND_NM":"한식","MAIN_MENU_NM":"삽겹살","REFINE_ZIPNO":"10345","REFINE_LOTNO_ADDR":"경기도 고양시 일산서구 탄현동 1592-2번지","REFINE_ROADNM_ADDR":"경기도 고양시 일산서구 탄중로 246","REFINE_WGS84_LAT":"37.69307258","REFINE_WGS84_LOGT":"126.7725721"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"고양시","BIZEST_NM":"24시 동대구탕","TELNO":"031-917-6012","BIZCOND_NM":"한식","MAIN_MENU_NM":"동태탕,대구탕","REFINE_ZIPNO":"10358","REFINE_LOTNO_ADDR":"경기도 고양시 일산동구 정발산동 1210-3번지","REFINE_ROADNM_ADDR":"경기도 고양시 일산동구 일산로 408","REFINE_WGS84_LAT":"37.67118545","REFINE_WGS84_LOGT":"126.7805401"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"고양시","BIZEST_NM":"LA북창동 순두부 일산장항점","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"순두부","REFINE_ZIPNO":"10403","REFINE_LOTNO_ADDR":"경기도 고양시 일산동구 장항동 855번지","REFINE_ROADNM_ADDR":"경기도 고양시 일산동구 정발산로 38","REFINE_WGS84_LAT":"37.65664765","REFINE_WGS84_LOGT":"126.7731153"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"고양시","BIZEST_NM":"가인채(홈플러스 일산점)","TELNO":"031-906-5860","BIZCOND_NM":"뷔페식","MAIN_MENU_NM":"뷔페","REFINE_ZIPNO":"10401","REFINE_LOTNO_ADDR":"경기도 고양시 일산동구 장항동 755번지","REFINE_ROADNM_ADDR":"경기도 고양시 일산동구 중앙로1275번길 64","REFINE_WGS84_LAT":"37.65896371","REFINE_WGS84_LOGT":"126.7688244"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"고양시","BIZEST_NM":"계절밥상","TELNO":"031-961-6646","BIZCOND_NM":"뷔페식","MAIN_MENU_NM":"뷔페","REFINE_ZIPNO":"10392","REFINE_LOTNO_ADDR":"경기도 고양시 일산서구 대화동 2606번지","REFINE_ROADNM_ADDR":"경기도 고양시 일산서구 한류월드로 300","REFINE_WGS84_LAT":"37.66437612","REFINE_WGS84_LOGT":"126.7544363"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"고양시","BIZEST_NM":"계절밥상 일산점","TELNO":"031-904-7015","BIZCOND_NM":"뷔페식","MAIN_MENU_NM":"뷔페","REFINE_ZIPNO":"10403","REFINE_LOTNO_ADDR":"경기도 고양시 일산동구 장항동 849-1번지","REFINE_ROADNM_ADDR":"경기도 고양시 일산동구 중앙로 1219","REFINE_WGS84_LAT":"37.65527302","REFINE_WGS84_LOGT":"126.7751027"},
          {"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"돌담집","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"오리고기","REFINE_ZIPNO":"17606","REFINE_LOTNO_ADDR":"경기도 안성시 서운면 오촌리 47-4번지","REFINE_ROADNM_ADDR":"경기도 안성시 서운면 바우덕이로 316","REFINE_WGS84_LAT":"36.96308191","REFINE_WGS84_LOGT":"127.2775743"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"동성한우촌","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"한우생등심","REFINE_ZIPNO":"17536","REFINE_LOTNO_ADDR":"경기도 안성시 금광면 오산리 14-4번지","REFINE_ROADNM_ADDR":"경기도 안성시 금광면 금광오산로 146-31","REFINE_WGS84_LAT":"36.99138343","REFINE_WGS84_LOGT":"127.3179239"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"마로니에","TELNO":"","BIZCOND_NM":"경양식","MAIN_MENU_NM":"비후까스","REFINE_ZIPNO":"17581","REFINE_LOTNO_ADDR":"경기도 안성시 서인동 78번지","REFINE_ROADNM_ADDR":"경기도 안성시 장기로45번길 22-3","REFINE_WGS84_LAT":"37.00605637","REFINE_WGS84_LOGT":"127.2685721"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"명품관","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"한우생고기","REFINE_ZIPNO":"17557","REFINE_LOTNO_ADDR":"경기도 안성시 원곡면 반제리 168-1번지","REFINE_ROADNM_ADDR":"경기도 안성시 원곡면 원당로 283","REFINE_WGS84_LAT":"37.02654427","REFINE_WGS84_LOGT":"127.1648249"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"본초","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"한우등심","REFINE_ZIPNO":"17547","REFINE_LOTNO_ADDR":"경기도 안성시 대덕면 내리 701-4번지","REFINE_ROADNM_ADDR":"경기도 안성시 대덕면 내리7길 8","REFINE_WGS84_LAT":"36.99996687","REFINE_WGS84_LOGT":"127.2237711"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"소나무향기","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"갈비, 갈비탕","REFINE_ZIPNO":"17500","REFINE_LOTNO_ADDR":"경기도 안성시 양성면 노곡리 247-2번지","REFINE_ROADNM_ADDR":"경기도 안성시 양성면 안성맞춤대로 2184-5","REFINE_WGS84_LAT":"37.10426551","REFINE_WGS84_LOGT":"127.2549314"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"안성(하)휴게소2","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"국밥 등","REFINE_ZIPNO":"17557","REFINE_LOTNO_ADDR":"경기도 안성시 원곡면 반제리 642-6번지","REFINE_ROADNM_ADDR":"경기도 안성시 원곡면 경부고속도로 365","REFINE_WGS84_LAT":"37.01341413","REFINE_WGS84_LOGT":"127.1449762"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"안성맞춤한우촌","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"갈비","REFINE_ZIPNO":"17517","REFINE_LOTNO_ADDR":"경기도 안성시 삼죽면 미장리 82번지","REFINE_ROADNM_ADDR":"경기도 안성시 삼죽면 신미1길 126","REFINE_WGS84_LAT":"37.03666151","REFINE_WGS84_LOGT":"127.371252"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"안성면옥","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"돼지갈비,냉면","REFINE_ZIPNO":"17587","REFINE_LOTNO_ADDR":"경기도 안성시 명륜동 9번지","REFINE_ROADNM_ADDR":"경기도 안성시 남파로 206","REFINE_WGS84_LAT":"37.01483211","REFINE_WGS84_LOGT":"127.2728501"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"안성한우전문점 허브","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"한우","REFINE_ZIPNO":"17562","REFINE_LOTNO_ADDR":"경기도 안성시 공도읍 승두리 598-46번지","REFINE_ROADNM_ADDR":"경기도 안성시 공도읍 원승두길 25","REFINE_WGS84_LAT":"36.99563294","REFINE_WGS84_LOGT":"127.1547726"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"약산골","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"홍삼한우탕","REFINE_ZIPNO":"17583","REFINE_LOTNO_ADDR":"경기도 안성시 인지동 461번지","REFINE_ROADNM_ADDR":"경기도 안성시 인지1길 20","REFINE_WGS84_LAT":"37.00488191","REFINE_WGS84_LOGT":"127.2659054"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"오리사냥","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"오리구이","REFINE_ZIPNO":"17538","REFINE_LOTNO_ADDR":"경기도 안성시 금광면 장죽리 48-1번지","REFINE_ROADNM_ADDR":"경기도 안성시 금광면 배티로 598-1","REFINE_WGS84_LAT":"36.97500236","REFINE_WGS84_LOGT":"127.317789"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"옹기골추어탕","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"추어탕","REFINE_ZIPNO":"17510","REFINE_LOTNO_ADDR":"경기도 안성시 가현동 97-14번지","REFINE_ROADNM_ADDR":"경기도 안성시 진안로 1323","REFINE_WGS84_LAT":"37.00396949","REFINE_WGS84_LOGT":"127.290237"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"일죽한우타운","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"한우생등심, 한우갈비","REFINE_ZIPNO":"17527","REFINE_LOTNO_ADDR":"경기도 안성시 일죽면 신흥리 140-1번지","REFINE_ROADNM_ADDR":"경기도 안성시 일죽면 금일로 495-6","REFINE_WGS84_LAT":"37.09615577","REFINE_WGS84_LOGT":"127.4782986"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"장수촌","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"누룽지 닭백숙","REFINE_ZIPNO":"17545","REFINE_LOTNO_ADDR":"경기도 안성시 대덕면 건지리 376-5번지","REFINE_ROADNM_ADDR":"경기도 안성시 대덕면 서동대로 4770","REFINE_WGS84_LAT":"37.01401941","REFINE_WGS84_LOGT":"127.2307109"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"착한낙지","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"낙지볶음","REFINE_ZIPNO":"17595","REFINE_LOTNO_ADDR":"경기도 안성시 계동 161번지","REFINE_ROADNM_ADDR":"경기도 안성시 안성맞춤대로 805","REFINE_WGS84_LAT":"36.98600084","REFINE_WGS84_LOGT":"127.2675701"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"꼬꼬네","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"닭죽","REFINE_ZIPNO":"17562","REFINE_LOTNO_ADDR":"경기도 안성시 공도읍 만정리 425-2번지","REFINE_ROADNM_ADDR":"경기도 안성시 공도읍 고무다리길 6","REFINE_WGS84_LAT":"36.99885738","REFINE_WGS84_LOGT":"127.1692486"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"독쟁이 추어탕","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"추어탕,새우탕","REFINE_ZIPNO":"17536","REFINE_LOTNO_ADDR":"경기도 안성시 금광면 오산리 518-4번지","REFINE_ROADNM_ADDR":"경기도 안성시 금광면 배티로 729","REFINE_WGS84_LAT":"36.97713875","REFINE_WGS84_LOGT":"127.3070947"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"마당냉면갈비","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"칡냉면, 한우생등심","REFINE_ZIPNO":"17568","REFINE_LOTNO_ADDR":"경기도 안성시 당왕동 212번지","REFINE_ROADNM_ADDR":"경기도 안성시 남파로 135","REFINE_WGS84_LAT":"37.01685905","REFINE_WGS84_LOGT":"127.265014"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"보나카바","TELNO":"","BIZCOND_NM":"경양식","MAIN_MENU_NM":"스테이크, 파스타","REFINE_ZIPNO":"17585","REFINE_LOTNO_ADDR":"경기도 안성시 가사동 15-65번지","REFINE_ROADNM_ADDR":"경기도 안성시 보개원삼로 165-20","REFINE_WGS84_LAT":"37.01829862","REFINE_WGS84_LOGT":"127.2855714"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안성시","BIZEST_NM":"대림쌈밥","TELNO":"","BIZCOND_NM":"한식","MAIN_MENU_NM":"쌈밥","REFINE_ZIPNO":"17548","REFINE_LOTNO_ADDR":"경기도 안성시 공도읍 마정리 112-108번지","REFINE_ROADNM_ADDR":"경기도 안성시 공도읍 산책길 15","REFINE_WGS84_LAT":"37.01490661","REFINE_WGS84_LOGT":"127.2034425"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"노블레스","TELNO":"031-474-3737","BIZCOND_NM":"경양식","MAIN_MENU_NM":"스테이크","REFINE_ZIPNO":"13911","REFINE_LOTNO_ADDR":"경기도 안양시 만안구 안양동 1361-11번지","REFINE_ROADNM_ADDR":"경기도 안양시 만안구 예술공원로208번길 14","REFINE_WGS84_LAT":"37.41949258","REFINE_WGS84_LOGT":"126.9295665"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"농협안심한우마을","TELNO":"031-468-8282","BIZCOND_NM":"한식","MAIN_MENU_NM":"등심,안심,탕","REFINE_ZIPNO":"14039","REFINE_LOTNO_ADDR":"경기도 안양시 동안구 비산동 577번지","REFINE_ROADNM_ADDR":"경기도 안양시 동안구 안양천동로 146","REFINE_WGS84_LAT":"37.39252316","REFINE_WGS84_LOGT":"126.9413936"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"누렁소마루","TELNO":"031-464-2500","BIZCOND_NM":"한식","MAIN_MENU_NM":"갈비,해장국","REFINE_ZIPNO":"14039","REFINE_LOTNO_ADDR":"경기도 안양시 동안구 비산동 576-8번지","REFINE_ROADNM_ADDR":"경기도 안양시 동안구 경수대로 855","REFINE_WGS84_LAT":"37.39452281","REFINE_WGS84_LOGT":"126.9402626"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"더?참치","TELNO":"031-387-7558","BIZCOND_NM":"일식","MAIN_MENU_NM":"참치회","REFINE_ZIPNO":"14066","REFINE_LOTNO_ADDR":"경기도 안양시 동안구 관양동 1601-3번지","REFINE_ROADNM_ADDR":"경기도 안양시 동안구 관평로182번길 51","REFINE_WGS84_LAT":"37.39410913","REFINE_WGS84_LOGT":"126.9628148"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"더춘장","TELNO":"031-449-2134","BIZCOND_NM":"중국식","MAIN_MENU_NM":"짜장,짬뽕","REFINE_ZIPNO":"13992","REFINE_LOTNO_ADDR":"경기도 안양시 만안구 안양동 674-81번지","REFINE_ROADNM_ADDR":"경기도 안양시 만안구 장내로149번길 53","REFINE_WGS84_LAT":"37.4002242","REFINE_WGS84_LOGT":"126.9221201"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"돈도담","TELNO":"031-443-1236","BIZCOND_NM":"한식","MAIN_MENU_NM":"삼겹살,차돌박이","REFINE_ZIPNO":"14015","REFINE_LOTNO_ADDR":"경기도 안양시 만안구 박달동 604-25번지","REFINE_ROADNM_ADDR":"경기도 안양시 만안구 박달로 406","REFINE_WGS84_LAT":"37.40135807","REFINE_WGS84_LOGT":"126.8974528"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"돈통마늘보쌈","TELNO":"031-474-5382","BIZCOND_NM":"한식","MAIN_MENU_NM":"보쌈정식","REFINE_ZIPNO":"13911","REFINE_LOTNO_ADDR":"경기도 안양시 만안구 안양동 1361-5번지","REFINE_ROADNM_ADDR":"경기도 안양시 만안구 예술공원로 204-1","REFINE_WGS84_LAT":"37.41971713","REFINE_WGS84_LOGT":"126.9284479"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"뽕잎사랑샤브칼국수보쌈냉면","TELNO":"031-388-8171","BIZCOND_NM":"한식","MAIN_MENU_NM":"샤브샤브","REFINE_ZIPNO":"14066","REFINE_LOTNO_ADDR":"경기도 안양시 동안구 관양동 1606번지","REFINE_ROADNM_ADDR":"경기도 안양시 동안구 관평로170번길 33","REFINE_WGS84_LAT":"37.39291959","REFINE_WGS84_LOGT":"126.9622057"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"뽕잎사랑안양예술공원점","TELNO":"031-474-3376","BIZCOND_NM":"한식","MAIN_MENU_NM":"샤브샤브","REFINE_ZIPNO":"13911","REFINE_LOTNO_ADDR":"경기도 안양시 만안구 안양동 1327-11번지","REFINE_ROADNM_ADDR":"경기도 안양시 만안구 예술공원로154번길 4","REFINE_WGS84_LAT":"37.41863223","REFINE_WGS84_LOGT":"126.9227894"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"사계절집밥","TELNO":"031-381-8871","BIZCOND_NM":"한식","MAIN_MENU_NM":"백반류,한식뷔페","REFINE_ZIPNO":"14048","REFINE_LOTNO_ADDR":"경기도 안양시 동안구 비산동 1107번지","REFINE_ROADNM_ADDR":"경기도 안양시 동안구 시민대로 161","REFINE_WGS84_LAT":"37.39041856","REFINE_WGS84_LOGT":"126.9491192"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"사계절집밥시스템","TELNO":"031-426-8811","BIZCOND_NM":"한식","MAIN_MENU_NM":"백반류,한식뷔페","REFINE_ZIPNO":"14055","REFINE_LOTNO_ADDR":"경기도 안양시 동안구 관양동 1746-2번지","REFINE_ROADNM_ADDR":"경기도 안양시 동안구 시민대로 317","REFINE_WGS84_LAT":"37.39619133","REFINE_WGS84_LOGT":"126.9654789"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"사대부","TELNO":"031-469-5465","BIZCOND_NM":"한식","MAIN_MENU_NM":"부대찌개","REFINE_ZIPNO":"14004","REFINE_LOTNO_ADDR":"경기도 안양시 만안구 안양동 903-17번지","REFINE_ROADNM_ADDR":"경기도 안양시 만안구 박달로542번길 38","REFINE_WGS84_LAT":"37.40080303","REFINE_WGS84_LOGT":"126.9126778"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"사랑방(우한판)","TELNO":"031-421-8592","BIZCOND_NM":"한식","MAIN_MENU_NM":"돼지갈비","REFINE_ZIPNO":"14064","REFINE_LOTNO_ADDR":"경기도 안양시 동안구 평촌동 136-3번지","REFINE_ROADNM_ADDR":"경기도 안양시 동안구 흥안대로 386","REFINE_WGS84_LAT":"37.38891349","REFINE_WGS84_LOGT":"126.9737258"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"사조참치","TELNO":"031-441-9992","BIZCOND_NM":"일식","MAIN_MENU_NM":"참치회","REFINE_ZIPNO":"13992","REFINE_LOTNO_ADDR":"경기도 안양시 만안구 안양동 674-201번지","REFINE_ROADNM_ADDR":"경기도 안양시 만안구 장내로149번길 14","REFINE_WGS84_LAT":"37.39882871","REFINE_WGS84_LOGT":"126.9237027"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"사조참치","TELNO":"031-384-1117","BIZCOND_NM":"일식","MAIN_MENU_NM":"참치회","REFINE_ZIPNO":"14066","REFINE_LOTNO_ADDR":"경기도 안양시 동안구 관양동 1604-1번지","REFINE_ROADNM_ADDR":"경기도 안양시 동안구 관평로182번길 48","REFINE_WGS84_LAT":"37.39361355","REFINE_WGS84_LOGT":"126.9627586"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"산수정","TELNO":"031-466-4888","BIZCOND_NM":"한식","MAIN_MENU_NM":"아구찜,복요리","REFINE_ZIPNO":"13911","REFINE_LOTNO_ADDR":"경기도 안양시 만안구 안양동 1361-4번지","REFINE_ROADNM_ADDR":"경기도 안양시 만안구 예술공원로 204","REFINE_WGS84_LAT":"37.41968998","REFINE_WGS84_LOGT":"126.9282559"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"산채고을","TELNO":"031-386-8815","BIZCOND_NM":"한식","MAIN_MENU_NM":"한정식","REFINE_ZIPNO":"13915","REFINE_LOTNO_ADDR":"경기도 안양시 동안구 비산동 162-1번지","REFINE_ROADNM_ADDR":"경기도 안양시 동안구 평촌대로 450-1","REFINE_WGS84_LAT":"37.41049403","REFINE_WGS84_LOGT":"126.9513639"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"산해원","TELNO":"031-383-8385","BIZCOND_NM":"중식","MAIN_MENU_NM":"짜장,짬뽕","REFINE_ZIPNO":"14072","REFINE_LOTNO_ADDR":"경기도 안양시 동안구 호계동 1048-3번지","REFINE_ROADNM_ADDR":"경기도 안양시 동안구 평촌대로 217","REFINE_WGS84_LAT":"37.3905564","REFINE_WGS84_LOGT":"126.9553977"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"샤브향","TELNO":"031-422-1002","BIZCOND_NM":"한식","MAIN_MENU_NM":"샤브","REFINE_ZIPNO":"14057","REFINE_LOTNO_ADDR":"경기도 안양시 동안구 관양동 224-5번지","REFINE_ROADNM_ADDR":"경기도 안양시 동안구 시민대로 401","REFINE_WGS84_LAT":"37.3970228","REFINE_WGS84_LOGT":"126.9746148"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"샤우칭","TELNO":"031-426-7788","BIZCOND_NM":"중식","MAIN_MENU_NM":"자장면,짬뽕","REFINE_ZIPNO":"13929","REFINE_LOTNO_ADDR":"경기도 안양시 동안구 관양동 1725-4번지","REFINE_ROADNM_ADDR":"경기도 안양시 동안구 동편로20번길 20","REFINE_WGS84_LAT":"37.40527541","REFINE_WGS84_LOGT":"126.9721156"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"서호돈가스","TELNO":"031-422-3232","BIZCOND_NM":"양식","MAIN_MENU_NM":"피자","REFINE_ZIPNO":"14063","REFINE_LOTNO_ADDR":"경기도 안양시 동안구 평촌동 96-4번지","REFINE_ROADNM_ADDR":"경기도 안양시 동안구 흥안대로 434","REFINE_WGS84_LAT":"37.3922205","REFINE_WGS84_LOGT":"126.9749441"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"설악추어탕","TELNO":"031-468-9937","BIZCOND_NM":"한식","MAIN_MENU_NM":"추어탕","REFINE_ZIPNO":"14039","REFINE_LOTNO_ADDR":"경기도 안양시 동안구 비산동 580-12번지","REFINE_ROADNM_ADDR":"경기도 안양시 동안구 경수대로 829","REFINE_WGS84_LAT":"37.39297416","REFINE_WGS84_LOGT":"126.9423418"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"진부령동태찜탕전문점","TELNO":"031-465-8797","BIZCOND_NM":"한식","MAIN_MENU_NM":"동태찜탕","REFINE_ZIPNO":"14093","REFINE_LOTNO_ADDR":"경기도 안양시 만안구 안양동 548-1번지","REFINE_ROADNM_ADDR":"경기도 안양시 만안구 안양로 119","REFINE_WGS84_LAT":"37.38524679","REFINE_WGS84_LOGT":"126.9320614"},{"SUM_YY":"2021","QU":"하반기","SIGUN_NM":"안양시","BIZEST_NM":"진성장어","TELNO":"031-422-6677","BIZCOND_NM":"한식","MAIN_MENU_NM":"장어구이","REFINE_ZIPNO":"14060","REFINE_LOTNO_ADDR":"경기도 안양시 동안구 평촌동 170-1번지","REFINE_ROADNM_ADDR":"경기도 안양시 동안구 귀인로 295","REFINE_WGS84_LAT":"37.38877772","REFINE_WGS84_LOGT":"126.9712867"}
        
        ];

        // 다른 마커 생성
        for (var i = 0; i < data.length; i++) {
          var position = data[i];
          var anothermarker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(position.REFINE_WGS84_LAT, position.REFINE_WGS84_LOGT),
          });

          anothermarkers.push(anothermarker); // 생성된 마커를 배열에 저장
        }

        // 모든 다른 마커를 지도에 추가
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
          <Icon name="my-location" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[ styles.infoContainer, { transform: [{ translateY: infoTranslateY }] } ]}>
        <View style={{flexDirection: "row", marginBottom:10}}>
          <Text style={{marginRight: 320}}>Location</Text>
          <TouchableOpacity onPress={closeInfo}><Icon name="cancel" size={20} /></TouchableOpacity>
        </View>
        <View style={{flexDirection:"row"}}>
          <View style={{alignSelf:"center"}}>
            <TouchableOpacity style={styles.profileImage}>
            </TouchableOpacity>
          </View>
          <View>
            <View style={{marginBottom:10, alignItems: "center"}}>
              <Text style={{fontSize: 30}}>한스델리 안성점</Text>
              <Text style={{fontSize: 15}}>4.8</Text>
            </View>
            <View style={{flexDirection: "row", marginBottom:10, alignItems: "center", alignSelf: "center"}}>
              <Text style={{fontWeight:"bold", fontSize:15, marginRight: 25}}>   현재 위치에서 {calculateDistance()}m에 있음   </Text>
              <TouchableOpacity style={{backgroundColor:"red", borderRadius: 5, padding:5}}><Text style={{color:"white"}}>    3{"\n"}   min   </Text></TouchableOpacity>
            </View>
            <View style={{flexDirection: "row", marginBottom:10, alignItems: "center", alignSelf: "center"}}>
              <View style={{alignItems: "center", marginRight:10}}>
                <Icon name="alarm" size={35}></Icon>
                <Text>예약 가능</Text>
              </View>
              <View style={{alignItems: "center", marginRight:10}}>
                <Icon name="sentiment-satisfied-alt" size={35}></Icon>
                <Text>혼밥 가능</Text>
              </View>
              <View style={{alignItems: "center"}}>
                <Icon name="people" size={35}></Icon>
                <Text>단체 가능</Text>
              </View>
              <TouchableOpacity style={{marginLeft: 20, backgroundColor:"deepskyblue", borderRadius: 5, padding:5}} onPress={() => navigation.navigate("stackDetail")}><Text style={{color:"white"}}>  예약{"\n"}  하기  </Text></TouchableOpacity>
            </View>
          </View>
        </View>
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