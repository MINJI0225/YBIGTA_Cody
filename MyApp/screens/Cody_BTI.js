import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import SaveButton from '../components/SaveButton.js';
function Cody_BTI({ navigation }) {

// usestate생성
  const [gender, setGender] = useState('');
  const [sensitivity1, setSensitivity1] = useState('');
  const [sensitivity2, setSensitivity2] = useState('');
  const [style, setStyle] = useState('');

// DB 저장할 때 value를 숫자로 변경해야할수도 ..
  const genderOptions = [
    { label: '남성', value: '남성' },
    { label: '여성', value: '여성' },
  ];

  const sensitivity1Options = [
    { label: '매우 민감', value: '매우 민감' },
    { label: '민감', value: '민감' },
    { label: '보통', value: '보통' },
    { label: '민감', value: '민감' },
    { label: '둔감', value: '매우 둔감' },
  ];

  const sensitivity2Options = [
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


  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>성별</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
              placeholder={{ //처음에 뜨는 문구 (비활성화되고 null값이 부여됨)
              label: '선택해주세요.',
              value: null,
              }}
              value={gender}
              onValueChange={(value) => setGender(value)}
              items={genderOptions}
              style={pickerSelectStyles}
          />
          <Text style={styles.headerText}>추위에 민감한 정도</Text>
          <RNPickerSelect
            placeholder={{ //처음에 뜨는 문구 (비활성화되고 null값이 부여됨)
            label: '선택해주세요.',
            value: null,
            }}
            value={sensitivity1}
            onValueChange={(value) => setSensitivity1(value)}
            items={sensitivity1Options}
            style={pickerSelectStyles}
          />
          <Text style={styles.headerText}>유행에 민감한 정도</Text>
          <RNPickerSelect
              placeholder={{ //처음에 뜨는 문구 (비활성화되고 null값이 부여됨)
              label: '선택해주세요.',
              value: null,
              }}
              value={sensitivity2}
              onValueChange={(value) => setSensitivity2(value)}
              items={sensitivity2Options}
              style={pickerSelectStyles}
          />
          <Text style={styles.headerText}>평소 선호하는 스타일</Text>
          <RNPickerSelect
              placeholder={{ //처음에 뜨는 문구 (비활성화되고 null값이 부여됨)
              label: '선택해주세요.',
              value: null,
              }}
              value={style}
              onValueChange={(value) => setStyle(value)}
              items={styleOptions}
              style={pickerSelectStyles}
          />
          <SaveButton 
            onPress={() => navigation.navigate('MyStyle')} 
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { //전체화면
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '25%',
    marginBottom: 20,
  },
  pickerContainer: {
    width: 200,
  }
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
  }
});

export default Cody_BTI;
