import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import StoreCard from '../card/StoreCard';
import goodRestaurants from '../../assets/goodrestaurants.json';

const AllMenuComponent = ({navigation}) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedStores = goodRestaurants.map(item => ({ title: item.BIZEST_NM }));
        setStores(updatedStores);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const storeList = stores.slice(0, 20).map((store, index) => (
    <StoreCard key={index} title={store.title} />
  ));

  return (
    <View>
      <View>
        <ScrollView>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("stackDetail")}>
                <Text style={styles.storebox}>한스델리 안성점{"\n"}</Text>
              </TouchableOpacity>
            </View>
            {storeList}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    storebox: {
      alignSelf: 'center',
      width: Dimensions.get('window').width - 28,
      height: 110,
      marginTop: 10,
      fontSize: 25,
      color: 'black',
      padding: 15,
      borderWidth: 1,
      borderColor: 'lightgrey',
      fontWeight: 'bold'
    }
  });
  
export default AllMenuComponent;