import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import QrModal from '../src/modal/qrModal';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../assets/images/logo.png';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IsLoginContext} from '../src/usr/login';
import {_getMainPage, _CallReturn} from '../src/Networking';

const Stack = createNativeStackNavigator();

class MainScreen extends Component {
  static contextType = IsLoginContext;

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: '',
      headerLeft: () => <Image source={Logo} style={styles.headerLeft} />,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.goMyPageScreen()}
          style={styles.headerRight}>
          <Icon name="person-outline" size={35} />
        </TouchableOpacity>
      ),
    });
    this.NetWorking();
  }
  NetWorking = () => {
    _getMainPage()
      .then(resp => {
        // console.log('메인GET 결과', resp.data.resultCode);

        if (_CallReturn(resp)) {
          const respData = resp.data.data;
          console.log('메인 데이터:', resp.data);
          if (respData.ticket == null) {
            this.setState({
              userId: respData.user.userId,
              svcCh: false,
              myInfo: {
                signUpDt: respData.user.signupDt,
                id: respData.user.loginId,
                name: respData.user.name,
              },
            });
          } else {
            this.setState({
              userId: respData.user.userId,
              svcCh: true,
              myInfo: {
                signUpDt: respData.user.signupDt,
                id: respData.user.loginId,
                name: respData.user.name,
                stDate: respData.ticket.svcStDay,
                edDate: respData.ticket.svcEdDay,
                regDate: respData.ticket.svcRegDay,
              },
            });
          }

          if (respData.bookHist == null) {
            this.setState({
              // ...this.state,
              bookCh: false,
            });
          } else {
            this.setState({
              // ...this.state,
              bookCh: true,
              bookHist: {
                bookId: respData.bookHist.bookId,
                stDate: respData.bookHist.start,
                edDate: respData.bookHist.end,
              },
            });
          }
          this.context.setUserId(respData.user.userId);
          this.context.setNickName(respData.user.nickNm);
        }
      })
      .catch(err => {
        console.log('메인GET 에러::', err);
      });
    this.setState({svcCh: true});
  };

  onRefresh = () => {
    this.setState({refreshing: true});
    this.NetWorking();
    this.setState({refreshing: false});
  };

  state = {
    refreshing: false,
    modalVisible: false,
    svcCh: false,
    bookCh: false,
    userId: '',
    myInfo: {
      signUpDt: '',
      id: '',
      name: '',
      nickNm: '',
      stDate: '',
      edDate: '',
      regDate: '',
    },

    bookHist: {
      bookId: '',
      stDate: '',
      edDate: '',
    },
  };

  goMyPageScreen = () => {
    this.props.navigation.navigate('MyPageScreen', this.state.myInfo);
  };

  goBookingScreen = () => {
    this.props.navigation.navigate('BookingScreen');
  };

  goHistory = () => {
    this.props.navigation.navigate('HistoryScreen');
  };
  render() {
    return (
      <SafeAreaView style={{height: '100%'}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={{height: '100%'}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }>
          <View style={styles.mainView}>
            <View style={styles.infoView}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text
                    style={{color: '#6e6e6e', fontSize: 16, fontWeight: '500'}}>
                    타석 이용권
                  </Text>
                </View>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: 'black',
                    }}>
                    {this.context.nickName}
                  </Text>
                  <Text style={{fontSize: 15, color: 'black'}}> 님</Text>
                </View>
              </View>
              <View style={{alignContent: 'space-between'}}>
                {this.state.svcCh ? (
                  <>
                    <View
                      style={{
                        height: '100%',
                        justifyContent: 'space-between',
                        paddingBottom: 15,
                      }}>
                      <Text
                        style={{
                          marginTop: 5,
                          color: 'black',
                          fontSize: 18,
                          fontWeight: '500',
                        }}>
                        [이용권] {this.state.myInfo.stDate} ~{' '}
                        {this.state.myInfo.edDate}
                      </Text>
                      <Text style={{fontSize: 15}}>
                        등록일 : {this.state.myInfo.regDate}
                      </Text>
                    </View>
                  </>
                ) : (
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
                )}
              </View>
            </View>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <TouchableOpacity
                style={styles.goToBookingScreen}
                onPress={() => this.goBookingScreen()}>
                <Text style={styles.txtBookingScreen}>타석 예약</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginLeft: 10}}
                onPress={() => this.setState({modalVisible: true})}>
                <Icon name="qr-code-outline" color="black" size={50}></Icon>
              </TouchableOpacity>
            </View>

            <View style={styles.bookingView}>
              <Text style={styles.txtBookingView}>예약 현황</Text>

              <Text style={{alignSelf: 'flex-end', marginRight: 30}}>
                {this.state.bookCh
                  ? this.state.bookHist.stDate +
                    ' ~ ' +
                    this.state.bookHist.edDate
                  : '예약현황이 없습니다.'}
              </Text>

              <View style={styles.contour}></View>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => this.goHistory()}>
                <Text
                  style={{
                    ...styles.txtBookingView,
                    alignSelf: 'center',
                    flex: 1,
                  }}>
                  이용 내역
                </Text>

                <Icon
                  name="chevron-forward-outline"
                  size={30}
                  color="#A4A4A4"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.bookingView}>
              <Text>켜는법</Text>
            </View>
            <View>
              <QrModal
                userId={this.state.userId}
                bookId={this.state.bookHist.bookId}
                modalVisible={this.state.modalVisible}
                setModalVisible={() => this.setState({modalVisible: false})}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerLeft: {
    width: 100,
    height: 40,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  headerRight: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    marginHorizontal: 10,
  },
  infoView: {
    height: 100,
    padding: 10,
    marginTop: 20,
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

  goToBookingScreen: {
    flex: 2,
    height: 50,
    alignItems: 'center',

    justifyContent: 'center',
    backgroundColor: '#58D3F7',
    borderRadius: 5,
    //아이폰 그림자
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    //반경 지정
    shadowRadius: 3.84,

    //안드로이드 그림자
    elevation: 5,
  },

  txtBookingScreen: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  bookingView: {
    padding: 10,
    marginTop: 20,
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

  txtBookingView: {
    fontSize: 15,
    color: '#A4A4A4',
    fontWeight: 'bold',
  },

  contour: {
    alignSelf: 'center',
    width: '90%',
    marginVertical: 10,
    borderWidth: 0.3,
    borderColor: '#d8d8d8',
  },
});

export default MainScreen;
