import React, { useState, } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Image, View, FlatList } from 'react-native';
import ImageSelectButton from '../components/ImageSelectButton.js';
import SaveButton from '../components/SaveButton.js';


function MyStyle({navigation}) {
  const [selectedImages, setSelectedImages] = useState([]); //선택한 이미지들을 저장하는 상태

  //사진 라이브러리 접근 권한 요청
  //라이브러리 실행하여 이미지 선택하는 함수
  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('권한이 거부되었습니다');
      return;
    }

    // 이미지 라이브러리 실행 및 선택된 이미지 가져오기
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // 다중선택 옵션
    });

    if (!result.canceled) {
      console.log(result.assets);
      setSelectedImages(result.assets) // 선택한 이미지를 처리하거나 화면에 표시
    }
  };

  return (
    <View style={styles.container}>
      {/* 선택된 이미지가 있을 경우 이미지를 표시 */}
      <FlatList
        data={selectedImages} // selectedImages 리스트 내의 모든 항목에 대해
        keyExtractor={(item) => item.uri}
        numColumns={3}
        renderItem={({item}) => ( // i를 이렇게 render해라
          <Image
            source={{uri : item.uri}} 
            style={styles.image} 
            resizeMode='cover'/>
        )} 
      />
      {/* 이미지 선택 버튼 */}
      <ImageSelectButton onPress={selectImage} />
      {/* 저장 버튼 */}
      <SaveButton
        title='저장' 
        onPress={() => navigation.navigate('MainPage')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { //전체화면
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      padding: 20
    },
    image: {
      width: '31%',
      height: 150,
      marginBottom: 10,
      marginTop: 10,
      marginRight: 10,
      borderRadius: 15
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