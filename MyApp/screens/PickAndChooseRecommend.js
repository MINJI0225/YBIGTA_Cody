import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import RecommendCody from '../components/RecommendCody.js';

function PickAndChooseRecommend({navigation, route}) {
  const {data} = route.params;
  console.log("PickAndChooseRecommend data: ", data);

  const [count, setCount] = useState(0);
  const onPressRight = () => {
    setCount(count + 1);
  };
  const onPressLeft = () => {
    setCount(count - 1);
  };
  return (
      <View style={styles.container}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity onPress={onPressLeft}>
              <Icon name="arrow-left" size={30} color="black" />
            </TouchableOpacity>
            <RecommendCody cody={data[count%3]} />
            <TouchableOpacity onPress={onPressRight}>
              <Icon name="arrow-right" size={30} color="black" />
            </TouchableOpacity>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#FFFFFF', // 하늘색 배경
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText : {
    fontSize : 20,
    fontWeight : 'bold',
    marginBottom: 1,
    marginTop:2
  },
  originalText:{
    fontSize : 20,
    fontWeight : 'bold',
    marginBottom: 15,
    marginTop:20
  },
  pickerContainer: {
    width: 80,
    flexDirection:'row'
  },
  weatherText: {
    fontSize:20,
    marginBottom: 3
  },
  headerText: {
    fontSize: 20,
    marginTop: '25%',
    marginLeft: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight:'bold'
  },
  section: {
    width : 160,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 12,
  },
  checkbox: {
    margin: 8,
  },
  });

export default PickAndChooseRecommend;