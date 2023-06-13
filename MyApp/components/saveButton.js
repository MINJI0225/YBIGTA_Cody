import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

function SaveButton({navigation}) {
    const handlePress = () => {
        fetch('http://localhost:5000/save', { // replace with your Flask server's URL and endpoint
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <View style={styles.button}>
            <Button color='white' title="저장" onPress={handlePress}/> 
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'column',
        width: 200,
        height: 46,
        backgroundColor: '#AFD3E2',
        borderRadius:5,
        justifyContent:'center',
    },
});

export default SaveButton;
