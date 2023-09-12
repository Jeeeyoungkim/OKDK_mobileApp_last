import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

const Favorite = ({route, navigation}) => {
  const webViewRef = useRef(null);
  const [key, setKey] = useState(0); // 새로운 상태 변수

  useEffect(() => {
    navigation.setOptions({
      tabBarButton: props => (
        <TouchableWithoutFeedback
          onPress={() => {
            // Home 탭이 이미 선택된 상태에서 다시 탭을 누르면 웹뷰를 새로고침
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
      <View style={{flex: 1}}>
        <WebView
          key={key} // key prop 추가
          mixedContentMode="always"
          style={{width: '100%', height: '100%'}}
          source={{
            uri: 'https://www.okdk.shop/favorite',
          }}
          onError={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
          onMessage={onWebMessage}
        />
      </View>
    </>
  );
};

export default Favorite;

const styles = StyleSheet.create({});
