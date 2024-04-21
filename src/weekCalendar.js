import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {addDays, format, getDate, isSameDay, startOfWeek} from 'date-fns';
import {ko} from 'date-fns/locale';
const today = new Date();

const WeekCalendar = ({selectDay, onChange}) => {
  const [week, setWeek] = useState([]);

  useEffect(() => {
    console.log('오늘날짜', today);
    const weekDays = getWeekDays(today);
    setWeek(weekDays);
  }, [today]);

  const getWeekDays = today => {
    const start = today;
    const final = [];

    for (let i = 0; i < 7; i++) {
      const today = addDays(start, i);
      final.push({
        formatted: format(today, 'EEE', {locale: ko}),
        today,
        day: getDate(today),
      });
    }
    return final;
  };

  return (
    <View style={styles.container}>
      {week.map(weekDay => {
        const textStyle = [styles.label];
        const touchable = [styles.touchable];

        const sameDay = isSameDay(weekDay.today, selectDay);
        if (sameDay) {
          textStyle.push(styles.selectedLabel);
          touchable.push(styles.selectedTouchable);
        }
        return (
          <View key={weekDay.formatted}>
            <Text style={styles.weekdayText}>{weekDay.formatted}</Text>

            <TouchableOpacity
              style={touchable}
              onPress={() => onChange(weekDay.today)}>
              <Text style={textStyle}>{weekDay.day}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
      {console.log('끝======================')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '',
  },
  weekdayText: {
    textAlign: 'center',
    marginBottom: 5,
    color: 'gray',
  },
  label: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  selectedLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  touchable: {
    padding: 7.5,
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  selectedTouchable: {
    backgroundColor: '#58D3F7',
  },
});

export default WeekCalendar;
