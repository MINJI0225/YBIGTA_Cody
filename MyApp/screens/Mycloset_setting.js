import React from 'react';
import { StyleSheet, View, FlatList, ScrollView} from "react-native";
import ImageButton from "../components/ImageButton";
import SaveButton from "../components/SaveButton";

function Mycloset_setting({navigation}) {
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
        <ScrollView style={{alignContent:'center'}}>
          <FlatList
            data={urlList} // selectedImages 리스트 내의 모든 항목에 대해
            numColumns={3}
            renderItem={({item}) => ( // i를 이렇게 render해라
              <ImageButton src={item.image_url}/>
            )} 
          />
          <View style={{alignItems:'center'}}>
            <SaveButton title='저장'/>  
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
      justifyContent: 'center'
    },
  });

export default Mycloset_setting;