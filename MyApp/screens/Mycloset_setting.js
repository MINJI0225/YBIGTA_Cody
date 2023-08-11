import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ImageButton from '../components/ImageButton';
import SaveButton from '../components/SaveButton';
import { API_URL } from '@env';

function Mycloset_setting({ navigation }) {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImagePress = (imageKey, isSelected) => {
    if (isSelected) {
      setSelectedImages(prev => [...prev, imageKey]);
      console.log('isSelected - selectedImages', selectedImages);
    } else {
      setSelectedImages(prev => prev.filter(key => key !== imageKey));
      console.log('!isSelected - selectedImages', selectedImages);
    }
  };

  useEffect(() => {
    console.log('selectedImages:', selectedImages);
  }, [selectedImages]);


  const handleSave = () => {
    const result = {};

    urlList.forEach(({ key }) => {
      result[key] = selectedImages.includes(key) ? 1 : 0;
    });

    console.log('result:', result);
    
    fetch(`${API_URL}/mycloset/post`, {
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
      navigation.navigate('Mycloset_main');
    // Rest of your save logic
  };

  const urlList = [
    { key: 'half_knit', image_url: require('../assets/mycloset/black_knit.jpg') },
    { key: 'white_tshirt', image_url: require('../assets/mycloset/white_tshirt.jpg') },
    { key: 'black_skirt', image_url: require('../assets/mycloset/black_long_skirt.jpg') },
    { key: 'cardigan', image_url: require('../assets/mycloset/cardigan.jpg') },
    { key: 'blue_jean', image_url: require('../assets/mycloset/dark_denim_pants.jpg') },
    { key: 'white_cottonp', image_url: require('../assets/mycloset/white_pants.jpg') },
    { key: 'black_slacks', image_url: require('../assets/mycloset/black_slacks.jpg') },
    { key: 'half_jean', image_url: require('../assets/mycloset/short_denim_pants.jpg') },
    { key: 'black_tshirt', image_url: require('../assets/mycloset/black_tshirt.jpg') },
    { key: 'beige_slacks', image_url: require('../assets/mycloset/beige_slacks.jpg') },
    { key: 'sky_jean', image_url: require('../assets/mycloset/light_denim_pants.jpg') },
    { key: 'long_knit', image_url: require('../assets/mycloset/long_sleeve_knit.jpg') },
    { key: 'white_shirt', image_url: require('../assets/mycloset/white_shirt.jpg') },
    { key: 'black_shirt', image_url: require('../assets/mycloset/black_shirt.jpg') },
    { key: 'white_skirt', image_url: require('../assets/mycloset/white_short_skirt.png') },
    // Rest of the image URLs
  ];

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FlatList
          data={urlList}
          numColumns={3}
          renderItem={({ item }) => (
            <ImageButton src={item.image_url} imageKey={item.key} onImagePress={handleImagePress} />
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