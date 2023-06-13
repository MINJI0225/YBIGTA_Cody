import React from 'react';
import {Button, StyleSheet, View, TouchableOpacity} from 'react-native';

export function ImageSelectButton({navigation, onPress}) {
  return (
    <View style={styles.button}>
        <Button title='이미지 선택' onPress={onPress}/>
    </View>
  );
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'column',
        width: 100,
        height: 100,
        color: '#808080'
    },
    buttonText: {
        color: '#808080',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ImageSelectButton;