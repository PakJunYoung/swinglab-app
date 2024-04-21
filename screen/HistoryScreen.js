import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';

import {FlashList} from '@shopify/flash-list';
import HistoryItem from '../src/historyItem';
import {_CallReturn, _getHistory} from '../src/Networking';

class HistoryScreen extends Component {
  state = {
    data: '',
  };
  DATA = [
    {
      id: '123',
      title: 'First Item',
      start: '2023-06-21 16:00',
      end: '2023-06-21 17:00',
      zoneId: '1',
      statusNm: '대기',
      status: 'BOOK',
    },
    {
      id: '124',
      title: 'second Item',
      start: '2023-06-18 19:00',
      end: '2023-06-18 20:00',
      zoneId: '2',
      statusNm: '완료',
      status: 'FINISH',
    },
    {
      id: '124',
      title: 'second Item',
      start: '2023-06-17 19:00',
      end: '2023-06-17 20:00',
      zoneId: '2',
      statusNm: '취소',
      status: 'CANCEL',
    },
  ];
  componentDidMount() {
    _getHistory().then(resp => {
      console.log('이용내역 조회 결과::', resp.data.resultCode);
      if (_CallReturn(resp)) {
        this.setState({data: resp.data.data});
      }
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <FlashList
          data={this.state.data}
          renderItem={({item}) => <HistoryItem item={item} />}
          estimatedItemSize={150}
        />
      </SafeAreaView>
    );
  }
}

export default HistoryScreen;
