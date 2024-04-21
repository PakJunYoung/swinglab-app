import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Btn from '../src/btn';
import {_changeNickNm, _CallReturn, _changePwd} from '../src/Networking';
import {regexPwd, regexNickNm, removeWhitespace} from '../src/utills/regex';
import {useIsLoggedIn, IsLoginContext} from '../src/usr/login';
import base64 from 'react-native-base64';
import {showToast} from '../src/modal/toastModal';

const UpdateInfoScreen = ({navigation, route}) => {
  const [networkingNickNm, setNickNm] = useState({nickNm: ''});
  const [nickNmStl, setNickNmStl] = useState('#2E2E2E');
  const [nickNmCh, setNickNmCh] = useState(false);

  const [networkingPwd, setPwd] = useState({
    crntPwd: '',
    pwd: '',
    pwdChk: '',
  });
  const [pwdStl, setPwdStl] = useState('#2E2E2E');
  const [pwdCh, setPwdCh] = useState(false);
  const [pwdSameChStl, setPwdSameChStl] = useState('#2E2E2E');
  const [pwdSameCh, setPwdSameCh] = useState(false);

  const myContext = useIsLoggedIn();

  const setData = (key, val) => {
    const changedData = removeWhitespace(val);

    switch (key) {
      case 'nickNm':
        if (regexNickNm(changedData)) {
          setNickNm({nickNm: changedData});
          setNickNmStl('#04B404');
          setNickNmCh(true);
        } else {
          setNickNmStl('red');
          setNickNmCh(false);
        }
        break;
      case 'crntPwd':
        setPwd({
          ...networkingPwd,
          crntPwd: base64.encode(changedData),
        });
        break;
      case 'pwd':
        setPwd({
          ...networkingPwd,
          pwd: changedData,
        });
        inputPwdCh.clear();
        setPwdSameChStl('#2E2E2E');
        if (regexPwd(changedData)) {
          setPwdStl('#04B404');
          setPwdCh(true);
          setPwd({
            ...networkingPwd,
            pwd: base64.encode(changedData),
          });
        } else {
          setPwdStl('red');
          setPwdCh(false);
        }
        break;
      case 'pwdChk':
        if (base64.encode(changedData) == networkingPwd.pwd) {
          setPwdSameChStl('#04B404');
          setPwd({
            ...networkingPwd,
            pwdChk: base64.encode(changedData),
          });
          setPwdSameCh(true);
        } else {
          setPwdSameChStl('red');
          setPwdSameCh(false);
        }
        break;
    }
  };

  const networking = async type => {
    switch (type) {
      case 'nickNm':
        if (btnAbled) return;
        if (!nickNmCh) return;

        myContext.setLoadingState(true);
        await _changeNickNm(networkingNickNm)
          .then(resp => {
            console.log('정보변경 결과', resp.data.resultCode);

            if (_CallReturn(resp)) {
              navigation.goBack();
              myContext.setNickName(networkingNickNm.nickNm);
            }
          })
          .catch(err => {
            console.log('정보변경 에러::', err);
          });
        myContext.setLoadingState(false);

        break;
      case 'pwd':
        if (!pwdCh) {
          inputPwd.focus();
          inputPwd.clear();
        } else if (!pwdSameCh) {
          inputPwdCh.focus();
          inputPwdCh.clear();
        } else {
          myContext.setLoadingState(true);

          await _changePwd(networkingPwd)
            .then(resp => {
              console.log('비밀번호 변경  결과', resp.data.resultCode);
              if (_CallReturn(resp)) {
                navigation.goBack();
                showToast('success', '성공', '비밀번호를 변경하였습니다.');
              }
            })
            .catch(err => {
              console.log('비밀번호 변경 에러::', err);
            });
          myContext.setLoadingState(false);
        }
        break;
    }
  };
  let btnAbled = false;
  if (route.params.type == 'nickName') {
    return (
      <View style={styles.mainView}>
        <Text style={styles.txtHead}>닉네임</Text>
        <TextInput
          style={[styles.input, {borderColor: nickNmStl}]}
          maxLength={8}
          autoCapitalize="none"
          placeholder={myContext.nickName}
          onChangeText={txt => setData('nickNm', txt)}
        />
        <Text style={{color: nickNmStl}}>*앱 내의 활동명</Text>
        <Btn
          title="저장하기"
          option={btnAbled}
          pressOption={() => networking('nickNm')}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.mainView}>
        <Text style={styles.txtHead}>비밀번호 변경</Text>

        <TextInput
          style={styles.input}
          secureTextEntry
          maxLength={20}
          autoCapitalize="none"
          placeholder="현재 비밀번호"
          onChangeText={txt => setData('crntPwd', txt)}
        />

        <Text style={styles.txtHead}>새 비밀번호</Text>

        <TextInput
          style={[styles.input, {borderColor: pwdStl}]}
          secureTextEntry
          maxLength={20}
          ref={i => {
            inputPwd = i;
          }}
          autoCapitalize="none"
          placeholder="비밀번호"
          onChangeText={txt => setData('pwd', txt)}
        />
        <Text style={{color: pwdStl}}>
          *최소4자~최대20자, 특수문자:!,@만 허용
        </Text>

        <TextInput
          style={[styles.input, {borderColor: pwdSameChStl}]}
          secureTextEntry
          maxLength={20}
          ref={i => {
            inputPwdCh = i;
          }}
          autoCapitalize="none"
          placeholder="비밀번호 확인"
          onChangeText={txt => setData('pwdChk', txt)}
        />
        <Text style={{color: pwdSameChStl}}>
          *{pwdSameCh ? '일치' : '불일치'}
        </Text>

        <Btn
          title="변경하기"
          option={btnAbled}
          pressOption={() => networking('pwd')}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: 50,
  },
  txtHead: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
    marginTop: 20,
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

export default UpdateInfoScreen;
