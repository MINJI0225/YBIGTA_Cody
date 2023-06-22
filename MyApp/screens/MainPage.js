import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Div, Platform, FlatList, ScrollView, StyleSheet, View, Dimensions, Button, Text, Image} from 'react-native';
import SaveButton from '../components/SaveButton.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import WeatherComponent from '../components/WeatherComponent';
import RecommendCody from '../components/RecommendCody';

function MainPage({navigation}) {
  const savedCody = [
    {image_url: "https://image.msscdn.net/images/codimap/detail/5873/detail_5873_1_500.jpg?202306192206",
    hashtag:['hello', 'my', 'name']},
    {image_url: "https://image.msscdn.net/images/codimap/detail/3369/detail_3369_1_500.jpg?202306192206",
    hashtag:['is', 'se', 'a']},
    {image_url: "https://image.msscdn.net/images/codimap/detail/1937/detail_1937_1_500.jpg?202306192206",
    hashtag:['h','on','g']}
  ]

  // Location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  latitude = 37.7858;
  longitude = +127.404;
  // Date
  const todayTime = () => {
    let now = new Date(); //현재 날짜 시간
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate()
    const week = ['일', '월', '화', '수', '목', '금', '토', '일'];
    let dayOfWeek = week[now.getDay()];

    return todayMonth + '월 ' + todayDate + '일 ' + dayOfWeek + '요일 '
  }
  /*
  const todayDate = () => {
    let now = new Date(); //현재 날짜 시간
    let todayYear = now.getFullYear();
    let todayMonth = ('00'+(now.getMonth() + 1)).slice(-2);
    let todayDate = ('00'+now.getDate()).slice(-2);
    let nowHour = ('00'+now.getHours()).slice(-2);
    let nowMinutes = ('00'+now.getMinutes()).slice(-2);
    let nowSeconds = ('00'+now.getSeconds()).slice(-2);
    return todayYear + '-' + todayMonth + '-' + todayDate + ' ' +nowHour+':'+nowMinutes+':'+nowSeconds
  }
  */
  // Button
  const [count, setCount] = useState(0);
  const onPressRight = () => {
    setCount(count + 1);
  };
  const onPressLeft = () => {
    setCount(count - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{todayTime()}</Text>
      <WeatherComponent lon={longitude} lat={latitude} />
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <TouchableOpacity onPress={onPressLeft}>
          <Icon name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <RecommendCody cody={savedCody[count%3]} />
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
      fontWeight : 'bold'
    }   
});

export default MainPage;