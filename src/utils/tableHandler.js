import { apiUrl } from "../config";

export const getTableById = async (storeId,token) => {
  
    const url = `${apiUrl}/tables/${storeId}`;
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
