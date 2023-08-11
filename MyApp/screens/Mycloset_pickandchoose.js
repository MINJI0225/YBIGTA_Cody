import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Alert } from 'react-native';
import ImageButton from '../components/ImageButton';
import SaveButton from '../components/SaveButton';
import { API_URL } from '@env';

function Mycloset_pickandchoose({ navigation}) {
  const [selectedClothes, setSelectedClothes] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/mycloset/get`)
      .then(response => response.json())
      .then(data => {
        console.log('Success fetching selected clothes:', data);
        const selectedKeys = Object.keys(data).filter(key => data[key] === 1).map(key => ({
          key,
          isSelected: false
        }));
        console.log('selectedKeys:', selectedKeys);
        setSelectedClothes(selectedKeys);
      })
      .catch(error => {
        console.error('Error fetching selected clothes:', error);
      });
  }, []);

  const handleImageButtonClick = (itemKey) => {
    console.log('itemKey:', itemKey);
    setSelectedClothes(prevState => prevState.map(item => {
      if (item.key === itemKey) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    }));
  };
  
  const convertClothNameToId = (name) => {
    const clothId = Object.keys(ClothImageMap).find(
      (key) => ClothImageMap[key] === name
    );
    return clothId ? parseInt(clothId) : null;
  };
  const handleUpload = async () => {
    const selectedItem = selectedClothes.find(item => item.isSelected);
    console.log("Fetch to server: ", selectedItem.key);
    if (selectedItem) {
      let input = { selected_item: selectedItem.key };
  
      try {
        const response = await fetch(`${API_URL}/mycloset/choice`, {
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
    } else {
      Alert.alert("선택된 아이템이 없습니다."); // 사용자에게 선택된 아이템이 없음을 알림
    }
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

  useEffect(() => {
    console.log('selectedClothes:', selectedClothes);
  }, [selectedClothes]);


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FlatList
          data={selectedClothes}
          numColumns={3}
          renderItem={({ item }) => {
            const imageUrl = urlList.find(urlItem => urlItem.key === item.key)?.image_url;
            return (
              <ImageButton
                imageKey={item.key}
                src={imageUrl}
                onImagePress={() => handleImageButtonClick(item.key)}
              />
            );
          }}
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
});
export default Mycloset_pickandchoose;