import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Button, View, Dimensions, Text} from "react-native";
import Separator from "../components/separator";
import SaveButton from '../components/SaveButton.js';

function Mycloset_main({navigation}) {
    
    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Button
                    color='#FFFFFF'
                    title="마이 클로젯 설정하기"
                    onPress={() => navigation.navigate('Mycloset_setting')}
                />
            </View>
            <Separator />
            <Text style={styles.subText}>
                가지고 있는 옷을 선택해{'\n'}
                나만의 옷장을 구성해보세요!</Text>
            <Separator />

            <View style={styles.button}>
                <Button
                color='#FFFFFF'
                title="내 옷 골라입기"
                onPress={() => navigation.navigate('Mycloset_myclothes')}
                />
            </View>
            <Separator />
            <Text style={styles.subText}>
                오늘 입고 싶은 옷을 고르고,{'\n'}
                활용 가능한 코디만 추천받아보세요!</Text>
            <Separator />

            <View style={styles.button}>
                <Button
                color='#FFFFFF'
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

            <Separator /><Separator /><Separator />
            <SaveButton />
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
        height: 46,
        backgroundColor:'#FDA9DB',
        borderRadius:5,
        justifyContent:'center'
      },
  });

export default Mycloset_main;