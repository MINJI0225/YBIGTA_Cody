import React, { useState } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Alert } from 'react-native';
import ImageButton from '../components/ImageButton';
import SaveButton from '../components/SaveButton';
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
  33: 'white_skirt'
};
function Mycloset_pickandchoose({ navigation, route }) {
  const { selectedImages } = route.params;
  const [selectedClothes, setSelectedClothes] = useState([]);
  const handleImageButtonClick = (name, isSelected) => {
    if (isSelected) {
      setSelectedClothes([name]);
    } else {
      setSelectedClothes([]);
    }
  };
  const convertClothNameToId = (name) => {
    const clothId = Object.keys(ClothImageMap).find(
      (key) => ClothImageMap[key] === name
    );
    return clothId ? parseInt(clothId) : null;
  };
  const handleUpload = async () => {
    if (selectedClothes.length === 1) {
      const clothName = selectedClothes[0];
      if (clothName) {
        let input = {selected_item: clothName};
        try {
          const response = await fetch('http://localhost:5000/mycloset/choice', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
          });
          if (response.ok) {
            const data = await response.json();
            console.log('Success:', data);
            navigation.navigate('PickAndChooseRecommend', { data });
          } else {
            console.log('Request failed');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FlatList
          data={selectedImages}
          numColumns={3}
          renderItem={({ item }) => (
            <ImageButton
              src={item}
              onImagePress={(name, isSelected) => handleImageButtonClick(item.name, isSelected)}
            />
          )}
        />
      </View>
      <SaveButton title="코디 확인하기" onPress={handleUpload} />
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
    maxHeight: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});}
export default Mycloset_pickandchoose;