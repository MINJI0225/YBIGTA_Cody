import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Animated, Text, Image, StyleSheet, Button, View, Dimensions } from 'react-native';

function HomeScreen({ navigation }) {
  const [isReady, setIsReady] = useState(false);
  const translateYAnim = useState(new Animated.Value(0))[0];
  const fadeInAnim = useState(new Animated.Value(0))[0];
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
    Animated.parallel([
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
      ),
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(buttonOpacityAnim, {
        toValue: 1,
        duration: 500,
        delay: 3000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    isReady && (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.logotextContainer,
            { transform: [{ translateY: translateYAnim }], opacity: fadeInAnim },
          ]}
        >
          <Image
            source={require('../assets/hanger.png')}
            style={styles.image}
          />
          <Text style={styles.logotext}>CodifyME</Text>
        </Animated.View>
        <Animated.View
          style={[styles.buttonContainer, { opacity: buttonOpacityAnim }]}
        >
          <Button
            title="시작하기                "
            onPress={() => navigation.navigate('SignInScreen')}
            color="grey"
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
  logotextContainer: {
    alignItems: 'center',
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  }
});

