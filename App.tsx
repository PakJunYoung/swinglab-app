/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component, createContext, useContext} from 'react';
import {Text} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import SignUpScreen from './screen/SignUpScreen';
import LoginScreen from './screen/LoginScreen';

import MainScreen from './screen/MainScreen';
import BookingScreen from './screen/BookingScreen';
import MyPageScreen from './screen/MyPageScreen';
import HistoryScreen from './screen/HistoryScreen';
import UpdateInfoScreen from './screen/updateInfoScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Toast from 'react-native-toast-message';
import LoadingModal from './src/modal/loadingModal';
import {useIsLoggedIn, IsLoginContext, IsLoginProvider} from './src/usr/login';

const Stack = createNativeStackNavigator();

const MyStackNavigator = () => {
  const isLoggedIn = useIsLoggedIn();
  console.log('앱단에서', isLoggedIn.isLogin);

  // return <Text>{`${isLoggedIn}`}</Text>;
  return (
    <>
      <LoadingModal
        modalVisible={isLoggedIn.loadingState}
        setModalVisible={() => isLoggedIn.setLoadingState(false)}
      />

      <Stack.Navigator>
        {isLoggedIn.isLogin ? (
          <>
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen
              name="BookingScreen"
              component={BookingScreen}
              options={{title: '타석 예약'}}
            />
            <Stack.Screen
              name="MyPageScreen"
              component={MyPageScreen}
              options={{title: '내정보'}}
            />
            <Stack.Screen
              name="HistoryScreen"
              component={HistoryScreen}
              options={{title: '이용 내역'}}
            />
            <Stack.Screen
              name="updateInfo"
              component={UpdateInfoScreen}
              options={{title: '정보 수정'}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{title: '회원가입'}}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

class App extends Component {
  componentDidMount(): void {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
      console.log('실행됐어요');
    }, 1500);
  }

  // toastConfig = {
  //   success: (props: any) => (
  //     <BaseToast {...props} style={{backgroundColor: 'green'}} />
  //   ),
  //   error: (props: any) => (
  //     <ErrorToast
  //       {...props}
  //       text1Style={{
  //         fontSize: 18,
  //       }}
  //       text2Style={{
  //         fontSize: 20,
  //       }}
  //     />
  //   ),
  //   // test: (props: any) => (
  //   //   <View style={{height: 50, backgroundColor: 'yellow'}}>
  //   //     <Text>안녕하세요</Text>
  //   //   </View>
  //   // ),
  // };
  render() {
    // getStorage('isLogin').then(data => {
    //   console.log('앱에서 로긴값1', data);
    //   this.setState({isLogin: data});
    // });
    return (
      <>
        <NavigationContainer>
          <IsLoginProvider>
            <MyStackNavigator />
          </IsLoginProvider>
        </NavigationContainer>
        <Toast />
      </>
    );
  }
}
export default App;
