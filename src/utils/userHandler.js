import { apiUrl } from "../config";


export const getUser = async (token) => {
  
    const url = `${apiUrl}/users`;
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
        }      }
      const data = await response.json();
      return data;

    } catch (error) {
      console.error( error);
      throw error;
    }
  };

  export const editUser = async (info,token) => {
      
         const file = {
          name: info.profilePhoto?.assets?.[0]?.fileName,
          type: info.profilePhoto?.assets?.[0]?.type,
          uri: info.profilePhoto?.assets?.[0]?.uri,
        }
        console.log(file);
   let formData = new FormData();
   formData.append('nickname',info.nickname);
   formData.append('phoneNumber',info.phoneNumber);
   formData.append('profilePhoto',file);

    const url = `${apiUrl}/users`;
    const headers = {
      'access_token': token,
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: headers,
        body:formData,
      });
      if (!response.ok) {
        if(response.status=='401'){
          throw new Error('로그인 필요합니다');
        }
        else{
          throw new Error(response.status);
        }
      }
    //   const data = await response.json().then((data)=>{console.log(data)});
    //   return data;
    return response;

    } catch (error) {
      console.error( error);
      throw error;
    }
  };

