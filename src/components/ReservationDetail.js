import React, { useState, useRef,useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import OrderMenuCard from '../components/card/OrderMenuCard';
import DatePicker from 'react-native-date-picker';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { menus } from '../screens/DetailScreen';
import moment from 'moment';
import { SelectList } from 'react-native-dropdown-select-list';
import { getData } from '../utils/asyncStorageService';
import { getStoreById } from '../utils/storeHandler';
import { getMenus } from '../utils/menuHandler';
import { getTableById } from '../utils/tableHandler';
import { getOrder, getOrderByStoreId, saveReservation } from '../utils/orderHandler';
import { saveOrderDetail } from '../utils/orderDetailHandler';
import { useNavigation } from '@react-navigation/native';



const ReservationDetail = () => {
  
  useEffect(()=>{
    getData('hknuToken').then((token)=>{
      setToken(token);
      getData('clickedStore').then((storeId)=>{
        console.log(storeId);
        setStoreId(storeId);

        getMenus(storeId,token).then((data)=>{
          data.map((e,i)=>{
            e.count=0;
          })
          setMenus(data);
          console.log(data);
        })
        getTableById(storeId,token).then((data)=>{

          setTables(data);

        })
      })  
    })
  },[])
  const navigation = useNavigation();
  const [token,setToken] = useState();
  const [storeId,setStoreId] = useState();
  const [tables,setTables] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [date, setDate] = useState(new Date());
  const [people, setPeople] = useState(1);
  const [table,setTable] = useState(1);
  const [menus, setMenus] = useState([]);
  const [isSelected, setSelected] = useState("");
  const [selectedTableIndex, setSelectedTableIndex] = useState(null);
  const [selectedTableNumber,setSelectedTableNumber] = useState(null);

    const data = [
        {key: '1', value:'등록된 카드 1'},
    ]

  const handleOptionClick = (option) => {
    if (selectedOption === option) {
      // 이미 선택된 옵션을 다시 클릭한 경우
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
    }
  };

  const currentDateTime = new Date();
  const minimumDateTime = new Date(currentDateTime.getTime() + 1800000);
  const formattedDate = moment(date).format('MM/DD/YYYY, hh:mm A');

  const increaseCount = (index) => {
    const updatedMenus = [...menus];
    updatedMenus[index].count++;
    setMenus(updatedMenus); // 메뉴 항목을 저장하는 'menus'라는 상태 변수가 있다고 가정합니다
  };
  
  const decreaseCount = (index) => {
    const updatedMenus = [...menus];
      if (updatedMenus[index].count > 0) {
        updatedMenus[index].count--;
        setMenus(updatedMenus); // 메뉴 항목을 저장하는 'menus'라는 상태 변수가 있다고 가정합니다
      };
  };

  const menuList = menus.map((menu, index) => (
        
        <OrderMenuCard
          menu={menu}
          key={index}
          title={menu.name}
          text={menu.text}
          price={menu.price}
          count={menu.count}
          increaseCount={() => increaseCount(index)}
          decreaseCount={() => decreaseCount(index)}
        />
      ));

  const totalPrice = menus
      .filter((menu) => menu.count !== 0)
      .reduce((total, menu) => total + menu.count * menu.price, 0);
        
  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
      
  const formattedTotalPrice = formatNumberWithCommas(totalPrice);

  return (
    <>
    <ScrollView style={styles.container}>
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={() => handleOptionClick('time')}>
          <Text style={styles.titleButton}>   시간 선택   </Text>
        </TouchableOpacity>
        <Text style={{alignSelf: "center"}}>{formattedDate}</Text>
      </View>

      {selectedOption === 'time' && (
        <View style={{alignItems: "center", marginBottom: 20}}>
          <DatePicker  date={date} onDateChange={setDate} minimumDate={minimumDateTime} minuteInterval={10} />
        </View>
      )}

      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={() => handleOptionClick('people')}>
          <Text style={styles.titleButton}>   인원 수 선택   </Text>
        </TouchableOpacity>
        <Text style={{alignSelf: "center"}}>{people}명</Text>
      </View>

      {selectedOption === 'people' && (
        <View style={{marginBottom: 20}}>
          <ScrollPicker
            dataSource={['1', '2', '3', '4', '5', '6']}
            selectedIndex={people-1}
            onValueChange={setPeople}
            wrapperColor='#FFFFFF'
          />
        </View>
      )}
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={() => handleOptionClick('table')}>
        <Text style={styles.titleButton}>   테이블 선택</Text>
      </TouchableOpacity>
      <Text style={{alignSelf: "center"}}>{selectedTableNumber}</Text>
      </View>

      {selectedOption === 'table' && (
        <View style={styles.informationTable} >
        {tables.map((e,i)=>{
          console.log(e);
          const originalWidth = 940;
          const originalHeight = 737;
          const newWidth = 390;
          const newHeight = 260;

          const originalTop = parseInt(e.coordY);
          const originalLeft = parseInt(e.coordX);
        
          const widthRatio = newWidth / originalWidth;
          const heightRatio = newHeight / originalHeight;
        
          const newTop = originalTop * heightRatio+5
          const newLeft = originalLeft * widthRatio+5
        
          
          return(
            <>
            
            <View
            key={i} 
            style={{
              backgroundColor:'white',
              top:newTop ,
              left:newLeft,
              backgroundColor: selectedTableIndex === i ? 'lightblue' : 'white',
              width:parseInt(e.width) * widthRatio-2,
              height:parseInt(e.height) * heightRatio,
              position:'absolute',
              borderWidth: 1, // 테두리 두께
              borderBottomWidth:1.5,
              borderBottomColor:'teal',
              borderRadius:5,
              borderColor: 'lightgrey', // 테두리 색상
            }}>
              <TouchableOpacity key={e.id} onPress={()=>{
              setSelectedTableNumber(`${e.privateKey}T, ${e.name}`);
              setTable(e.id);
              setSelectedTableIndex(i); // 선택한 요소의 인덱스를 업데이트

            }}>
              
              <Text style={{marginLeft:5,fontSize:10,color:'black'}}>{e.privateKey}T </Text>
              <Text style={{marginLeft:5,fontSize:7}}>{e.name}</Text>
              {e.ordering?<Text style={{marginLeft:5, color:'red', fontSize:7}}>식사 중</Text>:<Text style={{marginLeft:10, color:'green'}}></Text>}
              
              </TouchableOpacity>

            </View>
            </>
          )
        })}
      </View>
      )}

      <View>
        <TouchableOpacity onPress={() => handleOptionClick('menu')}>
          <Text style={styles.titleButton}>   메뉴 선택   </Text>
        </TouchableOpacity>
        <Text style={{alignSelf: "center", fontSize: 15}}>{menus
          .filter((menu) => menu?.count !== 0) // count가 0이 아닌 메뉴들만 필터링
          .map((menu) => `${menu.name} ${menu.count}`)
          .join(", ")}
        </Text>
      </View>

      {selectedOption === 'menu' && (
        <View style={{marginBottom: 20}}>
           {menuList}
        </View>
      )}

      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={() => handleOptionClick('payment')}>
        <Text style={styles.titleButton}>   결제    </Text>
      </TouchableOpacity>
      <Text style={{alignSelf: "center", fontSize: 20}}>{formattedTotalPrice}원</Text>
      </View>

      {selectedOption === 'payment' && (
        <View style={{marginBottom: 20, flexDirection: "row"}}>
          <Text style={{marginLeft: 30, marginRight:20, fontSize: 15, alignSelf: "center"}}
          >등록된 카드 </Text>
          <SelectList
                    setSelected={(val) => setSelected(val)} 
                    defaultOption={{ key:'1', value:'등록된 카드 1' }}
                    data ={data}
                    save="value"
                    search={false}
                    boxStyles={{width: 250,
                      height: 50,
                      }}>
                </SelectList>
        </View>
      )}     
      
    </ScrollView>
    <View>
    <TouchableOpacity style={styles.nextButton} onPress={()=>{
      // console.log(
      //   {
      //     storeId:store.id,
      //     tableId:'tableId',
      //     reservationTime:'timeStamp',
      //     orderCode:'RESERVATION',
      //   }
      // )
      
    }}>
      <Text style={{alignSelf: 'center', color: 'white', fontSize: 25}} onPress={()=>{
        const parsedDate = new Date(formattedDate);
        const timeZoneOffsetInMinutes = parsedDate.getTimezoneOffset();
        parsedDate.setMinutes(parsedDate.getMinutes() - timeZoneOffsetInMinutes); // 시간대를 고려한 시간 조정
        const newDate = parsedDate.toISOString().replace('T', ' ').split('.')[0];
        const info = 
          {
            storeId:parseInt(storeId),
            tableId:parseInt(table),
            reservationTime:newDate,
            orderCode:'RESERVATION_WAIT'
          }
          console.log('parsedDate' + parsedDate);
          console.log('newDate' + newDate  );
          console.log('formattedDate' + formattedDate);
        const selectedMenu = menus.filter(item => item.count !==0);


        
        
        saveReservation(info,token).then((data)=>{
          getOrderByStoreId(storeId,token).then((data)=>{
            console.log(data);
            selectedMenu.forEach((e)=>{
              const menuInfo = {
                orderId : data[data.length-1].id,
                menuId : e.id,
                amount : e.count
              }
              saveOrderDetail(menuInfo,token).then((data)=>{
                console.log(data);
              })
              alert('예약 신청 완료');
              navigation.navigate('stackStoreReservation')
              
            })
            
          })
        })
      }}>예약 신청</Text>
    </TouchableOpacity>
  </View>
  </>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,  
        alignSelf: 'flex-start',
        width: Dimensions.get('window').width
    },
    titleButton: {
        fontSize: 28,
        marginBottom: 20
    },
    nextButton: {
      marginTop: 20,
      marginBottom: 40,
      width: Dimensions.get('window').width - 100,
      height: 60,
      borderRadius: 10,
      fontSize: 30,
      backgroundColor: 'red',
      alignSelf: 'center',
      justifyContent:'center'
  },
  informationTable: {
    borderBottomWidth:0.4,
    borderColor:'grey',
    backgroundColor: 'white',
    width: '85%',
    height: 220,
    margin: 20,
    marginLeft: 30,
    borderRadius:20,
  }
  });

export default ReservationDetail;