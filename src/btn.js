/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Btn = ({title, pressOption, option}) => (
  <TouchableOpacity style={styles.btn} onPress={pressOption} disabled={option}>
    <Text style={styles.txt}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    marginTop: 10,
    // width: '100%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#58D3F7',

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

  txt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default Btn;
