import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import CameraScreen from '../components/CameraScreen';
import CardCamera from '../components/CardCamera';
//import CameraScreen from '../components/CameraScreen';

const Home = () => {
  return (
    <>
      <View style={{flex: 1}}>
        <Text>hi</Text>
        {/* <CardCamera/> */}
        <WebView
          mixedContentMode="always"
          style={{width: '100%', height: '100%'}}
          source={{uri: 'http://192.168.123.103:3000/'}}
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

export default Home;

const styles = StyleSheet.create({});