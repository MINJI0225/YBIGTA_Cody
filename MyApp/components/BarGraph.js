import React from 'react';
import { View, StyleSheet } from 'react-native';
import Square from './Square';

const BarGraph = ({ data }) => {
  const len = 250;
  return (
    <View style={styles.container}>
        <Square
            width={parseFloat(`${data[0].percentage*len/100}`)}
            height={20} color={'#008AC3'}
            title={data[0].title} value={`${data[0].percentage}%`}/>
        <Square
            width={parseFloat(`${data[1].percentage*len/100}`)}
            height={20} color={'#4EB7E2'}
            title={data[1].title} value={`${data[1].percentage}%`}/>
        <Square
            width={parseFloat(`${data[2].percentage*len/100}`)}
            height={20} color={'#AFD3E2'}
            title={data[2].title} value={`${data[2].percentage}%`}/>
    </View>
  );
};

const styles = StyleSheet.create({
    container : {
        justifyContent:'flex-start'
    },
});

export default BarGraph;