import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import axios from 'axios';
import base64js from 'base64-js';

const FaceList = ({route, navigation}) => {
  const {photos} = route.params;
  const [imageDataList, setImageDataList] = useState([]);

  const dataURItoBlob = (dataURI) => {
    const byteString = base64js.toByteArray(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    
    return new Blob([byteString], { type: mimeString });
  };
  const uploadData = async () => {

    const blob = dataURItoBlob(imageDataList[0]);
    console.log(blob);
    try {
      let formdata = new FormData();

      //   imageDataList.map((imageData, index) => {
      //     var photo = {
      //       uri: imageData,
      //       type: 'multipart/form-data',
      //       name: `${index}.jpg`,
      //     };
      //     body.append('image', photo);
      //   });
      let photo = {
        uri: photos[0],
        type: 'image/jpeg',
        name: `test.jpg`,
      };
      // console.log(photo);
      formdata.append('image', blob, 'test.jpg');

      await axios.post('http://3.35.136.45/account/user/face/register/', formdata, {
        headers: {'Content-Type': 'multipart/form-data'},
      });

      console.log('🥹 image upload complete!');
    } catch (error) {
      console.error('😛 Error :', error);
      console.log('😛 Error :', error.message);
    }
  };

  const getFileContent = async source => {
    const fileContent = await RNFS.readFile(source, 'base64');
    return 'data:image/jpeg;base64,' + fileContent;
  };

  //배열로 념거진 경로를 모두 이미지 데이터로 변화시키기
  useEffect(() => {
    setImageDataList([]);
    const fetchImageData = async () => {
      const data = await Promise.all(
        photos.map(async photo => await getFileContent(photo)),
      );
      setImageDataList(data);
    };
    fetchImageData();
  }, [photos]);

  return (
    <ScrollView>
      <Text>{photos}</Text>
      <View>
        {imageDataList &&
          imageDataList.map((data, index) => {
            return (
              <Image
                key={index}
                source={{uri: data}}
                style={{width: 200, height: 200}}
              />
            );
          })}
      </View>
      <View
        style={{
          width: 100,
          height: 50,
          backgroundColor: 'pink',
        }}>
        <TouchableOpacity onPress={uploadData}>
          <Text>upload</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FaceList;
