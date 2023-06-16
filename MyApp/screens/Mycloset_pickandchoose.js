import React from 'react';
import { StyleSheet, Image, View, FlatList, Text} from 'react-native';
import SaveButton from '../components/SaveButton.js';
import Separator from "../components/Separator";
import MyCheckBox from "../components/MyCheckBox";


function Mycloset_pickandchoose({navigation}) {
  const inMyClothes = [
    {name : 'white t-shirt'},
    {name : 'green polo shirt'},
    {name : 'blue jean'}];

  const outMyClothes = [
    {name : 'white polo shirt'},
    {name : 'black dress'},
    {name : 'neacklace'},
    {name : 'green overall'},
    {name : 'white sleeveless'}
  ]
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>나의 옷장에 있는 옷{'\n'}</Text>
      <FlatList
        data={inMyClothes}
        numColumns={2}
        renderItem={({item}) => ( // i를 이렇게 render해라
          <MyCheckBox name={item.name} />
        )} 
      />

      <Separator />
      <Text style={styles.titleText}>나의 옷장에 없는 옷{'\n'}</Text>
      <FlatList
        data={outMyClothes}
        numColumns={2}
        renderItem={({item}) => ( // i를 이렇게 render해라
          <MyCheckBox name={item.name} />
        )} 
      />

      <Separator />
      <SaveButton title="코디 조회하기"></SaveButton>
    </View>
  );
}

const styles = StyleSheet.create({
    container : {
      flex: 1,
      backgroundColor: '#FFFFFF', // 하늘색 배경
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleText : {
      fontSize : 20,
      fontWeight : 'bold'
    }   
  });

export default Mycloset_pickandchoose;