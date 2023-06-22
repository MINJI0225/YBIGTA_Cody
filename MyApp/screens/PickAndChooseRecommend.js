import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import RecommendCody from '../components/RecommendCody.js';

function PickAndChooseRecommend({navigation}) {
  const [defaultCody,setDefaultCody] = useState([
    {image_url: "https://image.msscdn.net/images/codimap/detail/5873/detail_5873_1_500.jpg?202306192206",
    hashtag:['hello', 'my', 'name'], title:'크크', subText:"ddddddddddddd"
    },
    {image_url: "https://image.msscdn.net/images/codimap/detail/3369/detail_3369_1_500.jpg?202306192206",
    hashtag:['is', 'se', 'a'], title:'케케', subText:"ddddddddddddd"
    },
    {image_url: "https://image.msscdn.net/images/codimap/detail/1937/detail_1937_1_500.jpg?202306192206",
    hashtag:['h','on','g'], title:'쿠쿠', subText:"ddddddddddddd"
    }
  ])

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
            <RecommendCody cody={defaultCody[count%3]} />
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