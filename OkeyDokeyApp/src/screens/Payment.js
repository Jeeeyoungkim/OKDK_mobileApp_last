import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

const Payment = () => {
  const navigation = useNavigation();
  const [key, setKey] = useState(0); // 새로운 상태 변수

  useEffect(() => {
    navigation.setOptions({
      tabBarButton: props => (
        <TouchableWithoutFeedback
          onPress={() => {
            if (props.accessibilityState.selected) {
              console.log('reload');

              setKey(prevKey => prevKey + 1);
            }
            props.onPress();
          }}>
          <View style={props.style}>{props.children}</View>
        </TouchableWithoutFeedback>
      ),
    });
  }, [navigation]);

  const onWebMessage = event => {
    const messageData = JSON.parse(event.nativeEvent.data);

    console.log(messageData.status);

    if (messageData.status === 'Home') {
      console.log('네비게이션 이동 : ', messageData.status);
      navigation.navigate('Bottom', {screen: 'Home'});
    }
  };

  return (
    <>
      <WebView
        key={key} // key prop 추가
        mixedContentMode="always"
        style={{width: '100%', height: '100%'}}
        source={{uri: 'http://43.201.113.143/payment'}}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        onMessage={onWebMessage}
      />
    </>
  );
};
//여기서 nativeEvent받고 CardCamera로 이동해야 하는데.. 로직이 우데갔찌
export default Payment;

const styles = StyleSheet.create({});

// webview - 카드 카메라로 사진 촬영 로직
{
  /* <WebView
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
        /> */
}
