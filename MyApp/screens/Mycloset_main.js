import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Text} from "react-native";
import Separator from '../components/Separator.js';

function Mycloset_main({navigation}) {
    
    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Button
                    color='black'
                    title="마이 클로젯 설정하기"
                    onPress={() => navigation.navigate('Mycloset_setting')}
                />
            </View>
            <Separator />
            <Text style={styles.subText}>
                가지고 있는 옷을 선택해{'\n'}
                나만의 옷장을 구성해보세요!</Text>
            <Separator />
            <Separator />
            <View style={styles.button}>
                <Button
                color='black'
                title="내 옷 골라입기"
                onPress={() => navigation.navigate('Mycloset_pickandchoose')}
                />
            </View>
            <Separator />
            <Text style={styles.subText}>
                오늘 입고 싶은 옷을 고르고,{'\n'}
                활용 가능한 코디만 추천받아보세요!</Text>
            <Separator />
            <Separator />
            <View style={styles.button}>
                <Button
                color='black'
                title="저장한 코디 목록"
                onPress={() => navigation.navigate('Mycloset_saved')}
                />
            </View>
            <Separator />
            <Text style={styles.subText}>
                추천받았던 코디들 중{'\n'}
                좋았던 코디만 저장해서 참고해보세요!</Text>
            <Separator />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center'
    },
    subText: {
        fontSize: 14,
        textAlign : 'center',
      },
      button: {
        display: 'flex',
        flexDirection: 'column',
        width: 200,
        height: 59,
        borderColor:'#AFD3E2',
        borderWidth:5,
        borderRadius:5,
        justifyContent:'center'
      },
  });

export default Mycloset_main;