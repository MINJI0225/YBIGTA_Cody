import React, { useState, } from 'react';
import Checkbox from 'expo-checkbox';
// npx expo install expo-checkbox
// https://docs.expo.dev/versions/latest/sdk/checkbox/
import { StyleSheet, View, Text} from 'react-native';

const MyCheckBox = props => {
    const {name} = props;
    const [isSelected, setIsSelected] = useState(false);

    return (
        <View style={styles.section}>
            <Checkbox
            style={styles.checkbox}
            value={isSelected}
            onValueChange={setIsSelected}
            color={isSelected ? '#AFD3E2' : undefined}
            />
            <Text style={styles.paragraph}>{name}</Text>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // 하늘색 배경
        alignItems: 'center',
        justifyContent: 'center',
      },
      section: {
        width : 180,
        flexDirection: 'row',
        alignItems: 'center',
      },
      paragraph: {
        fontSize: 15,
      },
      checkbox: {
        margin: 8,
      },  
    });
  
  export default MyCheckBox;