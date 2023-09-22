import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import SaveButton from '../components/SaveButton';
import BarGraph from '../components/BarGraph';
import Separator from '../components/Separator';

function StyleIcon({ navigation, route }) {
  const { data } = route.params;
  console.log(data);

  const dataList= [
    {title: data.style1, percentage:Math.round(data.pre1*100)/100},
    {title: data.style2, percentage:Math.round(data.pre2*100)/100},
    {title: data.style3, percentage:Math.round(data.pre3*100)/100}
  ]

  const findHighestScoringStyle = (data) => {
    let highestScore = -Infinity;
    let highestScoringStyle = data.style1;
    console.log(highestScoringStyle);

    /*for (let style in data) {
      if (data.hasOwnProperty(style)) {
        const score = data[style];
        if (score > highestScore) {
          highestScore = score;
          highestScoringStyle = style;
        }
      }
    }*/

    return highestScoringStyle;
  };

  const highestScoringStyle = findHighestScoringStyle(data);

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

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>{highestScoringStyle}</Text>
        <Image source={styleImageMap[highestScoringStyle]} style={styles.image} />
        <Separator />
        <BarGraph data={dataList} />
        <Separator />
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
    fontSize: 25,
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

export default StyleIcon;