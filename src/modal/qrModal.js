/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
// import Modal from 'react-native-simple-modal';
import QRCode from 'react-native-qrcode-svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Btn from '../btn';

const QrModal = props => {
  return (
    <View>
      <Modal
        visible={props.modalVisible}
        transparent={true}
        animationType="fade"
        modalDidClose={props.setModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            {props.bookId == '' ? (
              <View
                style={{
                  height: 200,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 22, color: 'black', fontWeight: 600}}>
                  예약내역이 없습니다.
                </Text>
              </View>
            ) : (
              <View style={{alignItems: 'center'}}>
                <QRCode
                  value={'bookId:' + props.bookId + ' userId:' + props.userId}
                  size={200}
                />
                <Text style={styles.txt}>
                  상단의 QR코드를 스캐너에 비춰주세요.
                </Text>
              </View>
            )}

            <Btn title="닫기" pressOption={props.setModalVisible} />
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
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  modalView: {
    // width:'100%',

    marginHorizontal: 25,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 10,
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

  txt: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
  },

  closeBtn: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#58D3F7',
  },
});

export default QrModal;
