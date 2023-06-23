import React, { useState } from 'react';
import { StyleSheet, View, FlatList, ScrollView} from "react-native";
import ImageButton from "../components/ImageButton";
import SaveButton from "../components/SaveButton";


function Mycloset_setting({navigation}) {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImagePress = (image, isSelected) => {
    if (isSelected) {
      setSelectedImages([...selectedImages, image]);
    } else {
      setSelectedImages(selectedImages.filter((selectedImage) => selectedImage !== image));
    }
  };


  const ClothImageMap = {
    19: 'half_knit',
    20: 'white_tshirt',
    21: 'black_skirt',
    22: 'cardigan',
    23: 'blue_jean',
    24: 'white_cottonp',
    25: 'black_slacks',
    26: 'half-jean',
    27: 'black_tshirt',
    28: 'beige_slacks',
    29: 'sky_jean',
    30: 'long_knit',
    31: 'white_tshirt',
    32: 'black_shirt',
    33: 'white_skirt'
  };

  const result = {};
  
  Object.keys(ClothImageMap).forEach((key) => {
    result[ClothImageMap[key]] = selectedImages.includes(parseInt(key));
  });

  const handleSave = () => {
    // selectedImages 최종 저장, 배열 다음페이지로 전달, DB로 전달
    navigation.navigate('Mycloset_pickandchoose', { selectedImages });
    console.log(result);


  };

  const urlList = [
    { image_url : require('../assets/mycloset/black_knit.jpg') },
    { image_url : require('../assets/mycloset/white_tshirt.jpg') },
    { image_url : require('../assets/mycloset/black_long_skirt.jpg') },
    { image_url : require('../assets/mycloset/cardigan.jpg') },
    { image_url : require('../assets/mycloset/dark_denim_pants.jpg') },  
    { image_url : require('../assets/mycloset/white_pants.jpg') },
    { image_url : require('../assets/mycloset/black_slacks.jpg') },
    { image_url : require('../assets/mycloset/short_denim_pants.jpg') },
    { image_url : require('../assets/mycloset/black_tshirt.jpg') },
    { image_url : require('../assets/mycloset/beige_slacks.jpg') },
    { image_url : require('../assets/mycloset/light_denim_pants.jpg') },
    { image_url : require('../assets/mycloset/long_sleeve_knit.jpg') },
    { image_url : require('../assets/mycloset/white_shirt.jpg') },
    { image_url : require('../assets/mycloset/black_shirt.jpg') },
    { image_url : require('../assets/mycloset/white_short_skirt.png') },
  ]

    return (
      <View style={styles.container}>
        <FlatList
          data={urlList} // selectedImages 리스트 내의 모든 항목에 대해
          numColumns={3}
          renderItem={({item}) => ( // i를 이렇게 render해라
          <ImageButton src={item.image_url} onImagePress={handleImagePress}/>
          )} 
        />
        <SaveButton title='저장' onPress={handleSave}/>  
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });

export default Mycloset_setting;