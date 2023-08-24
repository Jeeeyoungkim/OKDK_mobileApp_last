import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

//redux
import {useDispatch} from 'react-redux';
import {login, setNickname} from '../redux/slice/userSlice.js';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLoginSuccess = (access_token, refresh_token) => {
    dispatch(login({access_token, refresh_token}));
  };

  const handleMessage = async event => {
    try {
      const messageData = JSON.parse(event.nativeEvent.data);

      //로그인 성공시
      if (messageData && messageData.status === 'success') {
        console.log('로그인 성공했니? : ', messageData.status);

        // AsyncStorage에 토큰 저장
        await AsyncStorage.setItem('access_token', messageData.access_token);
        await AsyncStorage.setItem('refresh_token', messageData.refresh_token);

        // Redux에 로그인 정보 저장
        handleLoginSuccess(messageData.access_token, messageData.refresh_token);
        fetchUserInfo(messageData.access_token);
      }
    } catch (error) {
      console.error('Error handling the message:', error);
    }
  };

  const fetchUserInfo = async token => {
    console.log('Fetching user info');
    try {
      const response = await axios.get('http://43.202.59.85/account/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userInfo = response.data;
      dispatch(setNickname(userInfo.nickname));

      if (userInfo.face_registered === false) {
        navigation.navigate('Camera');
      }
    } catch (error) {
      console.error('Failed to fetch user info', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <WebView
        mixedContentMode="always"
        style={{width: '100%', height: '100%'}}
        source={{uri: 'http://192.168.123.103:3000/login'}}
        onMessage={handleMessage}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
