import React, { useState, } from 'react';
import { View, Image, StyleSheet, } from "react-native";
import Checkbox from 'expo-checkbox';
// npx expo install expo-checkbox
// https://docs.expo.dev/versions/latest/sdk/checkbox/

const CodySet = props => {
    const {src} = props;
    const [isSelected, setIsSelected] = useState(true);

    return (
        <View>
            <Image
                source = {src}
                style = {styles.image} />
            <Checkbox
                style={styles.checkbox}
                value={isSelected}
                onValueChange={setIsSelected}
                color={isSelected ? '#AFD3E2' : undefined}
            />
        </View>
    );
  }
  
  const styles = StyleSheet.create({
      image : {
        width:300,
        height:300,
        marginBottom:10
      },
      checkbox: {
        marginBottom:30,
      },  
    });
  
  export default CodySet;