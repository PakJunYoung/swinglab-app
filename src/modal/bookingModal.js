import React, {useEffect, useState} from 'react';
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {format} from 'date-fns';

import DateTimePicker from '@react-native-community/datetimepicker';
import TimePicker from '../timePicker';
import moment from 'moment';
import Btn from '../btn';
import {_book, _CallReturn} from '../Networking';
import {showToast} from './toastModal';
const BookingModal = props => {
  const [checked, setChecked] = useState('A');

  const [startDate, setStartDate] = useState(
    new Date(moment().add(1, 'h').format('YYYY-MM-DD HH:00')),
  );
  const [endDate, setEndDate] = useState(
    new Date(moment().add(2, 'h').format('YYYY-MM-DD HH:00')),
  );
  const [minDate] = useState(new Date(moment().format('YYYY-MM-DD 00:00')));

  const [show, setShow] = useState('0');

  let zoneId = checked == 'A' ? 1 : 2;

  let bookData = {
    start: format(startDate, 'yyyy-MM-dd HH:mm'),
    end: format(endDate, 'yyyy-MM-dd HH:mm'),
  };

  const optionFn = check => {
    setChecked(check);
    zoneId = check == 'A' ? 1 : 2;
  };

  const after1Hour = date => {
    setStartDate(date);
    if (new Date(endDate).getTime() - date.getTime() < 0) {
      const tDate = new Date(format(date, 'yyyy-MM-dd HH:mm'));
      tDate.setHours(tDate.getHours() + 1);
      setEndDate(tDate);

      bookData.end = format(tDate, 'yyyy-MM-dd HH:mm');
    }
  };

  const StartPicker = () => {
    if (show == '1') {
      return (
        <TimePicker
          val={startDate}
          minDate={minDate}
          setValue={date => {
            after1Hour(date);
            bookData.start = format(date, 'yyyy-MM-dd HH:mm');
          }}
        />
      );
    }
  };

  const EndPicker = () => {
    if (show == '2') {
      return (
        <TimePicker
          val={endDate}
          minDate={startDate}
          setValue={date => {
            setEndDate(date);
            bookData.end = format(date, 'yyyy-MM-dd HH:mm');
          }}
        />
      );
    }
  };

  const Networking = () => {
    _book(zoneId, bookData)
      .then(resp => {
        console.log('타석예약 결과' + resp.data.resultCode);
        if (_CallReturn(resp)) {
          props.setModalVisible();
          showToast('success', '성공', '예약 되었습니다.');

          let addData = resp.data.data;
          props.addData(addData);
        }
      })
      .catch(err => {
        console.log('타석예약 에러::', err);
      });
  };
  return (
    <View>
      <Modal
        visible={props.modalVisible}
        transparent={true}
        animationType="slide"
        modalDidClose={props.setModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 20,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={props.setModalVisible}
                style={{width: 40, alignSelf: 'center'}}>
                <Icon name="close-outline" size={40} />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#585858',
                  fontSize: 20,
                  alignSelf: 'center',
                }}>
                박준영
              </Text>

              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  marginRight: 10,
                }}
                onPress={() => Networking()}>
                <Text
                  style={{
                    fontSize: 22,
                    justifyContent: 'center',
                    color: 'black',
                  }}>
                  완료
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={styles.optionConainer}>
                <TouchableOpacity
                  style={[
                    styles.option,
                    {backgroundColor: checked == 'A' ? '#58D3F7' : '#E6E6E6'},
                  ]}
                  onPress={() => optionFn('A')}>
                  <Text>A</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.optionConainer}>
                <TouchableOpacity
                  style={[
                    styles.option,
                    {backgroundColor: checked == 'B' ? '#58D3F7' : '#E6E6E6'},
                  ]}
                  onPress={() => optionFn('B')}>
                  <Text>B</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{paddingHorizontal: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.txt}>시작 시간:</Text>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => (show != '1' ? setShow('1') : setShow('0'))}>
                  <Text
                    style={[
                      styles.txt_date,
                      {color: show == '1' ? '#58D3F7' : 'black'},
                    ]}>
                    {format(startDate, 'yyyy-MM-dd HH:mm')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginVertical: 5}}>{StartPicker()}</View>

              <View style={{flexDirection: 'row'}}>
                <Text style={styles.txt}>종료 시간:</Text>
                <TouchableOpacity
                  style={{flex: 1, alignContent: 'center'}}
                  onPress={() => (show != '2' ? setShow('2') : setShow('0'))}>
                  <Text
                    style={[
                      styles.txt_date,
                      {color: show == '2' ? '#58D3F7' : 'black'},
                    ]}>
                    {format(endDate, 'yyyy-MM-dd HH:mm')}
                  </Text>
                </TouchableOpacity>
              </View>

              {EndPicker()}
            </View>

            <View style={styles.contour}></View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  modalView: {
    // width:'100%',
    // height: '80%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 5,
    shadowColor: '#000',
    //그림자의 영역 지정
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 5,
    //불투명도 지정
    shadowOpacity: 0.25,
    //반경 지정
    shadowRadius: 3.84,
  },

  optionConainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },

  option: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#d8d8d8',
    borderWidth: 1,
    borderRadius: 10,
  },

  txt: {
    fontSize: 16,
    color: '#585858',
  },
  txt_date: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
  },
  picker: {},

  contour: {
    alignSelf: 'center',
    width: '85%',
    marginVertical: 10,
    borderWidth: 0.3,
    borderColor: '#d8d8d8',
  },
});

export default BookingModal;
