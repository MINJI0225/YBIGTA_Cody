import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingScreen({navigation}) {
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('StyleIcon'); // 15초 후에 Page2로 이동
    }, 10000); // 10초를 밀리초 단위로 설정

    return () => clearTimeout(timeout); // 컴포넌트 언마운트 시 타임아웃 제거
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#AFD3E2" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});