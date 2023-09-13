import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import ReviewCard from '../components/ReviewCard';

const ReviewScreen = () => {
  const [reviews, setReviews] = useState([
    {
      title: '한스델리 안성점',
      text: '존맛탱',
      rating: 5,
    },
    {
      title: '홍익돈가스 안성점',
      text: '존맛탱',
      rating: 5,
    },
  ]);

  const reviewList = reviews.map(review => (
    <ReviewCard
      key={review.title}
      title={review.title}
      text={review.text}
      rating={review.rating}></ReviewCard>
  ));

    return (
        <View style={styles.container}>
          <Text style={styles.text}>리뷰 관리</Text>
          {reviewList}
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
    }
  });

export default ReviewScreen;