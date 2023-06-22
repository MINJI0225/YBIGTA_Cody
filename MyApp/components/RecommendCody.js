import React, { useState, } from 'react';
import { Text, FlatList, View, Image, StyleSheet, } from "react-native";
import Checkbox from 'expo-checkbox';
// npx expo install expo-checkbox
// https://docs.expo.dev/versions/latest/sdk/checkbox/

const CodySet = props => {
    const {cody} = props;
    const [isSelected, setIsSelected] = useState(true);

    return (
        <View>
            <Image
                source = {{uri:cody.image_url}}
                style = {styles.image} />
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <FlatList
                    data={cody.hashtag} // selectedImages 리스트 내의 모든 항목에 대해
                    numColumns={3}
                    renderItem={({item}) => ( // i를 이렇게 render해라
                        <Text style={styles.hashtag}>#{item}</Text>
                    )} 
                />
                <Checkbox
                    style={styles.checkbox}
                    value={isSelected}
                    onValueChange={setIsSelected}
                    color={isSelected ? '#AFD3E2' : undefined}
                />
            </View>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
      image : {
        width:300,
        height:300,
        marginBottom:15
      },
      checkbox: {
        marginBottom:10,
      },  
      hashtag: {
        backgroundColor:'#AFD3E2',
        color:'#FFFFFF',
        fontSize : 13,
        marginRight:5,
        paddingHorizontal:7,
        paddingVertical:3,
        marginBottom:10
      }
    });
  
  export default CodySet;