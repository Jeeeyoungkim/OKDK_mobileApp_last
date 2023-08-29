import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import WebView from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

const Payment = () => {
  const navigation = useNavigation();
  return (
    <>
      <WebView
        mixedContentMode="always"
        style={{width: '100%', height: '100%'}}
        source={{uri: 'https://voluble-basbousa-74cfc0.netlify.app/payment'}}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
    </>
  );
};
//여기서 nativeEvent받고 CardCamera로 이동해야 하는데.. 로직이 우데갔찌
export default Payment;

const styles = StyleSheet.create({});



// webview - 카드 카메라로 사진 촬영 로직
{/* <WebView
          mixedContentMode="always"
          style={{width: '100%', height: '100%'}}
          source={{uri: 'http://192.168.123.103:3000/morecards'}}
          onMessage={(event) => {
            console.log("받은 데이터(React) : " + event.nativeEvent.data);
            const parsedData = JSON.parse(event.nativeEvent.data);
            console.log("Type:", parsedData.type);
            console.log("Data:", parsedData.data);
            if(parsedData.type === 'WebViewCamera'){
                navigation.navigate('CardCamera');
            }
            //이제 여기서 받았으니깐 나는 이동시켜주면 되 
          }}
          onError={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
        /> */}