/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

import WeekCalendar from '../src/weekCalendar';
import CalendarTimeTable from '../src/calendarTimeTable';
import Btn from '../src/btn';
import {format} from 'date-fns';
import BookingModal from '../src/modal/bookingModal';
import moment from 'moment';
import {_getBookingList, _CallReturn} from '../src/Networking';
// calendarRef = useRef<TimelineCalendarHandle>(null);

class BookingScreen extends Component {
  state = {
    modalVisible: false,
    date: new Date(moment().format()),
    slcDate: '',
    data: '',
    setPosi: '',
  };
  getData = async () => {
    await _getBookingList()
      .then(resp => {
        console.log('예약조회 결과::', resp.data.resultCode);
        if (_CallReturn(resp)) {
          respData = resp.data.data;

          this.setState({data: respData});
        }
      })
      .catch(err => {
        console.log('예약조회 에러::', err);
      });
  };

  addData = addData => {
    this.setState({setPosi: addData.start});
    this.setState({data: [...this.state.data, addData]});
  };
  componentDidMount() {
    this.getData();
  }

  onRemove = id => {
    console.log('삭제 진행');
    this.setState({data: this.state.data.filter(item => item.bookId !== id)});
  };

  render() {
    console.log('오늘날짜' + this.state.date);
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.mainView}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
              marginBottom: 5,
            }}>
            날짜 및 시간 선택
          </Text>
          <Text style={{fontSize: 15, color: 'grey'}}>
            타석 예약은 일주일 내만 가능합니다.
          </Text>
        </View>

        <WeekCalendar
          selectDay={this.state.date}
          onChange={newDate => this.setState({date: newDate, slcDate: newDate})}
        />
        <View style={{flex: 1}}>
          <CalendarTimeTable
            selectDay={this.state.slcDate}
            setPosi={this.state.setPosi}
            data={this.state.data}
            today={format(this.state.date, 'yyyy-MM-dd')}
            onChange={date => this.setState({date: date})}
            onRemove={bookId => this.onRemove(bookId)}
          />
        </View>

        <View style={{marginHorizontal: 10, marginBottom: 10}}>
          <Btn
            title="예약하기"
            pressOption={() => this.setState({modalVisible: true})}
          />
        </View>

        <View>
          <BookingModal
            addData={date => {
              this.addData(date);
            }}
            modalVisible={this.state.modalVisible}
            setModalVisible={() => this.setState({modalVisible: false})}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    padding: 10,
  },
});

export default BookingScreen;
