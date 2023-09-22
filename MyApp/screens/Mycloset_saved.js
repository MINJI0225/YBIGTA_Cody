import React from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, FlatList } from "react-native";
import CodySet from "../components/CodySet"
import SaveButton from "../components/SaveButton"

function Mycloset_saved({navigation}) {
    const savedCody = [
      {image_url: "https://image.msscdn.net/images/codimap/detail/5873/detail_5873_1_500.jpg?202306192206"},
      {image_url: "https://image.msscdn.net/images/codimap/detail/3369/detail_3369_1_500.jpg?202306192206"},
      {image_url: "https://image.msscdn.net/images/codimap/detail/1937/detail_1937_1_500.jpg?202306192206"}
    ]
    
    return (
      <SafeAreaView style={styles.container}>
          <FlatList 
            data={savedCody} // selectedImages 리스트 내의 모든 항목에 대해
            numColumns={1}
            renderItem={({item}) => ( // i를 이렇게 render해라
              <CodySet src={{uri:item.image_url}} />
            )} 
          />
          <SaveButton title="저장" />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF', // 하늘색 배경
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      width: 200,
      height: 200,
    },
  });

export default Mycloset_saved;