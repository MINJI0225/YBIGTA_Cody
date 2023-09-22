import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Square = ({ width, height, color, title, value }) => {
  const squareStyle = {
    width: width,
    height: height,
    backgroundColor: color,
  };

  return (
    <View>
        <View style={{flexDirection:'row'}}>
            <View style={squareStyle} />  
            <Text style={styles.valueText}>{value}</Text>  
        </View>
        <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
    titleText : {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom:12,
        marginTop:3
    },
    valueText : {
        fontSize:10,
        marginTop:5,
        marginLeft:10
    }
});
export default Square;