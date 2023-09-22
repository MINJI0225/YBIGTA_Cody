import React, { useState, } from 'react';
import { View, Image, StyleSheet, TouchableOpacity} from "react-native";
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';

// npx expo install expo-checkbox
// https://docs.expo.dev/versions/latest/sdk/checkbox/

const CodySet = props => {
    const {src} = props;
    const [isSelected, setIsSelected] = useState(false);

    return (
        <View>
            <Image
                source = {src}
                style = {styles.image} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsSelected(!isSelected)}
            >
              <Icon
                name={isSelected ? 'heart' : 'heart-o'}
                size={24}
                color={isSelected ? 'red' : 'grey'}
              />
            </TouchableOpacity>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
      image : {
        width:300,
        height:300,
        marginBottom:5
      },
      checkbox: {
        marginBottom:30,
      },
      button: {
        padding: 10,
        marginBottom: 15,
      },
    });
  
  export default CodySet;