import React, {useState} from 'react';
import {FlatList, StyleSheet, View, Dimensions, Text} from 'react-native';
import SaveButton from '../components/SaveButton.js';

function MainPage({navigation}) {
const screenWidth = Math.round(Dimensions.get('window').width);
  return (
    <View style={styles.container}>
      <Text>{screenWidth}</Text>
      <SaveButton
        title='이동' 
        onPress={() => navigation.navigate('Mycloset_main')} 
      />
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

export default MainPage;