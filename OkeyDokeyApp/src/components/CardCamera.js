import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Linking,
  Image,
} from 'react-native';
import RNFS from 'react-native-fs';
import axios from 'axios';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';

const CameraScreen = ({state}) => {
  const navigation = useNavigation();
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;

//   const accessToken = useSelector(state => state.user.access_token);
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyNzkyMDk3LCJpYXQiOjE2OTI3ODg0OTcsImp0aSI6ImMxYjFjM2UyN2VlYTQ5ZWI4NjM5NTI1OGRmMzFmZTY2IiwidXNlcl9pZCI6M30.Onp8-T-VjqrU0xQcwLSuiecAq3Sn7q_xT5-b2_VW2T4";
  const userNickname = useSelector(state => state.user.nickname);

  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    async function getPermission() {
      const newCameraPermission = await Camera.requestCameraPermission();
      console.log(newCameraPermission);
    }
    getPermission();
  }, []);

  const capturePhoto = async () => {
    if (camera.current == null) {
      return;
    }

    const photo = await camera.current.takePhoto({});
    setImageSource(photo.path);
    console.log(photo.path);
  };

  if (device == null) {
    return <Text>Camera not available</Text>;
  }

  const uploadData = async () => {
      let formdata = new FormData();
      // ReactNativeBlobUtil를 사용하여 파일을 직접 불러옵니다.
      //const blob = await ReactNativeBlobUtil.fs.readFile(imageSource, 'base64');
  
      // Blob 데이터를 FormData에 추가합니다.
      formdata.append('image', {
        name: 'test.jpg',
        type: 'image/jpeg',
        uri: 'file://' + imageSource,
      });
      console.log(`file:/${imageSource}`);
      try {
        const response = await axios.post(
        'http://3.36.95.105/payment/card/create/image/',
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
          transformRequest: (data, headers) => {
            return data;
          },
        },
      );  
      console.log('🥹 image upload complete!', response.data);
      setTimeout(() => {
        navigation.navigate("Payment", { enroll: true });
      }, 3000);
     
    } catch (error) {
      console.log('😛 Error :', error);
      console.log('😛 Error :', error.message);
      setTimeout(() => {
        navigation.navigate("Payment", { enroll: true });
      }, 3000);
    }
  };
  

  return (
    <View style={styles.container}>
      {showCamera ? (
        <>
          <View
            style={{
              marginBottom: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
              {userNickname ? userNickname : '익명'}님의 카드 등록 카메라
            </Text>
          </View>
          <View style={{position: 'relative', width: '100%', height: '80%'}}>
            <Camera
              ref={camera}
              style={{width: '100%', height: '100%'}}
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
              <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
                화면에 맞춰 촬영해주세요
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.camButton}
              onPress={() => {
                capturePhoto();
                setShowCamera(false);
              }}
            />
          </View>
        </>
      ) : (
        <>
          {imageSource !== null ? (
            <>
              {showSuccessMessage && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 999,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                  }}>
                  <Icon name="checkcircle" size={50} color="#056CF2" />
                  <Text style={{color: 'white', fontSize: 20, marginTop: 20}}>
                    등록이 완료되었어요
                  </Text>
                </View>
              )}
              <Image
                style={styles.image}
                source={{
                  uri: `file://'${imageSource}`,
                }}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#fff',
                      padding: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: '#77c3ec',
                    }}
                    onPress={() => setShowCamera(true)}>
                    <Text style={{color: '#77c3ec', fontWeight: '500'}}>
                      다시찍기
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#77c3ec',
                      padding: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: 'white',
                    }}
                    onPress={() => uploadData()}>
                    <Text style={{color: 'white', fontWeight: '500'}}>
                      사진 등록하기
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{justifyContent: 'center', alignItems: 'center'}}>
                얼굴을 등록하지 않으면 서비스 이용이 불가능합니다.
              </Text>
              <View style={styles.backButton}>
                <TouchableOpacity
                  onPress={() => setShowCamera(true)}
                  style={{
                    backgroundColor: '#056CF2',
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: '#fff',
                    width: 100,
                  }}>
                  <Text style={{color: 'white', fontWeight: '500'}}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    backgroundColor: 'gray',
    top: 0,
    padding: 20,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.0)',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    top: 0,
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  camButton: {
    height: 50,
    width: 50,
    borderRadius: 40,
    backgroundColor: '#B2BEB5',
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  image: {
    width: '100%',
    height: '80%',
  },
});

export default CameraScreen;