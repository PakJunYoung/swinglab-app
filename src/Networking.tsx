import Axios from 'axios';
import {showToast} from './modal/toastModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ADDRESS = 'http://13.125.190.65:8080/common/v1/';

Axios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async error => {
    console.log('인터셉터 에러2', error.response.data);
    const {
      config,
      response: {status},
    } = error;
    if (status === 401) {
      console.log('인터셉터 에러3', error.response.data);

      if (error.response.data.title === 'Unauthorized') {
        showToast('error', '실패', error.response.data.errorMessage);
      }
      if (error.response.data.title === 'TokenExpiredError') {
        const originalRequest = config;
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        // token refresh 요청
        const {data} = await Axios.post(
          ADDRESS + 'auth/login/refresh', // token refresh api
          {
            refreshToken,
          },
        );
        // 새로운 토큰 저장
        console.log('리프레시 갱신', data);
        const {accessToken: newAccessToken, refreshToken: newRefreshToken} =
          data.data;
        await AsyncStorage.multiSet([
          ['accessToken', newAccessToken],
          ['refreshToken', newRefreshToken],
        ]);
        Axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return Axios(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);

export const _CallReturn = (resp: any) => {
  console.log('받은데이터', resp.data);
  switch (resp.data.resultCode) {
    case 'S':
      return true;
    case 'F':
      showToast('error', '실패', resp.data.errorMessage);
      return false;
  }
  return false;
};

export const _SignUp = async (data: any) => {
  return await Axios.post(ADDRESS + 'auth/signup', data);
};

export const _LogIn = async (data: any) => {
  return await Axios.post(ADDRESS + 'auth/login', data);
};

export const _getMainPage = async () => {
  return await Axios.get(ADDRESS + 'main');
};

export const _book = async (zone: any, data: any) => {
  return await Axios.post(ADDRESS + 'zone/' + zone + '/book', data);
};

export const _changeNickNm = async (data: any) => {
  return await Axios.put(ADDRESS + 'my/info/nickname', data);
};

export const _changePwd = async (data: any) => {
  return await Axios.put(ADDRESS + 'my/info/pwd', data);
};

export const _logout = async () => {
  return await Axios.post(ADDRESS + 'auth/logout');
};

export const _cancelBook = async (data: any) => {
  return await Axios.put(ADDRESS + 'book/' + data + '/cancel');
};

// =================== 완료

export const _getBookingList = async () => {
  return await Axios.get(ADDRESS + 'booking/list');
};

export const _getHistory = async () => {
  return await Axios.get(ADDRESS + 'my/usage/history');
};
