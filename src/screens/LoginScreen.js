import React, { useState } from 'react';
import { Image, Text, TextInput, Alert, Button, View, StyleSheet, TouchableOpacity,Linking } from 'react-native';
import NaverLogin, { NaverLoginResponse, GetProfileResponse } from '@react-native-seoul/naver-login';
import  * as KakaoLogin from '@react-native-seoul/kakao-login';
import { apiUrl } from '../config';
import { storeData,removeData,getData } from '../utils/asyncStorageService';

const consumerKey = 'x51vRYca8cKf7z7nyHKH';
const consumerSecret = '957js3o85L';
const appName = 'MobilePos';
const serviceUrlScheme = 'yourappurlscheme';

const LoginScreen = ({navigation}) => {
  const [success, setSuccessResponse] = useState();
  const [failure, setFailureResponse] = useState();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loginerror, setLoginError] = useState('');

  const handleLogin = async () => {
    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    try {
      const response = await fetch(`${apiUrl}/auth`, {
        method: 'POST',
        body: formData, 
      });

      if (response.ok) {
        console.log('로그인 성공');
        setEmail('');
        setPassword('');
        setLoginError('');
        const token = response.headers.map.access_token;
        storeData('hknuToken',token);
        navigation.navigate('stackList');
      } else {
        setLoginError('다시 시도해 주세요');
        const errorData = await response.json(); 
        console.error('로그인 실패:', `${errorData.message}`);
      }
    } catch (error) {
      console.error('기타 오류:', error);
    }

    console.log('email:', email); 
    console.log('password:', password);
};

  const Naverlogin = async () => {
    const { failureResponse, successResponse } = await NaverLogin.login({
      appName,
      consumerKey,
      consumerSecret,
      serviceUrlScheme,
    });
    setSuccessResponse(successResponse);
    setFailureResponse(failureResponse);

    console.log("Naver Login Success", JSON.stringify(successResponse));
  };

  const Naverlogout = async () => {
    try {
      await NaverLogin.logout();
      setSuccessResponse(undefined);
      setFailureResponse(undefined);
      setGetProfileRes(undefined);
    } catch (e) {
      console.error(e);
    }
  };

  const NaverdeleteToken = async () => {
    try {
      await NaverLogin.deleteToken();
      setSuccessResponse(undefined);
      setFailureResponse(undefined);
      setGetProfileRes(undefined);
    } catch (e) {
      console.error(e);
    }
  };

  const kakaologin = () => {
    KakaoLogin.login().then((result) => {
        console.log("Kakao Login Success", JSON.stringify(result));
    }).catch((error) => {
        if (error.code === 'E_CANCELLED_OPERATION') {
            console.log("Login Cancel", error.message);
        } else {
            console.log(`Login Fail(code:${error.code})`, error.message);
        }
    });
  };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>로그인</Text>

        <View style={{marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
          <TextInput style={styles.input} 
                  placeholder='이메일'
                  placeholderTextColor='grey'
                  value={email}
                  onChangeText={text => setEmail(text)}>
          </TextInput>
          <TextInput style={styles.input} 
                  placeholder='비밀번호'
                  placeholderTextColor='grey'
                  secureTextEntry
                  value={password}
                  onChangeText={text => setPassword(text)}>
          </TextInput>
          <View>
            <Text style={{ color: 'red' }}>{loginerror}</Text>
          </View>
        </View>
        

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>로그인</Text>
          </TouchableOpacity>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('stackFindID')}>
              <Text style={styles.findtext}>아이디 찾기</Text>
            </TouchableOpacity>
            <Text style={{color:'black'}}>  |  </Text>
            <TouchableOpacity onPress={() => navigation.navigate('stackFindPassword')}>
              <Text style={styles.findtext}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </Text>
        </View>

          <TouchableOpacity onPress={Naverlogin}>
            <Image style={styles.socialButton} source={require('../assets/naverlogin.png')}></Image>
          </TouchableOpacity>

          <TouchableOpacity onPress={kakaologin}>
            <Image style={styles.socialButton} source={require('../assets/kakaologin.png')}></Image>
          </TouchableOpacity>

      </View>
    );
};

const FindIDScreen = () => {
  const [message, setMessage] = useState('');

  const handlePress = () => {
    setMessage('이메일로 아이디를 보냅니다\n확인해주세요.');
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>아이디 찾기</Text>

        <View style={{marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
          <TextInput style={styles.input} 
                  placeholder='이름(Name)'
                  placeholderTextColor='grey'>
          </TextInput>
          <TextInput style={styles.input} 
                  placeholder='이메일(E-mail)'
                  placeholderTextColor='grey'>
          </TextInput>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>입력</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>

      </View>
  );
};

const FindPasswordScreen = () => {
  const [message, setMessage] = useState('');

  const handlePress = () => {
    setMessage('이메일로 비밀번호를 변경할 수 있는 링크를 보냅니다.\n확인해주세요.');
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>비밀번호 찾기</Text>

        <View style={{marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
          <TextInput style={styles.input} 
                  placeholder='이름(Name)'
                  placeholderTextColor='grey'>
          </TextInput>
          <TextInput style={styles.input} 
                  placeholder='아이디(ID)'
                  placeholderTextColor='grey'>
          </TextInput>
          <TextInput style={styles.input} 
                  placeholder='이메일(E-mail)'
                  placeholderTextColor='grey'>
          </TextInput>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>입력</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 35,
    marginTop: 20,
    marginBottom: 50,
    marginLeft: 40,
    color: 'black'
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
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
  findtext: {
    marginTop: 20,
    color: 'black'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1c8adb',
    borderRadius: 8,
    width: '40%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialButton: {
    borderRadius: 8,
    width: '50%',
    height: 48,
    marginTop: 30,
    marginLeft: 105
  },
  messageContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center'
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export { LoginScreen, FindIDScreen, FindPasswordScreen };