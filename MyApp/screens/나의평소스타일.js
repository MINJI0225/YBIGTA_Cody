import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SaveButton from '../components/saveButton.js';

function 나의평소스타일({ navigation }) {
    return (
        <View style={styles.container}>
            <SaveButton 
            onPress={() => navigation.navigate('HomeScreen')} 
            />
        </View>
  );
}

const styles = StyleSheet.create({
    container: { //전체화면
      flex: 1,
      //justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    }
});

export default 나의평소스타일;
