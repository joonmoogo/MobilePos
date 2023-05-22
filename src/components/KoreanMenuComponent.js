import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'expo-checkbox';
import {useForm, Controller} from 'react-hook-form';

const KoreanMenuComponent = ({navigation}) => {
  const [isChecked, setChecked] = useState(false);
  const [DropdownOpen, setDropdownOpen] = useState(false);
  const [DropdownLabel, setDropdownLabel] = useState([
    { label: "거리순", value: "distance" },
    { label: "별점순", value: "star" },
    { label: "리뷰 많은 순", value: "review" },
  ]);
  const { control } = useForm();

  return (
    <View>
      <View>
        <Text style={{flexDirection: 'row', margin:15}}>
            <Icon style={{color: 'grey', margin:50}} name="room" size={25}></Icon>
            <Text style={{color: 'grey', fontSize:20}}>안성시 중앙로</Text>
        </Text>
            
        <View style={{flexDirection: 'row'}}>
            <Controller
            name="dropdown"
            defaultValue="distance"
            control={control}
            render={({ field: { onChange, value } }) => (
                <View style={styles.dropdownFrame}>
                    <DropDownPicker
                      style={styles.dropdown}
                      open={DropdownOpen}
                      value={value} 
                      items={DropdownLabel}
                      setOpen={setDropdownOpen}
                      setValue={onChange}
                      setItems={setDropdownLabel} />
                  </View>
                )} />
            <Text style={{flexDirection: 'row', margin:10}}>
                <CheckBox value={isChecked} onValueChange={setChecked} />
                <Text style={{color: 'grey'}}>  찜한 가게만 보기</Text>
            </Text>
        </View>

        <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={styles.text}>This Is Korean Menu List</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    text: {
      color: 'black',
      fontSize: 30,
    },
    dropdown: {
      borderColor: "#B7B7B7",
      height: 30,
    },
    dropdownFrame: {
      marginHorizontal: 10,
      width: "55%",
      marginBottom: 25,
    },
    storebox: {
      alignSelf: 'center',
      width: Dimensions.get('window').width - 20,
      height: 120,
      backgroundColor: '#e6e5e5',
      marginTop: 10,
      marginBottom: 10,
      fontSize: 30,
      color: 'grey',
      padding: 15,
    }
  });
  
export default KoreanMenuComponent;