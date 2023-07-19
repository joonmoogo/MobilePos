import { createStore } from 'redux';

// 초기 상태 정의
const initialState = {
  isLogged: false,
};

// 리듀서 함수
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLogged: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLogged: false,
      };
    default:
      return state;
  }
};

// Redux 스토어 생성
const store = createStore(reducer);

export default store;