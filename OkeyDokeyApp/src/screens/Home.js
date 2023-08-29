import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const webViewRef = useRef();

  const postMessage = async ({type, data}) => {
    const accessToken = await AsyncStorage.getItem('access_token');
    const refreshToken = await AsyncStorage.getItem('refresh_token');

    const script = `
    localStorage.setItem('access', ${JSON.stringify(accessToken)});
    localStorage.setItem('refresh', ${JSON.stringify(refreshToken)});
    console.log("localStorage 세팅완료");
    window.ReactNativeWebView.postMessage("SetToken");`;

    if (accessToken && refreshToken) {
      webViewRef.current.injectJavaScript(script);
    }
  };

  const onWebMessage = event => {
    const messageData = event.nativeEvent.data;
    console.log(messageData);
    if (messageData === 'SetToken') {
      console.log('LocalStorage has been set in the WebView!');
      // 앱에서 로컬스토리지에 토큰설정 후 fetchData 실행
      webViewRef.current.injectJavaScript(`window.fetchData`);
    }
  };

  return (
    <>
      <View style={{flex: 1}}>
        <Text>hi</Text>
        {/* <CardCamera/> */}
        <WebView
          ref={webViewRef}
          mixedContentMode="always"
          style={{width: '100%', height: '100%'}}
          source={{uri: 'https://voluble-basbousa-74cfc0.netlify.app'}}
          onError={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
          onLoadEnd={postMessage}
          onMessage={onWebMessage}
        />
      </View>
      {/* <CameraScreen/> */}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
