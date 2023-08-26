import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  access_token: null,
  refresh_token: null,
  nickname: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      //처음 로그인
      state.isLoggedIn = true;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    },
    setNickname: (state, action) => {
      // 닉네임만 업데이트하는 액션
      state.nickname = action.payload;
    },
    logout: () => initialState, // 이 부분을 추가합니다.
  },
});

export const {login, logout, setNickname} = userSlice.actions;
export default userSlice.reducer;
