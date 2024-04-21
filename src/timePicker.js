import React, {useState} from 'react';
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; //IOS
import DatePicker from 'react-native-date-picker'; // Android
import moment from 'moment';
import {format} from 'date-fns';

const TimePicker = ({val, minDate, setValue}) => {
  console.log('TimePicker :::: ' + val);
  return Platform.OS === 'ios' ? (
    <>
      <View style={styles.contour}></View>
      <DateTimePicker
        mode="datetime"
        display="spinner"
        value={val}
        minimumDate={minDate}
        maximumDate={new Date(moment().add(6, 'd'))}
        minuteInterval={15}
        onChange={(_, date) => setValue(date)}
      />
      <View style={styles.contour}></View>
    </>
  ) : (
    <>
      {/* <DateTimePicker
        mode="date"
        value={test}
        minimumDate={today}
        maximumDate={new Date(moment().add(6, 'd'))}
        onChange={(_, date) => setValue(date)}
      /> */}
      <View style={styles.contour}></View>
      <DatePicker
        androidVariant="nativeAndroid"
        date={val}
        minimumDate={minDate}
        maximumDate={new Date(moment().add(6, 'd'))}
        minuteInterval={15}
        onDateChange={date => setValue(date)}
      />
      <View style={styles.contour}></View>
    </>
  );
};

const styles = StyleSheet.create({
  contour: {
    alignSelf: 'center',
    width: '100%',
    marginVertical: 10,
    borderWidth: 0.3,
    borderColor: '#d8d8d8',
  },
});

export default TimePicker;
