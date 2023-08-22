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

const CameraScreen = ({state}) => {
  const navigation = useNavigation();
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.front;

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

      await axios.post('http://3.36.63.88/account/user/face/register/', body, {
        headers: {'Content-Type': 'multipart/form-data'},
      });

      console.log('🥹 image upload complete!');
      setShowSuccessMessage(true);
      // 2초 후에 메시지 숨기기 및 Home 화면으로 이동
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigation.navigate('Favorite');
      }, 2000);
    } catch (error) {
      console.log('😛 Error :', error);
      console.log('😛 Error :', error.message);
    }
  };

  const getFileContent = async source => {
    const fileContent = await RNFS.readFile(source, 'base64');
    return 'data:image/jpeg;base64,' + fileContent;
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
              김땡땡님의 얼굴을 등록합니다
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
                정면을 바라봐 주세요
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
    //ADD backgroundColor COLOR GREY
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
