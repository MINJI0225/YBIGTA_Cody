import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

function saveButton({navigation, onPress}) {
//{ } 안에 onPress 넣고 .. onPress일 때를 버튼 활용하는 screen.js에서 정의해주면 됨
    return (
        <View style={styles.button}>
            <Button title="저장" onPress={onPress}/> 
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        margintop:'25%',
        display: 'flex',
        flexDirection: 'column',
        width: 200,
        height: 46,
        backgroundColor: '#AFD3E2',
        borderRadius:5
      },
});

export default saveButton;