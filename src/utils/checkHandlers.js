  import { apiUrl } from '../config.js';
  import axios from 'axios';
  
  // 닉네임 중복 확인
  export const handleNickNameCheck = async (nickname, setNicknameCheck) => {
    if (nickname.trim() === '') {
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
  
      if (response.ok) {
        const result = await response.json();
  
        if (result === true) {
          setNicknameCheck('이미 사용 중인 닉네임입니다.');
        } else {
          setNicknameCheck('사용 가능한 닉네임입니다.');
        }
      } else {
        setNicknameCheck('중복 확인 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setNicknameCheck(`중복 확인 중 오류가 발생했습니다. 오류 메시지: ${error.message}`);
    }
  };
  
  // 이메일 중복 확인
  export const handleEmailCheck = async (email, setEmailCheck) => {
    if (email.trim() === '') {
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
        const result = await response.json();
  
        if (result === true) {
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

  // 휴대폰 번호 중복 확인
  export const handlePhoneNumberCheck = async (phoneNumber, setPhoneNumberCheck) => {
    if (phoneNumber.trim() === '') {
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
  
      if (response.ok) {
        const result = await response.json();
  
        if (result === true) {
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

  // 비밀번호 재확인
  export const handlePasswordCheck = (password, passwordConfirm, setPasswordMatchMessage) => {
    if (password === passwordConfirm) {
      setPasswordMatchMessage('비밀번호가 일치합니다.');
    } else {
      setPasswordMatchMessage('비밀번호가 일치하지 않습니다.');
    }
  };