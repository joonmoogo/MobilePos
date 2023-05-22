import React from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Tab, TabView } from '@rneui/themed';
import MenuCard from '../components/MenuCard';
import ReviewCard from '../components/ReviewCard';

const menus = [
  {
    title: '돈까스',
    text: '육즙이 잘좔좔....겉바속촉 감동의 맛.... 손님 울었음\n가격 13,000원',
  },
  {
    title: '파스타',
    text: '이것이 마약 파스타\n대마 함유\n가격 12,000원',
  },
  {
    title: '치킨',
    text: '육즙이 잘좔좔....겉바속촉 감동의 맛.... 손님 울었음\n가격 13,000원',
  },
  {
    title: '토스트',
    text: '이것이 마약 파스타\n대마 함유\n가격 12,000원',
  },
  {
    title: '옥수수',
    text: '육즙이 잘좔좔....겉바속촉 감동의 맛.... 손님 울었음\n가격 13,000원',
  },
  {
    title: '햄버거',
    text: '이것이 마약 파스타\n대마 함유\n가격 12,000원',
  },
];

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

const DetailScreen = ({ navigation }) => {
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
                <Text style={styles.headerText}>대표 메뉴</Text>
              </View>
              {menuList}
            </View>
          </ScrollView>
        </TabView.Item>
  
        <TabView.Item style={styles.tabViewItem}></TabView.Item>
  
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
    backgroundColor: '#ebecf0'
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
  }
});

export default DetailScreen;