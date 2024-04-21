/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Modal} from 'react-native';
// import Modal from 'react-native-simple-modal';
import QRCode from 'react-native-qrcode-svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Btn from '../btn';

const LoadingModal = props => {
  return (
    <View>
      <Modal
        visible={props.modalVisible}
        transparent={true}
        animationType="fade"
        modalDidClose={props.setModalVisible}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="black" />
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
    backgroundColor: 'rgba(0,0,0,0.2)',
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

export default LoadingModal;
