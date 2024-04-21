import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import customAlert from '../src/modal/customAlert';
import {IsLoginContext} from '../src/usr/login';
import moment from 'moment';

class MyPageScreen extends Component {
  static contextType = IsLoginContext;

  componentDidMount() {
    this.setState({
      signUpDate: moment(this.props.route.params.signUpDt).format('YYYY-MM-DD'),
      id: this.props.route.params.id,
      name: this.props.route.params.name,
      stDate: this.props.route.params.stDate,
      edDate: this.props.route.params.edDate,
      regDate: this.props.route.params.regDate,
    });
    this.props.route.params;
  }

  state = {
    signUpDate: '',
    id: '',
    name: '',
    stDate: '',
    edDate: '',
    regDate: '',
  };
  goUpdate = type => {
    this.props.navigation.navigate('updateInfo', {
      type: type,
    });
  };
  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View>
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 10,
              flexDirection: 'row',
            }}>
            <Text>가입일 : {this.state.signUpDate}</Text>
          </View>
          <View style={styles.mainView}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.txtHead}>사용자 정보</Text>
            </View>

            <View style={styles.txtContainer}>
              <Text style={styles.txtLabel}>아이디</Text>
              <Text style={styles.txtVal}>{this.state.id}</Text>
            </View>

            <View style={styles.contour}></View>

            <View style={styles.txtContainer}>
              <Text style={styles.txtLabel}>이름</Text>
              <Text style={styles.txtVal}>{this.state.name}</Text>
            </View>

            <View style={styles.contour}></View>

            <TouchableOpacity
              style={[styles.txtContainer, {justifyContent: 'space-between'}]}
              onPress={() => this.goUpdate('nickName')}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.txtLabel}>닉네임</Text>
                <Text style={styles.txtVal}>{this.context.nickName}</Text>
              </View>

              <Icon name="chevron-forward-outline" size={30} color="#A4A4A4" />
            </TouchableOpacity>

            <View style={styles.contour}></View>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onPress={() => this.goUpdate('password')}>
              <Text style={{fontSize: 18, color: 'black'}}>비밀번호 변경</Text>
              <Icon name="chevron-forward-outline" size={30} color="#A4A4A4" />
            </TouchableOpacity>
          </View>

          <View style={[styles.mainView, {marginTop: 20}]}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.txtHead}>이용권 정보</Text>
            </View>
            {this.state.stDate == null ? (
              <>
                <View
                  style={{
                    height: 70,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 18, color: 'black'}}>
                    이용권이 없습니다.
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View
                  style={[
                    styles.txtContainer,
                    {justifyContent: 'space-between', marginRight: 10},
                  ]}>
                  <Text style={styles.txtLabel}>등록일</Text>
                  <Text style={styles.txtVal}>{this.state.regDate}</Text>
                </View>

                <View style={styles.contour}></View>

                <View
                  style={[
                    styles.txtContainer,
                    {justifyContent: 'space-between', marginRight: 10},
                  ]}>
                  <Text style={styles.txtLabel}>시작일</Text>
                  <Text style={styles.txtVal}>{this.state.stDate}</Text>
                </View>

                <View style={styles.contour}></View>

                <View
                  style={[
                    styles.txtContainer,
                    {justifyContent: 'space-between', marginRight: 10},
                  ]}>
                  <Text style={styles.txtLabel}>만료일</Text>
                  <Text style={styles.txtVal}>{this.state.edDate}</Text>
                </View>
              </>
            )}
          </View>

          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                height: 40,
                width: 100,
                justifyContent: 'center',
              }}
              onPress={() => customAlert(this.context)}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: '600',
                  color: '#404040',
                }}>
                로그아웃
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* </View> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    // height: 100,
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,

    //아이폰 그림자
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    //반경 지정
    shadowRadius: 3.84,

    //안드로이드 그림자
    elevation: 3,
  },
  txtContainer: {
    height: 30,
    flexDirection: 'row',

    // backgroundColor: 'red',
  },
  txtLabel: {
    width: 50,
    alignSelf: 'center',
    fontSize: 15,
    color: '#A4A4A4',
    fontWeight: 'bold',
  },
  txtVal: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'black',
  },

  txtHead: {
    fontSize: 20,
    fontWeight: '600',
    color: '#00BFFF',
    marginVertical: 10,
  },
  contour: {
    alignSelf: 'center',
    width: '100%',
    // marginTop: 10,
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: '#d8d8d8',
  },
});

export default MyPageScreen;
