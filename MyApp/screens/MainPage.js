import React, {useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, View, Text, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RecommendCody from '../components/RecommendCody';
import WeatherComponent from '../components/WeatherComponent';
import RNPickerSelect from 'react-native-picker-select';
import Checkbox from 'expo-checkbox';
import Separator from "../components/Separator";

const Picker = ({ label, value, onValueChange, items }) => (
  <View style={styles.pickerContainer}>
    <RNPickerSelect
      placeholder={{ label: '??', value: null }}
      value={value}
      onValueChange={onValueChange}
      items={items}
      style={pickerSelectStyles}
    />
    <Text style={styles.headerText}>{label}</Text>
  </View>
);

const hourLaterOptions = [
  {label: '00', value: 0}, {label: '01', value: 1}, {label: '02', value: 2},
  {label: '03', value: 3}, {label: '04', value: 4}, {label: '05', value: 5},
  {label: '06', value: 6}, {label: '07', value: 7},
]

function MainPage({navigation}) {
  //const [date, setDate] = useState(null);
  //const [hour, setHour] = useState(null);
  const [hourLater, setHourLater] = useState(null);

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
  const [futureCody, setFutureCody] = useState([
    {image_url: "https://image.msscdn.net/images/codimap/detail/19546/detail_19546_1_500.jpg?202306192206",
    hashtag:['aaa', 'bbb', 'ccc'], title:'hihi', subText:"ddddddddddddd"
    },
    {image_url: "https://image.msscdn.net/images/codimap/detail/18371/detail_18371_1_500.jpg?202306192206",
    hashtag:['is', 'se', 'a'], title:'hello', subText:"ddddddddddddd"
    },
    {image_url: "https://image.msscdn.net/images/codimap/detail/5105/detail_5105_1_500.jpg?202306192206",
    hashtag:['h','on','g'], title:'hihi', subText:"ddddddddddddd"
    }
  ])
  const [myClosetCody, setMyClosetCody] = useState([
    {image_url: "https://image.msscdn.net/images/codimap/detail/5105/detail_5105_1_500.jpg?202306192206",
    hashtag:['aaa', 'bbb', 'ccc'], title:'kkkeee', subText:"ddddddddddddd"
    },
    {image_url: "https://image.msscdn.net/images/codimap/detail/18371/detail_18371_1_500.jpg?202306192206",
    hashtag:['is', 'se', 'a'], title:'Hi~~', subText:"ddddddddddddd"
    },
    {image_url: "https://image.msscdn.net/images/codimap/detail/5105/detail_5105_1_500.jpg?202306192206",
    hashtag:['h','on','g'], title:'mmmm', subText:"ddddddddddddd"
    }
  ])
  const [myFutureClosetCody, setFutureMyClosetCody] = useState([
    {image_url: "https://image.msscdn.net/images/codimap/detail/18371/detail_18371_1_500.jpg?202306192206",
    hashtag:['aaa', 'bbb', 'ccc'], title:'dlsljkd', subText:"ddddddddddddd"
    },
    {image_url: "https://image.msscdn.net/images/codimap/detail/18371/detail_18371_1_500.jpg?202306192206",
    hashtag:['is', 'se', 'a'], title:'dlkdl', subText:"ddddddddddddd"
    },
    {image_url: "https://image.msscdn.net/images/codimap/detail/5105/detail_5105_1_500.jpg?202306192206",
    hashtag:['h','on','g'], title:'안녕', subText:"ddddddddddddd"
    }
  ])
  
  // location
  latitude = 37.7858;
  longitude = +127.404;

  // Date
  let now = new Date(); //현재 날짜 시간
  let todayMonth = now.getMonth() + 1;
  let todayDate = now.getDate()
  const week = ['일', '월', '화', '수', '목', '금', '토', '일'];
  let dayOfWeek = week[now.getDay()];
  let nowHour = now.getHours();

  const todayTime = () => {
    return todayMonth + '월 ' + todayDate + '일 ' + dayOfWeek + '요일 ' + nowHour + '시 '
  }
    
  // Button
  const [count, setCount] = useState(0);
  const onPressRight = () => {
    setCount(count + 1);
  };
  const onPressLeft = () => {
    setCount(count - 1);
  };

  // 시간 변화량
  const[isDone, setIsDone] = useState(false);
  const [isMyCloset, setIsMyCloset] = useState(false);
  const [isForFuture, setIsForFuture] = useState(false);
  const futureDegree = [29, 29, 28, 27, 25, 24, 23, 22]
  return (
    <View style={styles.container}>
      {!isForFuture ?
        <View style={{alignItems:'center'}}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={styles.originalText}>{todayTime()}</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Icon name="sun-o" size={25} color="black" style={{marginBottom:5}}/>
            <WeatherComponent lat={latitude} lon={longitude} />
          </View>
        </View>
      : (<View style={{alignItems:'center'}}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Picker label="시간" value={hourLater} onValueChange={setHourLater} items={hourLaterOptions}/>
            <Text style={styles.titleText}>  후 외출</Text>
          </View>
          {hourLater ?
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Icon name="sun-o" size={25} color="black" style={{marginBottom:5}}/>
            <Text style={styles.weatherText}>   {futureDegree[hourLater]}°C</Text>
          </View>
          : <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={styles.weatherText}>    °C</Text>
            </View>}
        </View>)}      
      
      <Separator />
      <Separator />
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <TouchableOpacity onPress={onPressLeft}>
          <Icon name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
        {isForFuture&&hourLater ? 
          (isMyCloset ? <RecommendCody cody={myFutureClosetCody[count%3]} />
            : <RecommendCody cody={futureCody[count%3]} /> )
          : (isMyCloset ? <RecommendCody cody={myClosetCody[count%3]} /> 
              : <RecommendCody cody={defaultCody[count%3]} />)}
        <TouchableOpacity onPress={onPressRight}>
          <Icon name="arrow-right" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{flexDirection : 'row'}}>
        <View style={styles.section}>
          <Checkbox style={styles.checkbox} value={isForFuture} onValueChange={setIsForFuture} color={isForFuture ? '#AFD3E2' : undefined}/>
          <Text style={styles.paragraph}>미래 코디 확인하기</Text>
        </View>
        <View style={styles.section}>
          <Checkbox style={styles.checkbox} value={isMyCloset} onValueChange={setIsMyCloset} color={isMyCloset ? '#AFD3E2' : undefined}/>
          <Text style={styles.paragraph}>내 옷장의 옷들로만 보기</Text>
        </View>
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    marginBottom: 0,
  }
});
export default MainPage;
