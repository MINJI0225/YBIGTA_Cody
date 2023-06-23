import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ImageButton from '../components/ImageButton';
import SaveButton from '../components/SaveButton';

function Mycloset_setting({ navigation }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [result, setResult] = useState({});

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
    26: 'half_jean',
    27: 'black_tshirt',
    28: 'beige_slacks',
    29: 'sky_jean',
    30: 'long_knit',
    31: 'white_shirt',
    32: 'black_shirt',
    33: 'white_skirt',
  };

  useEffect(() => {
    const updatedResult = {};
    Object.keys(ClothImageMap).forEach((key) => {
      updatedResult[ClothImageMap[key]] = selectedImages.includes(parseInt(key)) ? 1 : 0;
    });
    setResult(updatedResult);
  }, [selectedImages]);

  const handleSave = () => {
    fetch('http://localhost:5000/mycloset/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
      navigation.navigate('Mycloset_pickandchoose', { selectedImages });
    // Rest of your save logic
  };

  const urlList = [
    { image_url: require('../assets/mycloset/black_knit.jpg') },
    { image_url: require('../assets/mycloset/white_tshirt.jpg') },
    { image_url: require('../assets/mycloset/black_long_skirt.jpg') },
    { image_url: require('../assets/mycloset/cardigan.jpg') },
    { image_url: require('../assets/mycloset/dark_denim_pants.jpg') },
    { image_url: require('../assets/mycloset/white_pants.jpg') },
    { image_url: require('../assets/mycloset/black_slacks.jpg') },
    { image_url: require('../assets/mycloset/short_denim_pants.jpg') },
    { image_url: require('../assets/mycloset/black_tshirt.jpg') },
    { image_url: require('../assets/mycloset/beige_slacks.jpg') },
    { image_url: require('../assets/mycloset/light_denim_pants.jpg') },
    { image_url: require('../assets/mycloset/long_sleeve_knit.jpg') },
    { image_url: require('../assets/mycloset/white_shirt.jpg') },
    { image_url: require('../assets/mycloset/black_shirt.jpg') },
    { image_url: require('../assets/mycloset/white_short_skirt.png') },
    // Rest of the image URLs
  ];

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FlatList
          data={urlList}
          numColumns={3}
          renderItem={({ item }) => (
            <ImageButton src={item.image_url} onImagePress={handleImagePress} />
          )}
        />
      </View>
      <SaveButton title="저장" onPress={handleSave} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    maxHeight: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Mycloset_setting;