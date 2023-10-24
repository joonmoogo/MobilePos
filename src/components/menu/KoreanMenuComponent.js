import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Image } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { clientApiUrl } from '../../config';
import { storeData } from '../../utils/asyncStorageService';


const KoreanMenuComponent = ({navigation,store}) => {
  
  return (
    <View style={{ flexDirection: 'row' }}>
    <ScrollView contentContainerStyle={styles.scrollViewContent} >
      {store?.map((e, i) => {
        return (
          <View key={i}>
            <TouchableOpacity
              onPress={() => {
                console.log(e.id);
                storeData('clickedStore', e.id).then(() => {
                  console.log('clickedStore was stored', e.id);
                  navigation.navigate('stackDetail');
                });
              }}
            >
              <Card>
                <Image
                  style={{ borderRadius: 10, marginLeft: 20, height: 120, width: 250 }}
                  source={{ uri: `${clientApiUrl}/serverImage/${e?.profilePhoto}` }}
                ></Image>
                <Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 20, color: 'black' }}>{e.name}</Text>
                <Text style={{ marginLeft: 20 }}>{e.address}</Text>
              </Card>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 20, // 스크롤뷰의 아래에 추가적인 여백을 주면 끝까지 스크롤됩니다.
  },
});
  
export default KoreanMenuComponent;