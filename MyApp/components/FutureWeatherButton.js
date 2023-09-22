import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function FutureWeatherButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Icon name="clock-o" size={20} color="#000" />
      <Text style={styles.buttonText}>미래 날씨 정보</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row', // 아이콘과 텍스트를 수평으로 배열합니다.
    alignItems: 'center', // 아이콘과 텍스트를 중앙 정렬합니다.
    backgroundColor: '#FFF', // 배경색은 흰색입니다.
    borderRadius: 20, // 모서리를 둥글게 만듭니다.
    padding: 10, // 내부 패딩을 추가합니다.
    elevation: 3, // 안드로이드에서 그림자 효과를 추가합니다.
    shadowOffset: { width: 1, height: 1 }, // iOS에서 그림자 효과를 추가합니다.
    shadowRadius: 3,
    shadowOpacity: 0.3
  },
  buttonText: {
    marginLeft: 10, // 아이콘과 텍스트 사이에 여백을 추가합니다.
    color: '#000', // 텍스트 색은 검은색입니다.
    fontWeight: 'bold' // 텍스트를 두껍게 만듭니다.
  }
});

export default FutureWeatherButton;
