import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import axios from 'axios';

const CameraScreen = () => {
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.front;

  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [imageObject, setImageObject] = useState('');
  const [shouldCapture, setShouldCapture] = useState(true); // Control the loop

  const uploadData = async () => {
    try {
      var body = new FormData();

      //   imageDataList.map((imageData, index) => {
      //     var photo = {
      //       uri: imageData,
      //       type: 'multipart/form-data',
      //       name: `${index}.jpg`,
      //     };
      //     body.append('image', photo);
      //   });

      var photo = {
        uri: imageSource,
        type: 'image/jpeg',
        name: `test.jpg`,
      };
      body.append('image', photo);

      await axios.post('http://3.35.136.45/account/user/face/register/', body, {
        headers: {'Content-Type': 'multipart/form-data'},
      });

      console.log("성공");
      //response 값으로 얼굴인식 성공했는지 실패했는지 분류.
      setTimeout(() => {
        console.log("성공");
      }, 2000);
      //성공했으면 다음 페이지로 이동.
    } catch (error) {
      console.log('😛 Error :', error);
      console.log('😛 Error :', error.message);
    }
  };

  useEffect(() => {
    async function getPermission() {
      const newCameraPermission = await Camera.requestCameraPermission();
      console.log(newCameraPermission);
    }
    getPermission();
    setShowCamera(true);

    // Set up autoCapture interval
    const intervalId = setInterval(() => {
      autoCapture();
    }, 3000);
    
    // Clean up by clearing the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const autoCapture = async () => {
    //얼굴이 감지되면 true로 변경되어서 바로 return
    if (!shouldCapture) {
      return;
    }
  
    if (camera.current == null) {
      return;
    }
  
    const photo = await camera.current.takeSnapshot({});
    console.log(photo);
    setImageSource(photo.path);
    setPhotos(prevPhotos => [...prevPhotos, photo.path]);
  
    const backendResponse = 'no_face_detected';
    if (backendResponse === 'no_face_detected') {
      setImageObject(photo);
      uploadData();
    } else {
      setShouldCapture(false);
    }
  };

  if (device == null) {
    return <Text>Camera not available</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={{ position: 'relative', width: 300, height: 300 }}>
        <Camera
          ref={camera}
          style={{ width: 300, height: 300 }}
          device={device}
          isActive={showCamera}
          photo={true}
        />
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white' }}>정면을 응시해 주세요</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // ...
});

export default CameraScreen;
