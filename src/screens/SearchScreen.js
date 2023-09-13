import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import StoreCard from '../components/StoreCard';
import goodRestaurants from '../assets/goodrestaurants.json';

const SearchScreen = ({ navigation }) => {
  const [stores, setStores] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredStores, setFilteredStores] = useState([]);
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);

  const handleSearch = (text) => {
      setSearchText(text);

      // 검색어에 해당하는 가게 리스트를 업데이트
      const updatedStores = stores.filter((store) =>
          store.title.includes(text)
      );
      setFilteredStores(updatedStores);
  };

  useEffect(() => {
      const fetchData = async () => {
          try {
              const updatedStores = goodRestaurants.map((item) => ({
                  title: item.BIZEST_NM,
              }));
              setStores(updatedStores);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchData();
  }, []);

  return (
      <View style={styles.container}>
          <Text style={styles.text}>검색</Text>
          <View style={{ padding: 25 }}>
              <TextInput
                  style={styles.input}
                  placeholder='Search'
                  placeholderTextColor='grey'
                  onChangeText={handleSearch}
                  value={searchText}
                  onFocus={() => setIsTextInputFocused(true)}
                  onBlur={() => setIsTextInputFocused(false)}
                  autoFocus
              />
          </View>

          <ScrollView>
              {(isTextInputFocused || searchText.length > 0) && (
                  <View>
                      {filteredStores.slice(0, 20).map((store, index) => (
                          <StoreCard key={index} title={store.title} onClick={() => navigation.navigate('DetailScreen')} />
                      ))}
                  </View>
              )}
          </ScrollView>
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
    },
    input: {
        width: '90%',
        height: 35,
        backgroundColor: "white",
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
        fontSize: 15,
        borderWidth: 1, // 외곽선 두께
        borderColor: 'gray', // 외곽선 색상
        marginLeft: 15
      },
  });

export default SearchScreen;