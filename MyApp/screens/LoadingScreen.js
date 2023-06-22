import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://your-server-url/api/model'); // 모델을 돌리고 응답을 받는 API 엔드포인트 URL로 수정해야함

        if (response.ok) {
          console.log('모델 응답 성공');
          const data = await response.json();
          navigation.navigate('StyleIcon', { data });
           // 응답을 처리한 후에 캐릭터 띄우는 화면으로 데이터와 함께 이동
        } else {
          console.log('모델 응답 실패');
        }
      } catch (error) {
        console.error('Error:', error);
      }

      setIsLoading(false);
    };

    const timeout = setTimeout(() => {
      fetchData();
    }, 10000); // 10초를 밀리초 단위로 설정

    return () => clearTimeout(timeout); // 컴포넌트 언마운트 시 타임아웃 제거
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#AFD3E2" />
      </View>
    );
  }

  return null; // 로딩이 완료되면 null을 반환하여 화면에서 이 컴포넌트를 숨깁니다.
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
