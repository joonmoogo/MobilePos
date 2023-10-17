import { apiUrl } from "../config";

export const saveReservation = async (orderInfo, token) => {
  const formData = new FormData();

  console.log(orderInfo);

  formData.append('storeId', orderInfo.storeId);
  formData.append('tableId', orderInfo.tableId);
  formData.append('reservationTime', orderInfo.reservationTime);
  formData.append('orderCode', orderInfo.orderCode);

  console.log(formData);

  const url = `${apiUrl}/reservations`;
  const headers = {
    'access_token': token,
    "Content-Type" : "multipart/form-data"
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: formData, // FormData를 요청 본문으로 사용
    });

    // const data = await response.json().then((data)=>{
    //   console.log(data);
    // });

    if (!response.ok) {
      console.log(response);
      const errorData = await response.text(); // 에러 응답의 내용을 텍스트로 읽어옴
      const errorMessage = `HTTP 상태 코드: ${response.status}, 내용: ${errorData}`;
      throw new Error(errorMessage);
    }

    console.log('okok');
    return response;
  } catch (error) {
    console.log(error)
    throw error;
  }
};



export const getReservationsByStoreId = async (storeId,token) => {
  
  const url = `${apiUrl}/reservations/${storeId}`;
  const headers = {
    'access_token': token,
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });
    if (!response.ok) {
      if(response.status=='401'){
        throw new Error('로그인 필요합니다');
      }
      else{
        throw new Error(response.status);
      }
    }
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error( error);
    throw error;
  }
};

export const getReservations = async (token) => {
  
  const url = `${apiUrl}/reservations`;
  const headers = {
    'access_token': token,
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });
    if (!response.ok) {
      if(response.status=='401'){
        throw new Error('로그인 필요합니다');
      }
      else{
        throw new Error(response.status);
      }
    }
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error( error);
    throw error;
  }
};

export const getOrderByStoreId = async (storeId,token) => {
  
  const url = `${apiUrl}/orders/${storeId}`;
  const headers = {
    'access_token': token,
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });
    if (!response.ok) {
      if(response.status=='401'){
        throw new Error('로그인 필요합니다');
      }
      else{
        throw new Error(response.status);
      }
    }
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error( error);
    throw error;
  }
};
export const getOrder = async (token) => {
  
  const url = `${apiUrl}/orders`;
  const headers = {
    'access_token': token,
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });
    if (!response.ok) {
      if(response.status=='401'){
        throw new Error('로그인 필요합니다');
      }
      else{
        throw new Error(response.status);
      }
    }
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error( error);
    throw error;
  }
};