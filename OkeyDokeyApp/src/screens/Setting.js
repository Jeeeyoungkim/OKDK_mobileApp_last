import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import React, {useState, useEffect} from 'react';
import WebView from 'react-native-webview';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/slice/userSlice';

const Setting = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [key, setKey] = useState(0); // 새로운 상태 변수

  useEffect(() => {
    navigation.setOptions({
      tabBarButton: props => (
        <TouchableWithoutFeedback
          onPress={() => {
            // Home 탭이 이미 선택된 상태에서 다시 탭을 누르면 웹뷰를 새로고침
            if (props.accessibilityState.selected) {
              console.log('reload');
              // const newUri =
              //   'https://voluble-basbousa-74cfc0.netlify.app/Favorite';
              // setUri(newUri);
              setKey(prevKey => prevKey + 1);
            }
            props.onPress();
          }}>
          <View style={props.style}>{props.children}</View>
        </TouchableWithoutFeedback>
      ),
    });
  }, [navigation]);

  const handleMessage = async event => {
    try {
      const messageData = JSON.parse(event.nativeEvent.data);

      //로그아웃 성공시
      if (messageData && messageData.status === 'logout') {
        console.log('로그아웃 : ', messageData.status);

        // AsyncStorage에 토큰 삭제
        await AsyncStorage.removeItem('access_token', messageData.access_token);
        await AsyncStorage.removeItem(
          'refresh_token',
          messageData.refresh_token,
        );

        // Redux에 로그인 정보 삭제
        dispatch(logout());
        navigation.navigate('Login');
      }

      if (messageData && messageData.status === 'updateFace') {
        console.log('얼굴갱신 : ', messageData.status);
        navigation.navigate('Camera', {update: true});
      }

      if (messageData.status === 'Home') {
        console.log('네비게이션 이동 : ', messageData.status);
        navigation.navigate('Bottom', {screen: 'Home'});
      }
    } catch (error) {
      console.error('Error handling the message:', error.response.data.detail);
    }
  };

  return (
    <>
      <WebView
        key={key}
        mixedContentMode="always"
        style={{width: '100%', height: '100%'}}
        source={{uri: 'https://voluble-basbousa-74cfc0.netlify.app/setting'}}
        onMessage={handleMessage}
      />
    </>
  );
};

export default Setting;

const styles = StyleSheet.create({});
