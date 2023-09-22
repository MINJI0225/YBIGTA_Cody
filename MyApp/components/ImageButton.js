import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
const ImageButton = ({ imageKey, src, onImagePress }) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleImagePress = () => {
    // console.log('key:', imageKey);
    setIsClicked(!isClicked);
    onImagePress(imageKey, !isClicked);
  };
  return (
    <TouchableOpacity onPress={handleImagePress}>
      <Image style={isClicked ? styles.clicked : styles.unclicked} source={src} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  unclicked: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'white',
    margin: 5,
    width: 100,
    height: 150,
  },
  clicked: {
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#AFD3E2',
    margin: 5,
    width: 100,
    height: 150,
  },
});
export default ImageButton;