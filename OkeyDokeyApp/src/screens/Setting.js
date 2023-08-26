import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/slice/userSlice';

const Setting = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleMessage = async event => {
    try {
      const messageData = JSON.parse(event.nativeEvent.data);

      //로그인 성공시
      if (messageData && messageData.status === 'logout') {
        console.log('로그아웃 : ', messageData.status);

        // AsyncStorage에 토큰 저장
        await AsyncStorage.removeItem('access_token', messageData.access_token);
        await AsyncStorage.removeItem(
          'refresh_token',
          messageData.refresh_token,
        );

        // Redux에 로그인 정보 삭제
        dispatch(logout());
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error handling the message:', error);
    }
  };

  return (
    <>
      <WebView
        source={{uri: 'http://192.168.0.15:3000/Setting'}}
        onMessage={handleMessage}
      />
    </>
  );
};

export default Setting;

const styles = StyleSheet.create({});
