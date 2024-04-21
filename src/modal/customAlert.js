import {Alert} from 'react-native';
import {_CallReturn, _logout, _cancelBook} from '../Networking';
import {IsLoginContext, useIsLoggedIn, removeToken} from '../usr/login';
import {showToast} from './toastModal';

const CustomAlert = data => {
  return Alert.alert('로그아웃', '정말로 로그아웃을 하시겠습니까?', [
    {
      text: '아니요',
      onPress: () => console.log('아니요'),
      style: 'cancel',
    },
    {
      text: '예',
      onPress: () => logout(data),
    },
  ]);
};

const logout = context => {
  _logout()
    .then(resp => {
      console.log('로그아웃 결과', resp.data.resultCode);

      if (_CallReturn(resp)) {
        context.setIsLogin(false);
        removeToken();
      }
    })
    .catch(err => {
      console.log('로그아웃 에러::', err);
    });
};

export default CustomAlert;
