import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity, Text, StyleSheet, Button, Image, View } from 'react-native';
import ImageSelectButton from '../components/ImageSelectButton.js';
import SaveButton from '../components/SaveButton.js';


//이미지 선택 처리 함수 생성W
const selectImage = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    console.log('권한이 거부되었습니다');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync();
  if (!result.canceled) {
    // 이미지가 선택된 경우
    console.log(result.assets);
    // 선택한 이미지를 처리하거나 화면에 표시하는 등의 작업
  }
};

function MyStyle({navigation}) {
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <View style={styles.container}>
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      <ImageSelectButton onPress={selectImage} />
      <SaveButton 
            onPress={() => navigation.navigate('Mycloset_main')} 
          />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { //전체화면
      flex: 1,
      //justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
    image: {
      width: 200,
      height: 200,
    },
    button: {
      margintop:'25%',
      display: 'flex',
      flexDirection: 'column',
      width: 200,
      height: 46,
      backgroundColor: '#808080',
      borderRadius:5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#808080',
      fontSize: 16,
      fontWeight: 'bold',
    },
});

export default MyStyle;
