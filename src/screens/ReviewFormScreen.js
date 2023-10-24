import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Icon, Rating } from 'react-native-elements';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { getData } from '../utils/asyncStorageService';
import { useNavigation, useRoute } from '@react-navigation/native';
import { saveReview } from '../utils/reviewHandler';

const ReviewForm = () => {
  useEffect(()=>{
    const id = route?.params.props;
    setStoreId(id);
  },[])
  const navigation = useNavigation();
  const route = useRoute();
  const [storeId,setStoreId] = useState();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [iconBody,setIconBody] = useState('');
  const [rating, setRating] = useState(5);
  const [iconColors, setIconColors] = useState({
    color1: "#666666",
    color2: "#666666",
    color3: "#666666",
    color4: "#666666",
    color5: "#666666",
    color6: "#666666",
  });


  const icons = [
    { name: 'wifi', text: '음식이 맛있어요', color: 'color1' },
    { name: 'hourglass-start', text: '서빙이 신속해요', color: 'color2' },
    { name: 'money', text: '가격이 저렴해요', color: 'color3' },
    { name: 'users', text: '응답이 빨라요', color: 'color4' },
    { name: 'list', text: '친절해요', color: 'color5' },
    { name: 'car', text: '주차가 편해요', color: 'color6' },
  ];

  const handleIconPress = (colorKey) => {
    // 클릭 시 아이콘 색상 및 텍스트 토글
    setIconColors((prevColors) => ({
      ...prevColors,
      [colorKey]: prevColors[colorKey] === '#f1c40f' ? '#666666' : '#f1c40f',
    }));

    // 클릭한 아이콘의 텍스트를 TextInput에 추가 또는 제거
    const clickedIcon = icons.find((item) => item.color === colorKey);
    if (clickedIcon) {
      setIconBody((prevBody) => {
        if (prevBody.includes(clickedIcon.text)) {
          // 이미 포함된 경우 제거
          return prevBody.replace("<"+clickedIcon.text+">",'').trim();
        } else {
          // 추가
          return prevBody +"<"+clickedIcon.text+">";
        }
      });
    }
  };
  


  return (
    <ScrollView style={styles.container}>
    <Rating style={{ margin: 40, }} imageSize={40} startingValue={5} onFinishRating={(e) => { setRating(e) }} />
    <Text style={styles.centeredText}>어떤 점이 만족스러웠나요?</Text>
    <View style={styles.iconContainer}>
      {icons.map((item, index) => (
        <View key={index} style={styles.iconWrapper}>
          <TouchableOpacity onPress={() => handleIconPress(item.color)}>
            <Icon
              name={item.name}
              type="font-awesome"
              size={50}
              color={iconColors[item.color]}
              backgroundColor={"#E2E2E2"}
              padding={20}
              borderRadius={100}
            />
            <Text style={styles.iconText}>{item.text}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
    <TextInput
      style={styles.textArea}
      placeholder="리뷰를 작성해주세요"
      multiline={true}
      value={body}
      onChangeText={(text) => setBody(text)}
    />
    <Button title="리뷰 작성" onPress={()=>{
      const review = {
        storeId:storeId,
        detail:`${iconBody} ${body}`,
        rating: rating
      }
      getData('hknuToken').then((token)=>{
        console.log(token);
        saveReview(review,token).then((data)=>{
          console.log(data);
          alert('리뷰달았음');
          navigation.navigate('stackReservation')
        })
      })
    }}/>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  centeredText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: '33%',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconText: {
    marginTop: 8,
    textAlign: 'center',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
});

export default ReviewForm;
