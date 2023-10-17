import { apiUrl } from "../config";



export const serverConnect = async (targetSSEId,eventTargetId,token) => {
    // const formData = new FormData();
    
    // formData.append('targetSSEId',targetSSEId);
    // formData.append('sseEvent','SERVER_CONNECT');
    // formData.append('eventTargetId',eventTargetId);

    const data = {
        targetSSEId:targetSSEId,
        sseEvent:'SERVER_CONNECT',
        eventTargetId:eventTargetId
    }

    const url = `${apiUrl}/notifications`;
    const headers = {
      'access_token': token,
      'Content-Type': 'application/json'
    };
    console.log('trying connect')
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data), // FormData를 요청 본문으로 사용
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