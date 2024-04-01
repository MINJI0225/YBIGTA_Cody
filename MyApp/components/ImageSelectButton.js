import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Separator from './Separator';

export function ImageSelectButton({ navigation, onPress }) {
  const handlePress = () => {
    onPress(); // Call the provided onPress function when the button is pressed
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Image style={styles.image} source={require('../assets/camera2.png')} />
      <Separator/>
      <Separator/>
      <Separator/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'column',
    width: 100,
    height: 100,
    color: '#808080',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 70,
    height: 70,
  },
  buttonText: {
    color: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
  },
  generaltext: {
    color: 'black',
    fontsize: 20
  }
});

export default ImageSelectButton;
