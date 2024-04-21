import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
//A타석 #FF8000 B타석 #04B404

const HistoryItem = ({item}) => {
  const zoneColor = item.zoneId == '1' ? '#FF8000' : '#04B404';

  let labelColor = '';
  let label = item.statusNm;

  switch (item.status) {
    case 'USE': //이용
      labelColor = '#32CD32';
      break;

    case 'CANCEL': //취소
      labelColor = 'red';
      break;

    case 'WAITTING': //대기
      labelColor = '#A9A9A9';
      break;
  }

  // const

  //대기 #A9A9A9, 취소 red, 완료 #32CD32
  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <View
          style={{
            borderRadius: 10,
            flexDirection: 'row',
            height: '100%',
            overflow: 'hidden',
          }}>
          <View
            style={{
              width: 10,
              backgroundColor: labelColor,
              height: '100%',
            }}></View>
          <View style={styles.dataContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{color: labelColor, fontSize: 16}}>{label}</Text>
              </View>
              <View>
                <Text
                  style={{
                    color: zoneColor,
                    fontWeight: '500',
                    marginRight: 5,
                    fontSize: 16,
                  }}>
                  {item.zoneId == '1' ? 'A' : 'B'}
                </Text>
              </View>
            </View>
            <View>
              <Text>{item.start + ' ~ '}</Text>
              <Text>{item.end}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  mainView: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    // overflow: 'hidden',

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
  dataContainer: {
    flex: 1,
    padding: 5,
  },
});

export default HistoryItem;
