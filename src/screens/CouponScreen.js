import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import CouponCard from '../components/CouponCard';

const CouponScreen = () => {
  const [coupons, setCoupons] = useState([
    {
      title: '예약 5,000원 할인',
      text: '가입 축하 쿠폰',
    },
    {
      title: '예약 10,000원 할인',
      text: '첫 예약 쿠폰',
    },
  ]);

  const couponList = coupons.map(coupon => (
    <CouponCard
      key={coupon.title}
      title={coupon.title}
      text={coupon.text}></CouponCard>
  ));
    return (
        <View style={styles.container}>
          <Text style={styles.text}>쿠폰함</Text>
          <Text style={styles.text2}>보유 쿠폰 {coupons.length}장</Text>
          {couponList}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      width: Dimensions.get('window').width,
    },
    text: {
      marginLeft: 20,
      marginTop: 20,
      fontSize: 30,
      color: 'black'
    },
    text2: {
      marginLeft: 20,
      marginTop: 20,
      fontSize: 20,
      color: 'black'
    }
  });

export default CouponScreen;