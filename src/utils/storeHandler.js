import { apiUrl } from "../config";
import { getData } from "./asyncStorageService";


// latitude : 위도
// longitude : 경도
// distance : 현재 좌표와 비교해서 검색할 최대 거리
// token : hknuToken 

export const getStoreByCoordinate = async (latitude, longitude, distance, token) => {
  
    const url = `${apiUrl}/stores?latitude=${latitude}&longitude=${longitude}&distance=${distance}`;
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
      console.log(data);

      return data;

    } catch (error) {
      console.error( error);
      throw error;
    }
  };

  export const getStoreById = async (storeId,token) => {
  
    const url = `${apiUrl}/stores/${storeId}`;
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

