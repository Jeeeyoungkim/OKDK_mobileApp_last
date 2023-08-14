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
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';

const CameraScreen = ({state}) => {
  const navigation = useNavigation();
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.front;

  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState(null);
  const [photos, setPhotos] = useState([]); // 보낼 사진들 빈 배열로 초기화
  const [imageObject, setImageObject] = useState('');

  useEffect(() => {
    async function getPermission() {
      const newCameraPermission = await Camera.requestCameraPermission();
      console.log(newCameraPermission);
    }
    getPermission();
  }, []);

  //김연출의 키오스크 사진 보내기
  const uploadData = async () => {
    // 폼데이터 생성
    var body = new FormData();
    var photo = {
      uri: imageSource,
      type: 'multipart/form-data',
      name: `${imageObject}.jpg`,
    };
    body.append('image', photo);
    // 서버에게 전송
    axios.post('serverUrl', body, {
      headers: {'content-type': 'multipart/form-data'},
    });
  };

  const capturePhoto = async () => {
    if (camera.current == null) {
      return;
    }

    const photo = await camera.current.takePhoto({});
    setImageSource(photo.path);
    console.log(photo.path);
    setPhotos(prevPhotos => [...prevPhotos, photo.path]);

    if (state == 1) {
      setImageObject(photo);
      uploadData();
    }
  };

  const startInterval = count => {
    setShowCamera(true);
    setPhotos([]);
    let i = 0;
    const id = setInterval(async () => {
      if (i < count) {
        await capturePhoto();
        i++;
      } else {
        clearInterval(id);
        setShowCamera(false);
      }
    }, 1000);
  };

  if (device == null) {
    return <Text>Camera not available</Text>;
  }

  return (
    <View style={styles.container}>
      {showCamera ? (
        <>
          <View style={{position: 'relative', width: 300, height: 300}}>
            <Camera
              ref={camera}
              style={{width: 300, height: 300}}
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
              <Text style={{color: 'white'}}>정면을 응시해 주세요</Text>
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
            <Image
              style={styles.image}
              source={{
                uri: `file://'${imageSource}`,
              }}
            />
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

          <View style={styles.button}>
            <TouchableOpacity>
              <Text style={{color: 'white', fontWeight: '500'}}>
                {imageSource}
              </Text>
            </TouchableOpacity>
          </View>
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
                onPress={() => startInterval(5)}>
                <Text style={{color: 'white', fontWeight: '500'}}>
                  여러번 찍기
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
                onPress={() => {
                  navigation.push('PhotoList', {
                    photos: photos,
                  });
                }}>
                <Text style={{color: 'white', fontWeight: '500'}}>
                  사진 확인하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    //ADD backgroundColor COLOR GREY
    backgroundColor: '#B2BEB5',

    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  image: {
    width: 300,
    height: 300,
    //aspectRatio: 9 / 16,
  },
});

export default CameraScreen;
