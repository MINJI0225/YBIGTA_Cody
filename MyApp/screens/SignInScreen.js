import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import SaveButton from '../components/SaveButton.js';

function SignInScreen({ navigation }) {
  // Define states
  const [userId, setId] = useState("");
  const [password, setPassword] = useState("");

  // Define function to check if all values have been set and save data
  const signIn = () => {

    // Check if all values have been set
    if(userId && password) {
      // If yes, navigate and/or send data to server

      // Prepare data to send to server
      const userData = {
        userId: userId,
        password: password,
      };

      // Send data to server
      fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      // Navigate to next screen
      navigation.navigate('Cody_BTI');
    
    } else {
      // If no, alert the user to make a selection
      alert("모두 입력해주세요");
    }
  }

  const signUp = () => {
    navigation.navigate('SignUpScreen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TextInput
            style={styles.textInput}
            placeholder="아이디"
            onChangeText={setId}
            value={userId}
            autoCapitalize='none'
        />
        <TextInput
            style={styles.textInput}
            placeholder="비밀번호"
            onChangeText={setPassword}
            value={password}
            autoCapitalize='none'
          />
        <View style={styles.buttonContainer}>
          <SaveButton 
            title='로그인' onPress={signIn}
          />
        </View>
        <View style={styles.line}/>
        <TouchableOpacity onPress={signUp}>
            <Text style={{color: '#000000', fontSize: 14}}>회원가입하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { //전체화면
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 300,
    height: 1,
    backgroundColor: '#D9D9D9',
    marginVertical: 15
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    //marginTop: '25%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  textContainer: {
    width: 280,
    alignContent: 'left',
    marginTop: 10
  },
  text: {
    fontSize: 14,
    //marginTop: '25%',
    marginBottom: 5,
    //alignItems: 'left',
    //textAlign: 'left'
  },
  textInput: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    height: 46,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent:'center',
    alignContent: 'center',
    marginBottom: 5,
    paddingLeft: 10,
    //placeholderTextColor: '#D9D9D9',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },  
  signUpButton: {
    titleStyle: {
        color: '#D9D9D9'
    },
    width: 20,
    color: '#D9D9D9'
  }
});

export default SignInScreen;