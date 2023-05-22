import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'expo-checkbox';

const AllMenuScreen = ({navigation}) => {
    const [isChecked, setChecked] = useState(false);
    const [isSelected, setSelected] = useState("");
    const data = [
        {key: '1', value:'거리 순'},
        {key: '2', value:'추천 순'},
        {key: '3', value:'리뷰 많은 순'},
    ]

    return (
        <View>
            <Text style={{flexDirection: 'row', margin:10}}>
                <Icon style={{margin:50}} name="room" size={25}></Icon>
                <Text style={{fontSize:20}}>안성시 중앙로</Text>
            </Text>
            <SelectList style={styles.SelectList} 
                    setSelected={(val) => setSelected(val)} 
                    defaultOption={{ key:'1', value:'거리 순' }}
                    data ={data}
                    save="value"
                    search={false}>
                </SelectList>
            <Text style={{flexDirection: 'row', margin:10}}>
                <CheckBox value={isChecked} onValueChange={setChecked} />
                <Text>  찜한 가게만 보기</Text>
            </Text>

            <View>
                <TouchableOpacity style={styles.storebox} onPress={() => navigation.navigate("stackDetail")}>
                    <Text style={styles.storebox}>한스델리 안성점</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const KoreanMenuScreen = () => {
    return (
        <Text>This is Korean Menu content.</Text>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    text: {
        color: 'black'
    },
    SelectList: {
        width: 20,
        height: 10,
        marginRight: 30
    },
    storebox: {
        width: Dimensions.get('window').width,
        height: 100,
        backgroundColor:'lightgrey',
        margin: 10,
        fontSize: 30,
        color: 'black'
    }
  });

export { AllMenuScreen, KoreanMenuScreen };