import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import Separator from '../components/Separator.js';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null); // Add data state
  useEffect(() => {
    // 이곳에 로딩시 수행할 작업들을 넣어주세요.
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#AFD3E2" />
      <Separator />
      <Text>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselContentContainer: {
    paddingHorizontal: 10, // 수평 간격 조정
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});