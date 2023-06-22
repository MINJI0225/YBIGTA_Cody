import React from 'react';
import { StyleSheet, View, FlatList} from "react-native";
import ImageButton from "../components/ImageButton";
import SaveButton from "../components/SaveButton";

function Mycloset_setting({navigation}) {
  const urlList = [
    { image_url : require('../assets/closet/white_tshirt.png') },
    { image_url : require('../assets/closet/white_sleeveless.png') },
    { image_url : require('../assets/closet/white_poloshirt.png') },
    { image_url : require('../assets/closet/white_skirt.png') },
    { image_url : require('../assets/closet/blue_jean.png') },
    { image_url : require('../assets/closet/green_overall.png') },
    { image_url : require('../assets/closet/necklace.png') },
    { image_url : require('../assets/closet/green_cap.png') },
    { image_url : require('../assets/closet/black_dress.png') },
    { image_url : require('../assets/closet/green_poloshirt.png') },
    { image_url : require('../assets/closet/white_hat.png') },
    { image_url : require('../assets/closet/green_backpack.png') },
  ]

    return (
      <View style={styles.container}>
        <FlatList
          data={urlList} // selectedImages 리스트 내의 모든 항목에 대해
          numColumns={3}
          renderItem={({item}) => ( // i를 이렇게 render해라
            <ImageButton src={item.image_url}/>
          )} 
        />
        <SaveButton title='저장'/>
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