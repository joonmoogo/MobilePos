import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import BookmarkCard from '../components/card/BookmarkCard';

const BookmarkScreen = () => {
  const [bookmarks, setBookmarks] = useState([
    {
      title: '한스델리 안성점',
      rating: 4.8,
    },
    {
      title: '홍익돈가스 안성점',
      rating: 4.5,
    },
  ]);

  const bookmarkList = bookmarks.map(bookmark => (
    <BookmarkCard
      key={bookmark.title}
      title={bookmark.title}
      text={bookmark.text}
      rating={bookmark.rating}></BookmarkCard>
  ));
    return (
        <View style={styles.container}>
          <Text style={styles.text}>찜 목록</Text>
          {bookmarkList}
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

export default BookmarkScreen;