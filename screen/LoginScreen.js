/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import Btn from '../src/btn';
import {removeWhitespace} from '../src/utills/regex';
import base64 from 'react-native-base64';

import {_LogIn, _CallReturn} from '../src/Networking';
import {IsLoginContext, setToken} from '../src/usr/login';
import LoadingModal from '../src/modal/loadingModal';

class LoginScreen extends Component {
  static contextType = IsLoginContext;
  state = {
    modalVisible: false,
    loginData: {
      loginId: '',
      pwd: '',
    },
  };
  btnAbled = false;

  goSignUpScreen() {
    this.props.navigation.navigate('SignUpScreen');
  }

  setData = (key, val) => {
    // _SignUp(key + ' ' + val)
    const changedData = removeWhitespace(val);

    switch (key) {
      case 'loginId':
        this.setState(prevState => ({
          ...prevState,
          loginData: {
            ...prevState.loginData,
            loginId: changedData,
          },
        }));
        break;
      case 'pwd':
        this.setState(prevState => ({
          ...prevState,
          loginData: {
            ...prevState.loginData,
            pwd: base64.encode(changedData),
          },
        }));
        break;
    }
  };

  networking = async () => {
    // this.setState({modalVisible: true});
    this.context.setLoadingState(true);
    await _LogIn(this.state.loginData)
      .then(resp => {
        console.log('로그인 결과' + resp.data.resultCode);
        if (_CallReturn(resp)) {
          setToken(resp.data.data.accessToken, resp.data.data.refreshToken);
          this.context.setIsLogin(true);
        }
      })
      .catch(err => {
        console.log('로그인 에러::', err);
      });
    this.context.setLoadingState(false);
  };

  render() {
    return (
      <SafeAreaView>
        <View style={styles.mainView}>
          <TextInput
            style={styles.input}
            maxLength={20}
            ref={i => {
              this.inputId = i;
            }}
            autoCapitalize="none"
            placeholder="아이디"
            onChangeText={txt => this.setData('loginId', txt)}
          />

          <TextInput
            style={styles.input}
            secureTextEntry
            ref={i => {
              this.inputPwd = i;
            }}
            maxLength={20}
            autoCapitalize="none"
            placeholder="비밀번호"
            onChangeText={txt => this.setData('pwd', txt)}
          />

          <Btn title="로그인" pressOption={this.networking} />

          <TouchableOpacity
            onPress={() => this.goSignUpScreen()}
            style={styles.signBtn}>
            <Text>회원가입</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    // width : '100%',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  input: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '100%',
    height: 50,
    padding: 5,
    fontSize: 22,
    borderColor: '#2E2E2E',
    borderWidth: 1,
  },
  signBtn: {
    marginTop: 10,
    width: '100%',
    alignItems: 'flex-end',
  },
});

export default LoginScreen;
