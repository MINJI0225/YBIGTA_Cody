import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Button, View, Dimensions } from "react-native";

function mycloset_myclothes({navigation}) {
    
    return (
        <View style={styles.container}>
            <Image source={require('../assets/title.png')} />
            <Button title="mycloset_myclothes" onPress={() => navigation.navigate('mycloset_saved')} />
            <StatusBar style="auto" />
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

export default mycloset_myclothes;