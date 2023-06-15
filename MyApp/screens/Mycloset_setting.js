import React from 'react';
import { StyleSheet, View, FlatList} from "react-native";
import ImageButton from "../components/ImageButton";
import SaveButton from "../components/SaveButton";

function Mycloset_setting({navigation}) {
  const urlList = [
    {
      unclicked : require('../assets/closet/white_tshirt.png'),
      clicked : require('../assets/closet/clicked.png')
    },
    {
      unclicked : require('../assets/closet/white_sleeveless.png'),
      clicked : require('../assets/closet/clicked.png')
    },
    {
      unclicked : require('../assets/closet/white_poloshirt.png'),
      clicked : require('../assets/closet/clicked.png')
    },
    {
      unclicked : require('../assets/closet/white_skirt.png'),
      clicked : require('../assets/closet/clicked.png')
    },
    {
      unclicked : require('../assets/closet/blue_jean.png'),
      clicked : require('../assets/closet/clicked.png')
    },
    {
      unclicked : require('../assets/closet/green_overall.png'),
      clicked : require('../assets/closet/clicked.png')
    },
    {
      unclicked : require('../assets/closet/necklace.png'),
      clicked : require('../assets/closet/clicked.png')
    },
    {
      unclicked : require('../assets/closet/green_cap.png'),
      clicked : require('../assets/closet/clicked.png')
    },
    {
      unclicked : require('../assets/closet/black_dress.png'),
      clicked : require('../assets/closet/clicked.png')
    },
    {
      unclicked : require('../assets/closet/green_poloshirt.png'),
      clicked : require('../assets/closet/clicked.png')
    },
    {
      unclicked : require('../assets/closet/white_hat.png'),
      clicked : require('../assets/closet/clicked.png')
    },
    {
      unclicked : require('../assets/closet/green_backpack.png'),
      clicked : require('../assets/closet/clicked.png')
    },]

    return (
      <View style={styles.container}>
        <FlatList
          data={urlList} // selectedImages 리스트 내의 모든 항목에 대해
          numColumns={3}
          renderItem={({item}) => ( // i를 이렇게 render해라
            <ImageButton unclickedImg={item.unclicked} clickedImg={item.clicked}/>
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