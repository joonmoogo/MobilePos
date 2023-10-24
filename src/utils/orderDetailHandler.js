import { apiUrl } from "../config";

export const saveOrderDetail = async (orderDetail, token) => {
    const formData = new FormData();
    console.log(orderDetail);
    formData.append('orderId', orderDetail.orderId);
    formData.append('menuId', orderDetail.menuId);
    formData.append('amount', orderDetail.amount);
    console.log(formData);
  
    const url = `${apiUrl}/orders/details`;
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