import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import SaveButton from '../components/SaveButton.js';
import { LinearGradient } from 'expo-linear-gradient';
import { API_URL } from '@env';

const Picker = ({ label, value, onValueChange, items }) => (
  <View style={styles.pickerContainer}>
    <Text style={styles.headerText}>{label}</Text>
    <RNPickerSelect
      placeholder={{ label: '선택해주세요.', value: null }}
      value={value}
      onValueChange={onValueChange}
      items={items}
      style={pickerSelectStyles}
    />
  </View>
);

// DB 저장할 때 value를 숫자로 변경해야할수도 .. -> 괜찮
const genderOptions = [
  { label: '남성', value: '남성' },
  { label: '여성', value: '여성' },
];

const sensitivityOptions = [
  { label: '매우 민감', value: '매우 민감' },
  { label: '민감', value: '민감' },
  { label: '보통', value: '보통' },
  { label: '민감', value: '민감' },
  { label: '둔감', value: '매우 둔감' },
];

const styleOptions = [
  { label: '스트릿', value: 'street' },
  { label: '아메카지', value: 'amekaji' },
  { label: '캐주얼', value: 'casual' },
  { label: '포멀', value: 'formal' },
  { label: '레트로', value: 'retro' },
];


function Cody_BTI({ navigation }) {
  // Define states
  const [gender, setGender] = useState('');
  const [sensitivity1, setSensitivity1] = useState('');
  const [sensitivity2, setSensitivity2] = useState('');
  const [style, setStyle] = useState('');

  // Define function to check if all values have been set and save data
  const saveData = () => {
    // Check if all values have been set
    if(gender && sensitivity1 && sensitivity2 && style) {
      // If yes, navigate and/or send data to server

      // Prepare data to send to server
      let data = {
        gender: gender,
        sensitivity1: sensitivity1,
        sensitivity2: sensitivity2,
        style: style
      };

      // Send data to server
      fetch(`${API_URL}/api/saveData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      // Navigate to next screen
      navigation.navigate('MyStyle');
    
    } else {
      // If no, alert the user to make a selection
      alert("전부 선택해야 합니다!!!");
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#AFD3E2']}
        style={styles.gradientBackground}
      >
      <View style={styles.contentContainer}>
        <Picker label="성별" value={gender} onValueChange={setGender} items={genderOptions} />
        <Picker label="더위에 민감한 정도" value={sensitivity1} onValueChange={setSensitivity1} items={sensitivityOptions} />
        <Picker label="유행에 민감한 정도" value={sensitivity2} onValueChange={setSensitivity2} items={sensitivityOptions} />
        <Picker label="평소 선호하는 스타일" value={style} onValueChange={setStyle} items={styleOptions} />
        <View style={styles.buttonContainer}>
          <SaveButton 
            title='저장' onPress={saveData}
          />
        </View>
      </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    //marginTop: '25%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },  
  pickerContainer: {
    width: 200,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
    marginBottom: 50
  }
});

export default Cody_BTI;
