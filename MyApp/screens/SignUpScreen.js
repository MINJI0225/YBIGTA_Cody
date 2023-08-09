import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import SaveButton from '../components/SaveButton.js';


function SignUpScreen({ navigation }) {
  // Define states
  const [userId, setId] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  // Define function to check if all values have been set and save data
  const saveUserData = () => {

    // Check if all values have been set
    if(userId && password1 && password2 && email) {
      // Prepare data to send to server
      if (password1 == password2) {
        const userData = {
          userId: userId,
          email: email,
          password: password1,
        };
  
        // Send data to server
        fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData),
        })
        
        .then(response => {
          // Print the status and ok property of the response object
          console.log('Response status:', response.status);
          console.log('Response ok:', response.ok);
          return response.json();
        })
        .then(data => {
          if (data.error) {
            // Handle error (e.g., user already exists)
            alert(data.error);
          } else {
            console.log('Success:', data);
            // Navigate to next screen
            navigation.navigate('Cody_BTI');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      } else {
        alert("비밀번호가 일치하지 않습니다");
      }
    } else {
      // If no, alert the user to make a selection
      alert("모두 입력해주세요");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text
            style={styles.text}
          >{'아이디'}</Text>
        </View>
        <TextInput
            style={styles.textInput}
            placeholder="영문, 숫자 5-11자"
            onChangeText={setId}
            value={userId}
            autoCapitalize='none'
            placeholderTextColor="#D9D9D9"
          />
          <View style={styles.textContainer}>
          <Text
            style={styles.text}
          >{'비밀번호'}</Text>
        </View>
        <TextInput
            style={styles.textInput}
            placeholder="영문, 숫자, 특수문자 조합 최소 8자"
            onChangeText={setPassword1}
            value={password1}
            autoCapitalize='none'
            placeholderTextColor="#D9D9D9"
          />
          <TextInput
            style={styles.textInput}
            placeholder="비밀번호 확인"
            onChangeText={setPassword2}
            value={password2}
            autoCapitalize='none'
            placeholderTextColor="#D9D9D9"
          />
          <View style={styles.textContainer}>
          <Text
            style={styles.text}
          >{'이메일'}</Text>
        </View>
        <TextInput
            style={styles.textInput}
            placeholder="영문, 숫자 5-11자"
            onChangeText={setEmail}
            value={email}
            autoCapitalize='none'
            placeholderTextColor="#D9D9D9"
          />
        <View style={styles.buttonContainer}>
          <SaveButton 
            title='회원가입' onPress={saveUserData}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { //전체화면
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 290,
    alignContent: 'left',
    marginTop: 10
  },
  text: {
    fontSize: 12,
    marginBottom: 5,

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
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },  
});

export default SignUpScreen;
