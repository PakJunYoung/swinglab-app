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
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import Btn from '../src/btn';
import {
  regexName,
  regexId,
  regexPwd,
  removeWhitespace,
} from '../src/utills/regex';
import base64 from 'react-native-base64';
import {_SignUp, _CallReturn} from '../src/Networking';
import {IsLoginContext} from '../src/usr/login';
import {showToast} from '../src/modal/toastModal';

class SignUpScreen extends Component {
  static contextType = IsLoginContext;

  state = {
    signUpData: {
      name: '',
      loginId: '',
      pwd: '',
      pwdChk: '',
    },
    nameCh: false,
    loginIdCh: false,
    pwdCh: false,
    pwdSameCh: false,
    nameStl: '#2E2E2E',
    idStl: '#2E2E2E',
    pwdStl: '#2E2E2E',
    pwdChStl: '#2E2E2E',
  };

  btnAbled = false;
  setData = (key, val) => {
    const changedData = removeWhitespace(val);

    this.setState(prevState => ({
      ...prevState,
      signUpData: {
        ...prevState.signUpData,
        [key]: changedData,
      },
    }));

    switch (key) {
      case 'name':
        if (regexName(changedData)) {
          this.setState({nameStl: '#04B404'});
          this.setState({nameCh: true});
        } else {
          this.setState({nameStl: 'red'});
          this.setState({nameCh: false});
        }
        break;
      case 'loginId':
        if (regexId(changedData)) {
          this.setState({idStl: '#04B404'});
          this.setState({loginIdCh: true});
        } else {
          this.setState({idStl: 'red'});
          this.setState({loginIdCh: false});
        }
        break;
      case 'pwd':
        this.inputPwdCh.clear();
        this.setState({pwdChStl: '#2E2E2E'});
        this.setState({pwdSameCh: false});
        if (regexPwd(changedData)) {
          this.setState({pwdStl: '#04B404'});
          this.setState({pwdCh: true});

          this.setState(prevState => ({
            ...prevState,
            signUpData: {
              ...prevState.signUpData,
              pwd: base64.encode(changedData),
            },
          }));
        } else {
          this.setState({pwdStl: 'red'});
          this.setState({pwdCh: false});
        }
        break;
      case 'pwdChk':
        if (base64.encode(changedData) == this.state.signUpData.pwd) {
          this.setState({pwdChStl: '#04B404'});
          this.setState({pwdSameCh: true});
          this.setState(prevState => ({
            ...prevState,
            signUpData: {
              ...prevState.signUpData,
              pwdChk: base64.encode(changedData),
            },
          }));
        } else {
          this.setState({pwdChStl: 'red'});
          this.setState({pwdSameCh: false});
        }
        break;
    }
    // this.signUpData.key;
  };

  networking = async () => {
    console.log('1. get : ', this.btnAbled); // get : true or false

    try {
      console.log('2. START : ', this.btnAbled); // START : false

      if (!this.state.nameCh) {
        console.log('이름이 잘못됨');
        this.inputName.focus();
        this.inputName.clear();
        this.setState({nameStl: '#2E2E2E'});
      } else if (!this.state.loginIdCh) {
        console.log('아이디가 잘못됨');
        this.inputId.focus();
        this.inputId.clear();
        this.setState({idStl: '#2E2E2E'});
      } else if (!this.state.pwdCh) {
        console.log('비번이 잘못됨');
        this.inputPwd.focus();
        this.inputPwd.clear();
        this.setState({pwdStl: '#2E2E2E'});
      } else if (!this.state.pwdSameCh) {
        console.log('비번쳌이 잘못됨');
        this.inputPwdCh.focus();
        this.inputPwdCh.clear();
        this.setState({pwdChStl: '#2E2E2E'});
      } else {
        console.log('회원가입 다통과');
        this.context.setLoadingState(true);
        await _SignUp(this.state.signUpData)
          .then(resp => {
            console.log('회원가입 결과' + resp);

            if (_CallReturn(resp)) {
              showToast('success', '성공', '정상적으로 회원가입이 되었습니다.');
              this.props.navigation.goBack();
            }
          })
          .catch(err => {
            console.log('회원가입 에러::', err);
          });
        this.context.setLoadingState(false);
      }

      console.log('4. END : ', this.btnAbled); // END : true
    } catch (err) {
      console.log('회원가입 에러', err);
    }
  };

  render() {
    return (
      <SafeAreaView>
        {/* <View style={styles.mainView}> */}
        <KeyboardAvoidingView style={styles.mainView} behavior="padding">
          <TextInput
            style={[styles.input, {borderColor: this.state.nameStl}]}
            maxLength={5}
            ref={i => {
              this.inputName = i;
            }}
            autoCapitalize="none"
            placeholder="이름"
            onChangeText={txt => this.setData('name', txt)}
          />
          <Text style={{color: this.state.nameStl}}>*한글</Text>
          <TextInput
            style={[styles.input, {borderColor: this.state.idStl}]}
            maxLength={20}
            ref={i => {
              this.inputId = i;
            }}
            autoCapitalize="none"
            placeholder="아이디"
            onChangeText={txt => this.setData('loginId', txt)}
          />
          <Text style={{color: this.state.idStl}}>*영문/숫자 4~20자리</Text>
          <TextInput
            style={[styles.input, {borderColor: this.state.pwdStl}]}
            secureTextEntry
            ref={i => {
              this.inputPwd = i;
            }}
            maxLength={20}
            autoCapitalize="none"
            placeholder="비밀번호"
            onChangeText={txt => this.setData('pwd', txt)}
          />
          <Text style={{color: this.state.pwdStl}}>
            *최소4자~최대20자, 특수문자:!,@만 허용{' '}
          </Text>
          <TextInput
            style={[styles.input, {borderColor: this.state.pwdChStl}]}
            ref={i => {
              this.inputPwdCh = i;
            }}
            secureTextEntry
            maxLength={20}
            autoCapitalize="none"
            placeholder="비밀번호 확인"
            onChangeText={txt => this.setData('pwdChk', txt)}
          />
          <Text style={{color: this.state.pwdChStl}}>
            *{this.state.pwdSameCh ? '일치' : '불일치'}
          </Text>

          <Btn
            title="회원가입"
            option={this.btnAbled}
            pressOption={this.networking}
          />
        </KeyboardAvoidingView>
        {/* </View> */}
      </SafeAreaView>
    );
  }
}

// {
//   "loginId":"yjkim",
//   "name":"김예지",
//   "nickNm" : "마당이도다",
//   "pwd":"YXNkZg==",
//   "pwdChk":"YXNkZg=="
// }

const styles = StyleSheet.create({
  mainView: {
    paddingTop: 20,
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
});

export default SignUpScreen;
