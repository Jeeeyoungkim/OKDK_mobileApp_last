import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import WebView from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

const Payment = ({route}) => {
  const navigation = useNavigation();
  const enroll = route.params;
  if(enroll && enroll.enroll){
  console.log(`payment의 enroll route 값이 잘왔니? ${enroll.enroll}`);
}
  const webViewRef = useRef(null);
  useEffect(() => {
      sendMessageToWebView();
  }, [enroll]);

  const sendMessageToWebView = () => {
    console.log("자 웹뷰의 카메라 한테 코드전송 시작1");
    const data = {
      message: "웹뷰",
      card: {
        card_number: "9490 9488 0671 8092",
        expiration_date: "03/24",
        cvc_number: "585"
      }
    };
    const jsonData = JSON.stringify(data);
    console.log(webViewRef.current);
    if (webViewRef.current) {
      console.log("자 웹뷰의 카메라 한테 코드전송 시작2");
      webViewRef.current.postMessage(jsonData);
    }
  };
  return (
    <>
      <WebView
        source={{uri: 'http://192.168.123.103:3000/morecards'}}
        ref={webViewRef}
        // onLoad={sendMessageToWebView}
        onMessage={event => {
          console.log('받은 데이터(React) : ' + event.nativeEvent.data);
          const parsedData = JSON.parse(event.nativeEvent.data);
          console.log('Type:', parsedData.type);
          console.log('Data:', parsedData.data);
          if (parsedData && event.nativeEvent.data) {
            navigation.navigate('CardCamera');
          }
          //이제 여기서 받았으니깐 나는 이동시켜주면 되
        }}
      />
      {/* <CameraScreen /> */}
    </>
  );
};

export default Payment;

const styles = StyleSheet.create({});
