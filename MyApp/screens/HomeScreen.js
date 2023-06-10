import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Button, View, Dimensions } from "react-native";

function HomeScreen({navigation}) {
    
    return (
        <View style={styles.container}>
            <Image source={require('../assets/title.png')} />
            <Button title="시작하기" onPress={() => navigation.navigate('옷BTI')} />
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

export default HomeScreen;