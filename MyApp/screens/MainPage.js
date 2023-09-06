import React, {useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, View, Text, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RecommendCody from '../components/RecommendCody';
import WeatherComponent from '../components/WeatherComponent';
import RNPickerSelect from 'react-native-picker-select';
import Checkbox from 'expo-checkbox';
import Separator from "../components/Separator";
import FutureWeatherButton from '../components/FutureWeatherButton';
import MyClosetButton from '../components/MyClosetButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_URL } from '@env';

const Picker = ({ label, value, onValueChange, items }) => (
  <View style={styles.pickerContainer}>
    {/* 미래 날씨 정보 텍스트 표시 후 줄 바꿈 */}
    <Text style={styles.titleText}>미래 날씨 정보</Text>
    <View style={{flexDirection:'row'}}>
      <RNPickerSelect
        placeholder={{ label: '00', value: null }}
        value={value}
        onValueChange={onValueChange}
        items={items}
        style={pickerSelectStyles}
      />
      <Text style={styles.weatherText}>시간 후</Text>
    </View>
  </View>
);

const hourLaterOptions = [
  {label: '01', value: 1}, {label: '02', value: 2},
  {label: '03', value: 3}, {label: '04', value: 4}, {label: '05', value: 5},
  {label: '06', value: 6}, {label: '07', value: 7}, {label: '08', value: 8},
  {label: '09', value: 9}, {label: '10', value: 10}, {label: '11', value: 11},
  {label: '12', value: 12}, {label: '13', value: 13}, {label: '14', value: 14},
  {label: '15', value: 15}, {label: '16', value: 16}, {label: '17', value: 17}
]

function MainPage({navigation}) {

  // useState hook works like this:
  // const [stateVariable, setStateVariable] = useState(initialValue);
  // stateVariable is the variable that you want to keep track of
  // setStateVariable is the function that you 'use to change the value of stateVariable'
  // useState(initialValue) is the initial value of stateVariable
  // useState returns an array of [stateVariable, setStateVariable]
  const [cody, setCody] = useState([]);
  const [hourLater, setHourLater] = useState(null);
  const [isMyCloset, setIsMyCloset] = useState(false);
  const [isForFuture, setIsForFuture] = useState(false);

  // Set modal visibililty
  const [modalVisible, setModalVisible] = useState(false);
  
  // This is for fetching cody. Always fetches cody when the page is loaded,
  // and fetches cody again when the hourLater, isForFuture, isMyCloset is changed.
  useEffect(() => {
    const fetchData = async () => {
      try {
        let payload = {
          hour: hourLater,
          isFuture: isForFuture,
          isMyCloset: isMyCloset,
        };
        const response = await fetch(`${API_URL}/codimap/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Success:', data);
          setCody(data);
        } else {
          console.log('Request failed in MainPage.js, while fetching cody');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, [hourLater, isForFuture, isMyCloset]);
  
  // location
  latitude = 37.57636667;
  longitude = +126.9388972;

  // Date
  let now = new Date(); //현재 날짜 시간
  let todayMonth = now.getMonth() + 1;
  let todayDate = now.getDate()
  const week = ['일', '월', '화', '수', '목', '금', '토', '일'];
  let dayOfWeek = week[now.getDay()];
  let nowHour = now.getHours();

  const getFutureTime = (hourLater) => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + hourLater * 60 * 60 * 1000);
    
    const futureMonth = futureDate.getMonth() + 1;
    const futureDay = futureDate.getDate();
    const futureWeekDay = week[futureDate.getDay()];
    const futureHour = futureDate.getHours();
    
    return `${futureMonth}월 ${futureDay}일 ${futureWeekDay}요일 ${futureHour}시`;
  }

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

  // Time picker
  const[isDone, setIsDone] = useState(false);
  return (
    // Conditional rendering - if isForFuture is false, show today's weather and time
    // if isForFuture is true, show time picker and future weather
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Time picker */}
            <Picker
              label="시간"
              value={hourLater}
              onValueChange={setHourLater}
              items={hourLaterOptions}
            />

            {/* Done button */}
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                setIsDone(true);
              }}
            >
              <Icon name="check" size={15} color="white" />
            </TouchableOpacity>
            
            {/* <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
                setIsDone(true);
              }}
            >
              <Text style={styles.textStyle}>완료</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>

      {!isForFuture ? // if isForFuture is false, show today's weather and time
        <View style={{alignItems:'center'}}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            {/* <Text style={styles.originalText}>{todayTime()}</Text> */}
            <Text style={styles.originalText}>{getFutureTime(hourLater)}</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Icon name="sun-o" size={25} color="black" style={{marginBottom:5}}/>
            <WeatherComponent lat={latitude} lon={longitude} hour_later={hourLater}/>
          </View>
        </View>
        // if isForFuture is true, show time picker and future weather
      : (<View style={{alignItems:'center'}}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Picker label="시간" value={hourLater} onValueChange={setHourLater} items={hourLaterOptions}/>
            <Text style={styles.titleText}>  후 외출</Text>
          </View>
          {hourLater ?
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Icon name="sun-o" size={25} color="black" style={{marginBottom:5}}/>
            <WeatherComponent lat={latitude} lon={longitude} hour_later={hourLater}/>
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
        {cody && cody.length > 0 ? (
    <RecommendCody cody={cody[count % cody.length]} />

  ) : <Text>wrong</Text>}
        <TouchableOpacity onPress={onPressRight}>
          <Icon name="arrow-right" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{flexDirection:'row', justifyContent:'space-between', width:'75%', marginTop: 23}}>
        <FutureWeatherButton
          onPress={() => {
            setModalVisible(true);
          }}
        />
        <MyClosetButton
          selected={isMyCloset}
          onPress={() => {
            setIsMyCloset(!isMyCloset);
          }}
        />
      </View>
      
      {/* <View style={{flexDirection : 'row'}}>
        <View style={styles.section}>
          <Checkbox style={styles.checkbox} value={isForFuture} onValueChange={setIsForFuture} color={isForFuture ? '#AFD3E2' : undefined}/>
          <Text style={styles.paragraph}>나중에 입을 옷 확인하기</Text>
        </View>
        <View style={styles.section}>
          <Checkbox style={styles.checkbox} value={isMyCloset} onValueChange={setIsMyCloset} color={isMyCloset ? '#AFD3E2' : undefined}/>
          <Text style={styles.paragraph}>내 옷장의 옷들로만 보기</Text>
        </View>
      </View> */}
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
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },

    modalView: {
      width: 200,
      height: 170,
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 25,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    doneButton: {
      width: 130,
      backgroundColor: "#4CAF50", // 또는 원하는 색상
      borderRadius: 15, // 둥근 모서리
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5, // Android용 그림자
      shadowColor: "#000", // iOS용 그림자
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 2
    },

    originalText:{
      fontSize : 20,
      fontWeight : 'bold',
      marginBottom: 15,
      marginTop:20
    },
    pickerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 260,
      flexDirection:'column'
    },
    titleText: {
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
      alignSelf: 'stretch', // This will make the text take the full width available
      marginBottom: 19,
    },
    weatherText: {
      fontSize:20,
      marginBottom: 24,
      marginTop: 8,
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
    width: 50,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    marginBottom: 0,
    marginRight: 10,
    textAlign: 'center',
  }
});
export default MainPage;
