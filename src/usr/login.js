import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';

// get
export const getStorage = async key => {
  const result = await AsyncStorage.getItem(key);
  console.log('get하는곳', result);
  if (result == null) {
    return false;
  }
  //   return result && JSON.parse(result);
  return result;
};

// set
export const setToken = async (accessT, refreshT) => {
  try {
    // await AsyncStorage.setItem(key, JSON.stringify(value));

    await AsyncStorage.multiSet([
      ['accessToken', accessT],
      ['refreshToken', refreshT],
    ]);
  } catch (err) {
    console.error('setToken ERR: ', err);
  }
};

// remove
export const removeToken = async () => {
  try {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
  } catch (err) {
    console.error('removeToken ERR: ', err);
  }
};

// const accessT = getStorage('accessToken');
// const refreshT = getStorage('refreshToken');

export const IsLoginContext = createContext();

export function IsLoginProvider({children}) {
  const [isLogin, setIsLogin] = useState(undefined);
  const [userId, setUserId] = useState(undefined);
  const [nickName, setNickName] = useState(undefined);
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    getStorage('accessToken').then(v => {
      setIsLogin(v != false);
    });
  }, []);

  return (
    <IsLoginContext.Provider
      value={{
        isLogin,
        setIsLogin,
        userId,
        setUserId,
        nickName,
        setNickName,
        loadingState,
        setLoadingState,
      }}>
      {children}
    </IsLoginContext.Provider>
  );
}
export const useIsLoggedIn = () => useContext(IsLoginContext);
