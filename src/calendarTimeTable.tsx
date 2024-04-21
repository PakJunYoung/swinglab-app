import React, {useState, useRef, useEffect} from 'react';
import moment from 'moment';
import {Alert, StyleSheet} from 'react-native';
import {
  TimelineCalendar,
  TimelineCalendarHandle,
  EventItem,
  PackedEvent,
} from '@howljs/calendar-kit';

import {useIsLoggedIn} from '../src/usr/login';
import {_CallReturn, _cancelBook} from './Networking';

import {showToast} from './modal/toastModal';
const CalendarTimeTable = ({
  selectDay,
  setPosi,
  data,
  today,
  onChange,
  onRemove,
}: any) => {
  const [rerender, setReRender] = useState('');
  let bookingItem: EventItem[] = data == '' ? [] : data;
  bookingItem.forEach(item => {
    item.id = item.bookId;
  });
  console.log('데이터 받음', bookingItem);
  const calendarRef = useRef<TimelineCalendarHandle>(null);
  useEffect(() => {
    const optionalProps = {
      date: today,
      hourScroll: true,
      animatedHour: true,
      animatedDate: false,
    };
    calendarRef.current?.goToDate(optionalProps);
  }, []);

  useEffect(() => {
    console.log('리랜더링부분 실행');

    calendarRef.current?.forceUpdateNowIndicator();
  }, [rerender]);

  useEffect(() => {
    const optionalProps = {
      date: selectDay,
      hourScroll: true,
      animatedHour: true,
      animatedDate: false,
    };
    calendarRef.current?.goToDate(optionalProps);
  }, [selectDay]);

  useEffect(() => {
    const optionalProps = {
      date: setPosi,
      hourScroll: true,
      animatedHour: true,
      animatedDate: false,
    };
    calendarRef.current?.goToDate(optionalProps);
  }, [setPosi]);
  //A타석 #FF8000 B타석 #04B404
  const isLoggedIn = useIsLoggedIn();

  const exampleEvents: EventItem[] = [
    {
      id: 1,
      bookId: '4',
      userId: '54',
      title: 'B',
      nickNm: '닉넴닉넴',

      start: '2023-06-16 14:00',
      end: '2023-06-16 15:00',
    },
  ];

  const myBookCh = (data: any) => {
    if (isLoggedIn.userId == data.userId) {
      Alert.alert('예약취소', '선택한 예약을 취소하시겠습니까?', [
        {
          text: '아니요',
          onPress: () => console.log('아니요'),
          style: 'cancel',
        },
        {
          text: '예',
          onPress: () => {
            _cancelBook(data.bookId)
              .then(resp => {
                console.log('예약 취소 결과', resp.data.resultCode);
                if (_CallReturn(resp)) {
                  showToast('success', '성공', '예약이 취소되었습니다.');
                  // bookingItem = resp.data.data;
                  onRemove(data.bookId);
                }
              })
              .catch(err => {
                console.log('예약 취소 에러::', err);
              });
          },
        },
      ]);
      // customAlert('book', data);
    }
  };

  return (
    <TimelineCalendar
      viewMode="day"
      events={bookingItem}
      ref={calendarRef}
      isShowHeader={false}
      scrollToNow={true}
      onLongPressEvent={data => {
        myBookCh(data);
      }}
      overlapEventsSpacing={0}
      onChange={props => {
        onChange(new Date(props.date));
      }}
    />
  );
};

export default CalendarTimeTable;
