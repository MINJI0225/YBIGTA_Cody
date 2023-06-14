import React, {useState, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Switch, Image, StyleSheet, Button, View, TouchableOpacity, Text } from "react-native";
import ImageButton from "../components/ImageButton";


function Mycloset_Myclothes({navigation}) {
    const mylink = '../assets/closet/green_poloshirt.png'
    const myimg = require('../assets/closet/white_tshirt.png');
    return (
        <View style={styles.container}>
            <ImageButton 
              imgurl={myimg} />
            <Text>{myimg}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#AFD3E2', // 하늘색 배경
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      width: 200,
      height: 200,
    },
  });

export default Mycloset_Myclothes;