import apiUrl from '../config.js';

// 이메일 인증 요청 확인
export const handleEmailAuthorization = async (token, setEmailAuthorization) => {
    let formData = new FormData();
    formData.append('token', token);
    try {
      const response = await fetch(`${apiUrl}/auth/email`, {
        method: 'POST',
        body: formData, 
    });
  
    if (response.status === 200) {
        setEmailAuthorization(true);
    } else {
        setEmailAuthorization(false);
      }
    } catch (error) {
      console.error(error);
      setEmailAuthorization(false);
    }
};