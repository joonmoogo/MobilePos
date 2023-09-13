import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, KeyboardAvoidingView } from 'react-native';
import CheckBox from 'expo-checkbox';
import { checkEmail, checkNickName, checkPhoneNumber } from '../controllers/CheckController.ts'
import { ScrollView } from 'react-native-gesture-handler';

const apiUrl = 'http://192.168.0.21:8080';

const SignupScreen1 = ({navigation}) => {
    const [isCheckedList, setIsCheckedList] = useState([false, false, false, false, false]);

    const handleCheck = (index) => {
      const newList = [...isCheckedList];
      newList[index] = !isCheckedList[index];
      setIsCheckedList(newList);
  
      // 전체 동의 체크박스가 체크되어 있을 경우, 모든 체크박스를 체크하도록 처리
      if (index === 0 && newList[index]) {
          setIsCheckedList(newList.map(() => true)); // 모든 체크박스를 체크
      }
      // 전체 동의 체크박스가 체크되어 있지 않을 경우, 모든 체크박스를 해제하도록 처리
      if (index === 0 && !newList[index]) {
          setIsCheckedList(newList.map(() => false)); // 모든 체크박스를 해제
      }
  };

    const isNextButtonEnabled = isCheckedList[1] && isCheckedList[2];

    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>회원가입</Text>

        <Text style={{flexDirection: 'row', marginLeft: 40, marginBottom: 20}}>
            <CheckBox style={styles.checkBox} 
                  value={isCheckedList[0]}
                  onValueChange={() => handleCheck(0)} />
            <Text style={styles.mainText}>  전체 동의</Text>
        </Text>

        <View>
        <Text style={{flexDirection: 'row', marginLeft: 60, marginBottom: 20}}>
            <CheckBox style={styles.checkBox} 
                  value={isCheckedList[1]}
                  onValueChange={() => handleCheck(1)} />
            <TouchableOpacity onPress={toggleModal}><Text style={StyleSheet.flatten([styles.mainText])}>  이용약관 동의(필수)</Text></TouchableOpacity>
        </Text>
        <Modal visible={modalVisible}
               animationType="slide"
               onRequestClose={() => {
                setModalVisible(false);
               }}
               transparent={true}>
            <View style={styles.modal}>
            <Text style={styles.modalText}>MobilePos 이용약관 동의{'\n'}{'\n'}이 앱의 사용자는 이용약관에 동의해야 앱을 사용하실 수 있습니다....</Text>
            <TouchableOpacity style={styles.modalButton}
                              onPress={() => {
                                setModalVisible(false);
                              }}>
            <Text style={styles.buttonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
        </View>

        <Text style={{flexDirection: 'row', marginLeft: 60, marginBottom: 20}}>
            <CheckBox style={styles.checkBox} 
                  value={isCheckedList[2]}
                  onValueChange={() => handleCheck(2)} />
            <Text style={styles.mainText}>  전자금융거래 이용약관 동의(필수)</Text>
        </Text>

        <Text style={{flexDirection: 'row', marginLeft: 60, marginBottom: 20}}>
            <CheckBox style={styles.checkBox} 
                  value={isCheckedList[3]}
                  onValueChange={() => handleCheck(3)} />
            <Text style={styles.mainText}>  개인정보 수집 이용 동의(선택)</Text>
        </Text>

        <Text style={{flexDirection: 'row', marginLeft: 60, marginBottom: 20}}>
            <CheckBox style={styles.checkBox} 
                  value={isCheckedList[4]}
                  onValueChange={() => handleCheck(4)} />
            <Text style={styles.mainText}>  마케팅 수신 동의(선택)</Text>
        </Text>
        
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { opacity: isNextButtonEnabled ? 1 : 0.5 }]}
          onPress={() => {
            if (isNextButtonEnabled) {
              navigation.navigate('stackSignup2');
            }
          }}
          disabled={!isNextButtonEnabled}
        >
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
  }

const SignupScreen2 = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
    
  const handleSignup = async () => {
    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('nickname', nickname);
    formData.append('phoneNumber', phoneNumber);
    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        body: formData,
      });
    
      if (response.ok) {
        console.log('회원가입 성공');
        navigation.navigate('stackSignup3');
      } else {
        const errorData = await response.json(); 
        console.error('회원가입 실패: ', `${errorData.message}`);
      }
    } catch (error) {
      console.error('기타 오류:', error);
    }
    console.log('nickname:', nickname);
    console.log('email:', email); 
    console.log('password:', password);
    console.log('phoneNumber:', phoneNumber); 
  };

  const [nicknameCheck, setNicknameCheck] = useState('');

  const handleNickNameCheck = async () => {
    if (nickname.trim() === '') { // 닉네임이 공백인 경우
      setNicknameCheck('닉네임을 입력해주세요.');
      return;
    }

    let formData = new FormData();
    formData.append('nickname', nickname);
    
    try {
      const response = await fetch(`${apiUrl}/check/nickname`, {
        method: 'POST',
        body: formData,
      });
      console.log('response:', response);
  
      if (response.ok) {
        const resultJSON = await response.json(); // JSON 데이터로 변환
        const result = resultJSON === 'false' ? false : resultJSON; // 문자열 'false'를 불리언 false로 변환

        if (result === false) {
          setNicknameCheck('이미 사용 중인 닉네임입니다.');
        } else {
          setNicknameCheck('사용 가능한 닉네임입니다.');
        }
      } else {
        setNicknameCheck('중복 확인 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('중복 확인 중 오류:', error);
  setNicknameCheck(`중복 확인 중 오류가 발생했습니다. 오류 메시지: ${error.message}`);
    }
  };

  const [emailCheck, setEmailCheck] = useState('');

  const handleEmailCheck = async () => {
    if (email.trim() === '') { // 이메일이 공백인 경우
      setEmailCheck('이메일을 입력해주세요.');
      return;
    }

    let formData = new FormData();
    formData.append('email', email);
    
    try {
      const response = await fetch(`${apiUrl}/check/email`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const resultJSON = await response.json(); // JSON 데이터로 변환
        const result = resultJSON === 'false' ? false : resultJSON; // 문자열 'false'를 불리언 false로 변환
  
        if (result === false) {
          setEmailCheck('이미 사용 중인 이메일입니다.');
        } else {
          setEmailCheck('사용 가능한 이메일입니다.');
        }
      } else {
        setEmailCheck('중복 확인 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setEmailCheck('중복 확인 중 오류가 발생했습니다.');
    }
  };

  const [phoneNumberCheck, setPhoneNumberCheck] = useState('');

  const handlePhoneNumberCheck = async () => {
    if (phoneNumber.trim() === '') { // 휴대폰 번호가 공백인 경우
      setPhoneNumberCheck('휴대폰 번호를 입력해주세요.');
      return;
    }

    let formData = new FormData();
    formData.append('phoneNumber', phoneNumber);
    
    try {
      const response = await fetch(`${apiUrl}/check/phone-number`, {
        method: 'POST',
        body: formData,
      });
      console.log('response:', response);
  
      if (response.ok) {
        const resultJSON = await response.json(); // JSON 데이터로 변환
        const result = resultJSON === 'false' ? false : resultJSON; // 문자열 'false'를 불리언 false로 변환
  
        if (result === false) {
          setPhoneNumberCheck('이미 사용 중인 휴대폰 번호입니다.');
        } else {
          setPhoneNumberCheck('사용 가능한 휴대폰 번호입니다.');
        }
      } else {
        setPhoneNumberCheck('중복 확인 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setPhoneNumberCheck('중복 확인 중 오류가 발생했습니다.');
    }
  };

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordMatchMessage, setPasswordMatchMessage] = useState('');

  const handlePasswordCheck = () => {
    if (password === passwordConfirm) {
      setPasswordMatchMessage('비밀번호가 일치합니다.');
    } else {
      setPasswordMatchMessage('비밀번호가 일치하지 않습니다.');
    }
  };

  const isFormValid = (
    nicknameCheck === '사용 가능한 닉네임입니다.' &&
    passwordMatchMessage === '비밀번호가 일치합니다.' &&
    emailCheck === '사용 가능한 이메일입니다.' &&
    phoneNumberCheck === '사용 가능한 휴대폰 번호입니다.'
  );
  
    return (
      <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>회원가입</Text>
        
        <View style={{marginLeft: 40}}>
          <View style={{flexDirection:'row'}}>
            <TextInput 
              style={styles.input} 
              placeholder='닉네임(Nickname)'
              placeholderTextColor='grey'
              value={nickname}
              onChangeText={text => setNickname(text)}>
            </TextInput>
            <TouchableOpacity style={styles.smallbutton} onPress={handleNickNameCheck}>
              <Text style={styles.smallbuttonText}>중복확인</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ color : 'grey', fontSize: 10}}>영문, 숫자 5-11자 사이만 가능합니다.</Text>
          </View>
          <View>
            <Text style={{ color: 'red' }}>{nicknameCheck}</Text>
          </View>

          <View style={{flexDirection:'row'}}>
          <TextInput style={styles.input} 
                  placeholder='이메일(E-mail)'
                  placeholderTextColor='grey'
                  value={email}
                  onChangeText={text => setEmail(text)}>
          </TextInput>
          <TouchableOpacity style={styles.smallbutton} onPress={handleEmailCheck}>
              <Text style={styles.smallbuttonText}>중복확인</Text>
          </TouchableOpacity>
          </View>
          <View>
            <Text style={{ color: 'red' }}>{emailCheck}</Text>
          </View>

          <TextInput style={styles.input} 
                  placeholder='비밀번호(Password)'
                  placeholderTextColor='grey'
                  secureTextEntry
                  value={password}
                  onChangeText={text => setPassword(text)}>
          </TextInput>
          <View>
            <Text style={{ color : 'grey', fontSize: 10}}>숫자, 영문, 특수문자 조합 최소 8자로 설정하세요.</Text>
          </View>

          <View style={{flexDirection:'row'}}>
          <TextInput style={styles.input} 
                  placeholder='비밀번호 재입력(Password Confirm)'
                  placeholderTextColor='grey'
                  secureTextEntry
                  value={passwordConfirm}
                  onChangeText={text => setPasswordConfirm(text)}>
          </TextInput>
          <TouchableOpacity style={styles.smallbutton} onPress={handlePasswordCheck}>
              <Text style={styles.smallbuttonText}>확인</Text>
          </TouchableOpacity>
          </View>
          <View>
            <Text style={{ color: 'red' }}>{passwordMatchMessage}</Text>
          </View>

          <View style={{flexDirection:'row'}}>
            <TextInput style={styles.input} 
                  placeholder='휴대폰(Phone)'
                  placeholderTextColor='grey'
                  value={phoneNumber}
                  onChangeText={text => setPhoneNumber(text)}>
            </TextInput>
            <TouchableOpacity style={styles.smallbutton} onPress={handlePhoneNumberCheck}>
              <Text style={styles.smallbuttonText}>중복확인</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ color : 'grey', fontSize: 10}}>숫자만 입력해 주세요.</Text>
          </View>
          <View>
            <Text style={{ color: 'red' }}>{phoneNumberCheck}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: isFormValid ? '#1c8adb' : 'grey' }]} onPress={handleSignup} disabled={!isFormValid}>
                <Text style={styles.buttonText}>가입 완료</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
    </KeyboardAvoidingView>
    );
  }

const SignupScreen3 = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>회원가입</Text>
            <View style={{marginTop: 80, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20, color: 'black'}}>회원가입을 축하합니다!{'\n'}  바로 로그인 해보세요!</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.reset({routes: [{name: 'stackLogin'}]})}>
                    <Text style={styles.buttonText}>로그인</Text>
                </TouchableOpacity>
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
    width: 230,
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
  checkBox: {
    marginRight: 20,
  },
  mainText: {
    color: 'black'
  },
  buttonContainer: {
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
  smallbutton: {
    backgroundColor: '#1c8adb',
    borderRadius: 8,
    width: '25%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 10
  },
  smallbutton2: {
    backgroundColor: '#1c8adb',
    borderRadius: 8,
    width: '10%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 10
  },
  smallbuttonText: {
    color: '#fff',
    fontSize: 14,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
    fontSize: 18,
    color: 'black'
  },
  modalButton: {
    backgroundColor: '#1c8adb',
    borderRadius: 8,
    width: '40%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  messageContainer: {
    marginTop: 0,
    marginBottom: 10,
  },
  message: {
    fontSize: 10,
    color: 'grey',
  },
  validTime: {
    padding: 25
  }
});

export {SignupScreen1, SignupScreen2, SignupScreen3};