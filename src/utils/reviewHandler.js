import moment from "moment";
import { apiUrl } from "../config";



export const saveReview = async (review, token) => {

    function dateToTimestamp(date) {
        const formattedDate = moment(date).format('MM/DD/YYYY, hh:mm A');
        const parsedDate = new Date(formattedDate);
        const newDate = parsedDate.toISOString().replace('T', ' ').split('.')[0];
        return newDate;
    }

    const formData = new FormData();
    const date = new Date();

    formData.append('storeId', review.storeId);
    formData.append('detail', review.detail);
    formData.append('writingTime', dateToTimestamp(date));
    formData.append('rating', parseInt(review.rating));
    console.log(formData);

    const url = `${apiUrl}/reviews`;
    const headers = {
        'access_token': token,
        "Content-Type": "multipart/form-data"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: formData, // FormData를 요청 본문으로 사용
        });

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

export const getReviews = async (token) => {
  
    const url = `${apiUrl}/reviews`;
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

  export const getReviewsByStoreId = async (storeId,token) => {
  
    const url = `${apiUrl}/reviews/${storeId}`;
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