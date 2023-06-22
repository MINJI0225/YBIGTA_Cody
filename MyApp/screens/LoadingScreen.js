import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Image } from 'react-native';
import Separator from '../components/Separator.js';
import Carousel from 'react-native-snap-carousel';
import AccumulativeGraph from '../components/AccumalativeGraph.js';

export default function LoadingScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null); // 데이터 상태 추가
  const carouselRef = useRef(null);

  const urlList = [
    { image_url: require('../assets/styleicon_transparent_background/Dandy2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Casual2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Romantic2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Americancasual2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Chic2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Formal2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Girlish2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Golf2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Gorpcore2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Retro2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Romantic2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Sports2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Street2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Dandy2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Casual2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Romantic2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Americancasual2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Chic2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Formal2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Girlish2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Golf2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Gorpcore2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Retro2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Romantic2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Sports2.png') },
    { image_url: require('../assets/styleicon_transparent_background/Street2.png') },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/userStyle/get'); // 모델을 돌리고 응답을 받는 API 엔드포인트 URL로 수정해야함

        if (response.ok) {
          console.log('모델 응답 성공');
          const data = await response.json();
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
        console.error('Error:', error);
        setIsLoading(false);
        // 에러 처리
      }
    };

    fetchData(); // 데이터 로딩 함수 호출

  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Separator />
        <Carousel
          ref={carouselRef}
          data={urlList}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              {/* 이미지 표시 */}
              <Image style={styles.image} source={item.image_url} />
            </View>
          )}
          sliderWidth={300}
          itemWidth={100}
          autoplay={true}
          autoplayInterval={2000}
        />
      </View>
    );
  } else if (data) { // 데이터가 있을 때
    return (
      <View style={styles.container}>
        <AccumulativeGraph data={data} /> {/* AccumulativeGraph 컴포넌트 렌더링 */}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#AFD3E2" />
        <Separator />
        <Text>Loading...</Text>
      </View>
    );
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
