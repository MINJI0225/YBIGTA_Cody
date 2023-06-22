import React, { useState } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import SaveButton from '../components/SaveButton';

function StyleIcon({ navigation, style }) {
  const [selectedStyle, setSelectedStyle] = useState('');

  const styleImageMap = {
    '아메리칸캐주얼': require('../assets/styleicon/AmericanCasual.png'),
    '캐주얼': require('../assets/styleicon/Casual.png'),
    '시크': require('../assets/styleicon/Chic.png'),
    '댄디': require('../assets/styleicon/Dandy.png'),
    '포멀': require('../assets/styleicon/Formal.png'),
    '걸리시': require('../assets/styleicon/Girlish.png'),
    '골프': require('../assets/styleicon/Golf.png'),
    '고프코어': require('../assets/styleicon/Gorpcore.png'),
    '레트로': require('../assets/styleicon/Retro.png'),
    '로맨틱': require('../assets/styleicon/Casual.png'),
    '스포츠': require('../assets/styleicon/Sports.png'),
    '스트릿': require('../assets/styleicon/Street.png'),
  };

  const handleStyleChange = (style) => {
    setSelectedStyle(style);
  };

  const pickerItems = [
    { label: '아메리칸캐주얼', value: '아메리칸캐주얼' },
    { label: '캐주얼', value: '캐주얼' },
    { label: '시크', value: '시크' },
    { label: '댄디', value: '댄디' },
    { label: '포멀', value: '포멀' },
    { label: '걸리시', value: '걸리시' },
    { label: '골프', value: '골프' },
    { label: '고프코어', value: '고프코어' },
    { label: '레트로', value: '걸리시' },
    { label: '로맨틱', value: '걸리시' },
    { label: '스포츠', value: '걸리시' },
    { label: '스트릿', value: '걸리시' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>스타일을 선택해주세요</Text>
        <RNPickerSelect
          value={selectedStyle}
          onValueChange={handleStyleChange}
          style={pickerSelectStyles}
          items={pickerItems}
        />
        {selectedStyle && (
          <Image source={styleImageMap[selectedStyle]} style={styles.image} />
        )}
        <SaveButton title='코디 추천 받으러 가기' onPress={() => navigation.navigate('TabNavigation')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginBottom: 20
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    marginBottom: 20,
  },
});

export default StyleIcon;
