import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const SMSVerification = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
  
    const sendVerificationCode = async () => {
      try {
        const response = await axios.post('https://api-sens.ncloud.com/v1/sms/services/{ncp:sms:kr:311908653852:mobilepos}/messages', {
          to: phoneNumber,
          content: 'Your verification code is 123456', // 실제 인증 코드를 여기에 넣어주세요.
        }, {
          headers: {
            'Content-Type': 'application/json',
            'X-NCP-auth-key': 'ZsfGh4OdyveKEWTpN9Gi',
            'X-NCP-service-secret': 'ONlMbbShVbnDIF8k1Wuc1sVH2Jm1t9bYtR4KXixn',
          },
        });
  
        console.log('Verification code sent:', response.data);
        Alert.alert('Verification code sent!');
      } catch (error) {
        console.error('Error sending verification code:', error);
        Alert.alert('Error sending verification code!');
      }
    };
  
    const verifyCode = () => {
      if (verificationCode === '123456') { // 실제 인증 코드와 일치 여부를 확인하는 로직을 여기에 구현해주세요.
        Alert.alert('Verification successful!');
      } else {
        Alert.alert('Verification failed!');
      }
    };
};

export default SMSVerification;
