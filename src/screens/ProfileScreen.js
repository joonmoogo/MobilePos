import React, { useState } from 'react';
import { ScrollView, TextInput, Text, Image, StyleSheet, TouchableOpacity, View, Modal, Dimensions } from 'react-native';
import { Switch } from "@react-native-material/core";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import SMSVerification, { sendVerificationCode, verifyCode } from '../components/SMSVerification';
import { useEffect } from 'react';
import { editUser, getUser } from '../utils/userHandler';
import { getData } from '../utils/asyncStorageService';
import { apiUrl,clientApiUrl } from '../config';


const ProfileScreen = () => {
  const [img, setImageSource] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const defaultImg = 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg';
  const [checked, setChecked] = useState(true);
  const [checked1, setChecked1] = useState(true);
  const [info,setInfo] = useState();
  const [token,setToken] = useState();
  const [imageInfo,setImageInfo]= useState();


  useEffect(()=>{
    
    getData('hknuToken').then((token)=>{
      setToken(token);
      getUser(token).then((data)=>{
        console.log(data);
        setInfo(data);
      })
    })
    // getUser()
  },[])
  function openGallery() {
    const options = {
      mediaType: 'photo',
      quality: 0.7,
      includeBase64: true,
    };

    launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setImageSource(response.assets[0].uri);
        console.log(response.assets[0].uri);
        console.log(response);
        const infos = {
          nickname:info?.nickname,
          phoneNumber:info?.phoneNumber,
          profilePhoto:response,
        }
        console.log(infos);
        editUser(infos,token).then((data)=>{
          console.log(data);
        })
      }
      setModalVisible(false);
      
    });
    
  };

  function openCamera() {
    const options = {
      mediaType: 'photo',
      quality: 0.7,
      includeBase64: true,
    };

    launchCamera(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setImageSource(response.assets[0].uri);
      }
    });
  };

  function returnDefault() {
    setImageSource(defaultImg);
    setModalVisible(false);
  }

  function openModal() {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.profileImage} onPress={openModal}>
            <Image source={{ uri: img || `${clientApiUrl }/serverImage/${info?.profilePhoto}` }} style={styles.profileImage} />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalInnerContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={openCamera}>
                <Text style={styles.modalButtonText}>카메라</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={openGallery}>
                <Text style={styles.modalButtonText}>이미지 선택</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={returnDefault}>
                <Text style={styles.modalButtonText}>기본 이미지로 변경</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
          </Modal>
        </View>

        <View style={styles.container}>
          <TextInput style={styles.nameInput}
                  placeholder='kwn01081'
                  value={info?.nickname}
                  placeholderTextColor='grey'></TextInput>
        </View>
      
        <View style={{flexDirection: 'row', marginBottom:15}}>
          <Text style={{color: 'black', marginTop:10, marginRight:20}}>이메일</Text>
          <TextInput style={styles.input}
          placeholder='kwn01081@gmail.com'
          value={info?.email}
          placeholderTextColor='grey'></TextInput>
        </View>

        <View style={{flexDirection: 'row', marginBottom:15}}>
          <Text style={{color: 'black', marginTop:10, marginRight:20}}>현재 비밀번호</Text>
          <TextInput style={styles.input}
          placeholder='!password123'
          
          placeholderTextColor='grey'
          secureTextEntry></TextInput>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'black', marginTop:10, marginRight:20}}>변경 비밀번호</Text>
          <TextInput style={styles.input}></TextInput>
        </View>

        <View>
          <TouchableOpacity style={styles.smallbutton}>
            <Text style={styles.smallbuttonText}>변경</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', marginTop:15}}>
          <Text style={{color: 'black', marginTop:10, marginRight:20}}>휴대폰         </Text>
          <TextInput style={styles.input}
          placeholder=''
          value={info?.phoneNumber}
          placeholderTextColor='grey'></TextInput>
        </View>

        <View>
          <TouchableOpacity style={styles.smallbutton}>
            <Text style={styles.smallbuttonText}>재인증</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', marginTop:15,marginBottom:20}}>
          <Text style={{color: 'black', marginTop:10, marginRight:20}}>등록 카드      </Text>
          <TextInput style={styles.input}></TextInput>
        </View>

        <View style={{flexDirection: 'row', marginLeft:180, marginBottom:10}}>
          <Text style={{color: 'black', marginRight:20}}>푸시 알림</Text>
          <Switch value={checked} onValueChange={() => setChecked(!checked)} />
        </View>

        <View style={{flexDirection: 'row', marginLeft:180}}>
          <Text style={{color: 'black', marginRight:20}}>진동        </Text>
          <Switch value={checked1} onValueChange={() => setChecked1(!checked1)} />
        </View>

        <View style={{flexDirection: 'row', marginTop:40, marginLeft:170, marginBottom:70}}>
          <TouchableOpacity style={{marginRight: 30}}>
            <Text style={{color:'black', textDecorationLine:'underline'}}>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{color:'black', textDecorationLine:'underline'}}>회원탈퇴</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  profileImage: {
    marginTop: 20,
    marginBottom: 40,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  modalInnerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    height: '35%'
  },
  modalButton: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'black', 
  },
  nameInput: {
    width: Dimensions.get('window').width - 250,
    height: 44,
    padding: 10,
    marginBottom: 30,
    backgroundColor: '#e6e5e5',
    color:'black'
  },
  input: {
    width: Dimensions.get('window').width - 200,
    height: 44,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#e6e5e5'
  },
  inputext: {
    marginTop: 80,
    width: 200,
    height: 100,
    padding: 10,
    fontSize: 40,
    textAlign:'left',
    marginBottom: 70,
  },
  smallbutton: {
    backgroundColor: '#1c8adb',
    borderRadius: 8,
    width: 60,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 230,
    marginBottom: 10
  },
  smallbuttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ProfileScreen;