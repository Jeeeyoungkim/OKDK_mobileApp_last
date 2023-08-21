import React, { useEffect, useRef } from 'react';
import { View, Button } from 'react-native';
import { WebView } from 'react-native-webview';
const WebViewTest = () => {
  const webviewRef = useRef(null);

  useEffect(() => {
    if (webviewRef && webviewRef.current) {
      webviewRef.current.postMessage("hi webview!");
    }
  }, [webviewRef]);

  const uri = { uri: 'http://192.168.0.7:5500/' };

  const handleSendMessage = () => {
    const message = JSON.stringify({ type: 5 });
    if (webviewRef.current) {
      webviewRef.current.postMessage(message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        source={uri}
        javaScriptEnabled={true}
        allowUniversalAccessFromFileURLs
        allowFileAccess
        allowFileAccessFromFileURLs
        mixedContentMode="always"
      />
      <Button title="Send Message to WebView" onPress={handleSendMessage} />
    </View>
  );
};

export default WebViewTest;
