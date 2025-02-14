import React, { useState, useEffect, useRef } from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity,Image, Linking } from 'react-native';
import { Tab, TabView, Card } from '@rneui/themed';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { WebView } from 'react-native-webview';
import MenuCard from '../components/card/MenuCard';
import ReviewCard from '../components/card/ReviewCard';
import { getData, storeData } from '../utils/asyncStorageService';
import { getMenus } from '../utils/menuHandler';
import { getStoreById } from '../utils/storeHandler';
import { getTableById } from '../utils/tableHandler';
import { clientApiUrl } from '../config';
import { getUser } from '../utils/userHandler';
import { serverConnect } from '../utils/notificationHandler';
import { getOrderByStoreId } from '../utils/orderHandler';
import { useIsFocused } from '@react-navigation/native';
import { getReviewsByStoreId } from '../utils/reviewHandler';



const DetailScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchData = async () => {
        try {
          
            const storeId = await getData('clickedStore');
            console.log('detailScreen Id = ' + storeId);

            const token = await getData('hknuToken');
            console.log(token);

            const [storeData, menus, tables, user,reviews] = await Promise.all([
                getStoreById(storeId, token),
                getMenus(storeId, token),
                getTableById(storeId, token),
                getUser(token),
                getReviewsByStoreId(storeId,token)
            ]);

            console.log(storeData);
            console.log(menus);
            console.log(tables);
            console.log(reviews);
            getData('zzim').then((data)=>{
              const found = data.find(item => item.name === storeData.name);
              if(found) {
                setIcon('favorite');
              }
            });
            setStore(storeData);
            setMenus(menus);
            setTables(tables);
            setReview(reviews)


            const orders = await getOrderByStoreId(storeId, token);
            orders.forEach((order) => {
                console.log(order);
                if (order?.orderCode === 'ORDER') {
                    console.log(order.tableId);
                    const matchingTable = tables.find((table) => table.id === order.tableId);
                    if (matchingTable) {
                        matchingTable.ordering = true;
                    }
                }
            });

            console.log(user.id);
            console.log(storeId);
            console.log(token);

            // const serverConnectData = await serverConnect(storeId, 1, token);
            // console.log(serverConnectData);
        } catch (error) {
          console.log(error);
        }
        
    };

    if(isFocused){
      fetchData().catch((error)=>{
        return error;
      })
    }

    
}, [isFocused]);
  const [review,setReview] = useState([]);
  const [store,setStore] = useState();
  const [menus, setMenus] = useState([]);
  const [tables,setTables] = useState([]);
  const [icon,setIcon] = useState('favorite-border')

  function heartFill(){
    setIcon('favorite');
    getData('zzim').then((data)=>{
      if(data){
        const found = data.find(item => item.name === store.name);
        if(found){
          return;
        }
        data.push(store);
        storeData('zzim',data);
      }
      else{
        storeData('zzim',[store]);
      }
      
    })
  }
  function heartEmpty(){
    setIcon('favorite-border');
    getData('zzim').then((data)=>{
      const found = data.filter(item => item.name !== store.name);
      storeData('zzim',found);

    })
  }

  

  const webViewRef = useRef(null);

  const [index, setIndex] = React.useState(0);

  const menuList = menus.map(menu => (
    <MenuCard 
     key={menu.name}
     title={menu.name}
     category={menu.category}
     text={menu.detail}
     photo={menu.photo}
     ></MenuCard>
  ));

  const reviewList = review.map(item => (
    <ReviewCard
      key={item.id}
      title={item.accountId}
      text={item.detail}
      writingTime={item.writingTime}
      rating={item.rating}></ReviewCard>
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
        <Text style={{ color: 'black',fontWeight:'bold', fontSize: 30, marginBottom:20  }}>{store?.name}</Text>
        <View>
          <TouchableOpacity style={{backgroundColor:'deepskyblue', opacity:1.2 , height:40, width:120,borderRadius: 10 }} onPress={() => navigation.navigate("stackStoreReservation")}>
            <Text style={{color:'white', padding: 10, textAlign:'center'}}>예약 하기</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <MaterialIcons color="red"  name={icon} size={35} style={{left:130, bottom:35,}} onPress={()=>{
              icon=='favorite'?heartEmpty():heartFill();
            }}/>
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
              <Card.Image
                style={{borderRadius:10}}
                source={{
                  uri: `${clientApiUrl }/serverImage/${store?.profilePhoto}`,
                }}
              />
              <Text style={{marginTop:10,textAlign:'center'}}>{store?.info}</Text>
            </View>
            <View style={styles.informationTable} >
              {tables.map((e,i)=>{
                console.log(e);
                const originalWidth = 940;
                const originalHeight = 737;
                const newWidth = 390;
                const newHeight = 260;
              
                const originalTop = parseInt(e.coordY);
                const originalLeft = parseInt(e.coordX);
              
                const widthRatio = newWidth / originalWidth;
                const heightRatio = newHeight / originalHeight;
              
                const newTop = originalTop * heightRatio+5
                const newLeft = originalLeft * widthRatio+5
              
                
                return(
                  <View
                  key={i} 
                  style={{
                    backgroundColor:'white',
                    top:newTop ,
                    left:newLeft,
                    backgroundColor:e.ordering?"#F8E0E0":"#CEF6D8",
                    width:parseInt(e.width) * widthRatio-2,
                    height:parseInt(e.height) * heightRatio,
                    position:'absolute',
                    borderWidth: 1, // 테두리 두께
                    borderBottomWidth:1.5,
                    borderBottomColor:'teal',
                    borderRadius:5,
                    borderColor: 'lightgrey', // 테두리 색상
                  }}>
                    <>
                    <Text style={{marginLeft:5,fontSize:10,color:'black'}}>{e.privateKey}T </Text>
                    <Text style={{marginLeft:5,fontSize:7}}>{e.name}</Text>
                    {e.ordering?<Text style={{marginLeft:5, color:'red', fontSize:7}}>식사 중</Text>:<Text style={{marginLeft:10, color:'green'}}></Text>}
                    </>
                  </View>
                )
              })}
            </View>
            <View style={styles.informationItem}>
              <Text style={{marginLeft:10, marginTop:10}}>매장 운영 정보: 월요일 ~ 금요일 , 09AM ~ 09PM</Text> 
              <TouchableOpacity onPress={()=>{
                Linking.openURL(`tel:${store?.phoneNumber}`)
              }} style={{width:'100%',height:40}}>
              <Text style={{marginLeft:10, marginTop:10}}>매장 전화번호: {store?.phoneNumber}</Text>
              </TouchableOpacity>             
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
    borderBottomWidth:0.4,
    borderColor:'grey',
    backgroundColor: 'white',
    width: '85%',
    height: 200,
    margin: 20,
    marginLeft: 30,
    borderRadius:20,
  },
  informationTable: {
    borderBottomWidth:0.4,
    borderColor:'grey',
    backgroundColor: 'white',
    width: '85%',
    height: 220,
    margin: 20,
    marginLeft: 30,
    borderRadius:20,
  }
});

export default DetailScreen;