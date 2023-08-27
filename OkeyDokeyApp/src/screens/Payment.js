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
        source={{uri: 'http://192.168.201.12:3000/payment'}}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
    </>
  );
};

export default Payment;

const styles = StyleSheet.create({});
