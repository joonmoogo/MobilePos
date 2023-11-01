import React, { useState } from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {PricingCard, Rating} from 'react-native-elements';
import {Text, Card, Button, Icon} from '@rneui/themed';
import { useEffect } from 'react';
import { getUser, getUserById } from '../../utils/userHandler';
import { getData } from '../../utils/asyncStorageService';
import { clientApiUrl } from '../../config';

const ReviewCard = props => {
  useEffect(()=>{
    getData('hknuToken').then((token)=>{
      getUserById(props.title,token).then((data)=>{
        console.log(data);
        setUserData(data);
        setMainText(extractTextInAngleBrackets(props.text));
      })
    })
  },[])
  const [userData,setUserData] = useState();
  const [mainText,setMainText]=useState(['맛도리','핵도리']);

  function extractTextInAngleBrackets(text) {
    const matches = text.match(/<([^>]+)>/g);
  
    if (matches) {
      return matches.map((match) => match.slice(1, -1)); // <와 >를 제외한 문자열을 추출
    } else {
      return [];
    }
  }
  function removeTextInAngleBrackets(text) {
    return text.replace(/<[^>]+>/g, '');
  }
  function formatDate(inputDate) {
    const inputDateObj = new Date(inputDate);
    const currentDate = new Date();
    
    const timeDiff = currentDate - inputDateObj;
    const oneDay = 24 * 60 * 60 * 1000;
    
    if (timeDiff < oneDay) {
      return '오늘';
    } else if (timeDiff < 2 * oneDay) {
      return '어제';
    } else {
      const month = (inputDateObj.getMonth() + 1).toString().padStart(2, '0');
      const day = inputDateObj.getDate().toString().padStart(2, '0');
      return `${month}-${day}`;
    }
  }
  return (
    <Card wrapperStyle={styles.card}>
      <View style={styles.profile}>
        <Card.Image
          style={styles.image}
          source={{
            uri: `${clientApiUrl }/serverImage/${userData?.profilePhoto}`,
          }}
        />
        <View>
        <Card.Title>{userData?.nickname}</Card.Title>
          <Rating imageSize={15} readonly startingValue={props.rating}></Rating>

        </View>
      </View>
      <View style={styles.container}>
      {mainText.map((e,i)=>{
        return(
          <Text style={styles.mainText} key={i}>[ {e} ]</Text>
        )
          })}
        <Text style={styles.text}>{removeTextInAngleBrackets(props.text)}</Text>
        <Text style={{fontSize:9, color:'grey'}}>{formatDate(props?.writingTime)}</Text>
      </View>
      
    </Card>
  );
};

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  image: {
    borderRadius: 50,
    height: 60,
    width: 60,
    
  },
  card: {
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
  },
  mainText:{
    flex: 1,
    flexWrap: 'wrap',
    color:'grey',
    fontSize:10 
  }
});

export default ReviewCard;