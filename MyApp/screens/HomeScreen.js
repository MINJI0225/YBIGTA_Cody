import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Animated, Text, Image, StyleSheet, Button, View, Dimensions } from 'react-native';

function HomeScreen({ navigation }) {
  const [isReady, setIsReady] = useState(false);
  const translateYAnim = useState(new Animated.Value(0))[0];
  const buttonOpacityAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'COPRGTB': require('../assets/fonts/COPRGTB.ttf'),
      });
      setIsReady(true);
    };

    loadFont();
  }, []);

  useEffect(() => {
    if (isReady) {
      startAnimation();
    }
  }, [isReady]);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateYAnim, {
          toValue: -20,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.timing(buttonOpacityAnim, {
      toValue: 1,
      duration: 500,
      delay: 2000,
      useNativeDriver: true,
    }).start();
  };

  return (
    isReady && (
      <View style={styles.container}>
        <Animated.Text style={[styles.logotext, { transform: [{ translateY: translateYAnim }] }]}>
          CodifyME
        </Animated.Text>
        <Animated.View style={[styles.buttonContainer, { opacity: buttonOpacityAnim }]}>
          <Button
            title="시작하기"
            onPress={() => navigation.navigate('SignInScreen')}
            color="#AFD3E2"
          />
        </Animated.View>
        <StatusBar style="auto" />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AFD3E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    marginTop: 50,
  },
  logotext: {
    fontFamily: 'COPRGTB',
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FFFFFF',
  },
});

export default HomeScreen;




