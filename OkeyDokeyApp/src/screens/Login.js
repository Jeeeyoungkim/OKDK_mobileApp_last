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
    try {
      const response = await axios.get('http://3.36.95.105/account/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userInfo = response.data.user;
      dispatch(setNickname(userInfo.nickname));
      console.log('face_registered : ', userInfo.face_registered);

      if (userInfo.face_registered === false) {
          console.log("Warning 경고입니다.")
        // navigation.navigate('Warning');
      } else {
        console.log('Home으로 이동');
        navigation.navigate('Bottom', {screen: 'Home'});
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
        source={{uri: 'http://43.201.113.143/login'}}
        onMessage={handleMessage}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        userAgent="Chrome/56.0.0.0 Mobile"
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
