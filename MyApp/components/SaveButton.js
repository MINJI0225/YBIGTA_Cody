import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

function SaveButton({navigation, onPress, title}) {
//{ } 안에 onPress 넣고 .. onPress일 때를 버튼 활용하는 screen.js에서 정의해주면 됨
    return (
        <View style={styles.button}>
            <Button color='white' title={title} onPress={onPress}/> 
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'column',
        width: 300,
        height: 46,
        backgroundColor: '#AFD3E2',
        borderRadius:5,
        justifyContent:'center',
        alignContent: 'center'
      },
});

export default SaveButton;