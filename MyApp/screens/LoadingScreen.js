import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Image } from 'react-native';
import Separator from '../components/Separator.js';

export default function LoadingScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null); // 데이터 상태 추가
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/userStyle/get'); // 모델을 돌리고 응답을 받는 API 엔드포인트 URL로 수정해야함
        if (response.ok) {
          console.log('모델 응답 성공');
          const data = await response.json();
          console.log(data);
          setIsLoading(false);
          setData(data); // 데이터 설정
          navigation.navigate('StyleIcon', { data });
          // 응답을 처리한 후에 캐릭터 띄우는 화면으로 데이터와 함께 이동
        } else {
          console.log('모델 응답 실패');
          setIsLoading(false);
          // 에러 처리
        }
      } catch (error) {
        console.log('Error:', error);
        setIsLoading(false);
        // 에러 처리
      }
    };
    fetchData(); // 데이터 로딩 함수 호출
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#AFD3E2" />
        <Separator />
        <Text>Loading...</Text>
      </View>
    )
  }
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