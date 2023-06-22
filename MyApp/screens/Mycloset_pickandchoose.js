import React, {useState} from 'react';
import { StyleSheet, View, FlatList, ScrollView, Alert} from "react-native";
import ImageButton from "../components/ImageButton";
import SaveButton from "../components/SaveButton";

function Mycloset_pickandchoose({navigation}) {
  const urlList = [
    { name:'black_knit',
      image_url : require('../assets/mycloset/black_knit.jpg') },
    { name:'white_tshirt',
      image_url : require('../assets/mycloset/white_tshirt.jpg') },
    { name: 'black_skirt',
      image_url : require('../assets/mycloset/black_long_skirt.jpg') },
    { name: 'cardigan',
      image_url : require('../assets/mycloset/cardigan.jpg') },
    { name: 'blue_jean',
      image_url : require('../assets/mycloset/dark_denim_pants.jpg') },  
    { name: 'white_cotton',
      image_url : require('../assets/mycloset/white_pants.jpg') },
    { name:'black_slacks',
      image_url : require('../assets/mycloset/black_slacks.jpg') },
    { name:'half_jean',
      image_url : require('../assets/mycloset/short_denim_pants.jpg') },
    { name:'black_tshirt',
      image_url : require('../assets/mycloset/black_tshirt.jpg') },
    { name:'beige_slacks',
      image_url : require('../assets/mycloset/beige_slacks.jpg') },
    { name:'sky_jean',
      image_url : require('../assets/mycloset/light_denim_pants.jpg') },
    { name:'white_knit',
      image_url : require('../assets/mycloset/long_sleeve_knit.jpg') },
    { name:'white_shirt',
      image_url : require('../assets/mycloset/white_shirt.jpg') },
    { name:'black_skirt',
      image_url : require('../assets/mycloset/black_shirt.jpg') },
    { name:'white_skirt',
      image_url : require('../assets/mycloset/white_short_skirt.png') },
  ]

  const [selectedImageName, setSelectedImageName] = useState([]);

  const handleImageButtonClick = (name) => {
    setSelectedImageName((prev) => [...prev, name]);
  };

  if (selectedImageName.length > 1){
    Alert.alert("1개의 아이템만 선택해주세요");
  }
  return (
    <View style={styles.container}>
      <ScrollView style={{ alignContent: 'center' }}>
        <FlatList
          data={urlList}
          numColumns={3}
          renderItem={({ item }) => (
            <ImageButton
              src={item.image_url}
              onSelect={() => handleImageButtonClick(item.name)}
            />
          )}
        />
        <View style={{ alignItems: 'center' }}>
          <SaveButton
            title='코디 확인하기'
            onPress={() => navigation.navigate('PickAndChooseRecommend')} />
        </View>
      </ScrollView>
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
});

export default Mycloset_pickandchoose;