import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import WebView from 'react-native-webview';
import CameraScreen from '../components/CameraScreen';
import CardCamera from '../components/CardCamera';
//import CameraScreen from '../components/CameraScreen';
import {useNavigation} from '@react-navigation/native';
const CameraWebviewPage = () => {
    const navigation = useNavigation();

    // const native_to_web = () => {
    //     console.log(webRef.postMessage("전송 데이터(React) : 웹으로 데이터 전송"));
    //   }
    
    //   const errorHandler = ({nativeEvent}) => console.warn("WebView error: ", nativeEvent);
    
    //   /* web -> native */
    //   const web_to_native = (e) => {
    //     console.log(e.nativeEvent.data);
    //   }
  return (
    <>
      <View style={{flex: 1}}>
        <Text>hi</Text>
        {/* <CardCamera/> */}
        <WebView
          mixedContentMode="always"
          style={{width: '100%', height: '100%'}}
          source={{uri: 'http://192.168.123.103:3000/morecards'}}
          onMessage={(event) => {
            console.log("받은 데이터(React) : " + event.nativeEvent.data);
            const parsedData = JSON.parse(event.nativeEvent.data);
            console.log("Type:", parsedData.type);
            console.log("Data:", parsedData.data);
            if(parsedData){
                navigation.navigate('CardCamera');
            }
            //이제 여기서 받았으니깐 나는 이동시켜주면 되 
          }}
          onError={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
        />
      </View>
      {/* <CameraScreen/> */}
    </>
  );
};

export default CameraWebviewPage;

const styles = StyleSheet.create({});