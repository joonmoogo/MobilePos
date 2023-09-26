import React, { useState, useEffect, useRef } from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Tab, TabView } from '@rneui/themed';
import { WebView } from 'react-native-webview';
import MenuCard from '../components/card/MenuCard';
import ReviewCard from '../components/card/ReviewCard';

const DetailScreen = ({ navigation }) => {
  const [menus, setMenus] = useState([
    {
      title: '돈까스',
      text: '육즙이 잘좔좔....겉바속촉 감동의 맛.... 손님 울었음\n가격 13,000원',
      price: 13000,
      count: 0
    },
    {
      title: '파스타',
      text: '이것이 마약 파스타\n대마 함유\n가격 12,000원',
      price: 12000,
      count: 0
    },
    {
      title: '치킨',
      text: '육즙이 잘좔좔....겉바속촉 감동의 맛.... 손님 울었음\n가격 13,000원',
      price: 13000,
      count: 0
    },
    {
      title: '토스트',
      text: '이것이 마약 파스타\n대마 함유\n가격 12,000원',
      price: 12000,
      count: 0
    },
    {
      title: '옥수수',
      text: '육즙이 잘좔좔....겉바속촉 감동의 맛.... 손님 울었음\n가격 13,000원',
      price: 13000,
      count: 0
    },
    {
      title: '햄버거',
      text: '이것이 마약 파스타\n대마 함유\n가격 12,000원',
      price: 13000,
      count: 0
    },
  ]);
  
  const reviews = [
    {
      title: '구름이',
      text: '너무 맛있었다',
      rating: 5,
    },
    {
      title: '구르니',
      text: '너무 맛있다',
      rating: 4,
    },
  ];
  const webViewRef = useRef(null);

  const [index, setIndex] = React.useState(0);

  const menuList = menus.map(menu => (
    <MenuCard key={menu.title} title={menu.title} text={menu.text}></MenuCard>
  ));

  const reviewList = reviews.map(review => (
    <ReviewCard
      key={review.title}
      title={review.title}
      text={review.text}
      rating={review.rating}></ReviewCard>
  ));

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta charset="utf-8">
        <style>
          #map {
            width: 100%;
            height: 50vh;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=f100b132c7c96aa31427b9bd72068ff0&libraries=services"></script>
        <script>
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: new kakao.maps.LatLng(37.0113, 127.2650), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };
    
    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    
    // 마커가 표시될 위치입니다 
    var markerPosition  = new kakao.maps.LatLng(37.0113, 127.2650); 
    
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });
    
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{ color: 'grey', fontSize: 30, marginBottom:20  }}>한스델리 안성점</Text>
        <View>
          <TouchableOpacity style={{backgroundColor:'deepskyblue', height:40, width:60,borderRadius: 10 }} onPress={() => navigation.navigate("stackStoreReservation")}>
            <Text style={{color:'white', padding: 10}}>  예약</Text>
          </TouchableOpacity>
        </View>
      </View>
      

      <Tab style={{backgroundColor: '#ebecf0',}} value={index} onChange={e => setIndex(e)}>
        <Tab.Item title="메뉴"></Tab.Item>
        <Tab.Item title="정보"></Tab.Item>
        <Tab.Item title="리뷰"></Tab.Item>
      </Tab>
  
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={styles.tabViewItem}>
          <ScrollView>
            <View>
              <View style={styles.header}>
                <Text style={styles.headerText}>메뉴</Text>
              </View>
              {menuList}
            </View>
          </ScrollView>
        </TabView.Item>
  
        <TabView.Item style={styles.tabViewItem}>
          <ScrollView>
            <View style={styles.informationItem}>
              <Text>테이블 좌석 현황 표시 예정</Text>
            </View>

            <View style={styles.informationItem}>
              <Text>바른생각을 가진 사람들이 만드는 요리 한스델리 안성점입니다.
                {'\n'}운영시간 : 매일 오전 10:30 ~ 오후 8:30
                {'\n'}단체 예약 가능, 혼밥석 보유 중, 선결제 가능 매장, 테이블 예약 가능
              </Text>
            </View>

            <View style={styles.informationItem}>
              <Text>가게의 현위치를 표시한 지도 표시 예정</Text>
            </View>
          </ScrollView> 
        </TabView.Item>
  
        <TabView.Item style={styles.tabViewItem}>
          <ScrollView>{reviewList}</ScrollView>
        </TabView.Item>
      </TabView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabViewItem: {
    width: '100%',
    backgroundColor: '#ebecf0',
  },
  header: {
    height: 60,
    backgroundColor: '#268ef6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
  },
  scrollView: {
    flex:1
  },
  informationItem: {
    backgroundColor: 'white',
    width: '85%',
    height: 200,
    margin: 20,
    marginLeft: 30
  }
});

export default DetailScreen;