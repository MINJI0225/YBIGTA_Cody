import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';

const GaugeChart = ({ data }) => {
  return (
    <View style={styles.container}>
      <ProgressCircle
        style={styles.chart}
        progress={data['캐주얼']}
        progressColor={'#FFC300'}
        backgroundColor={'#E0E0E0'}
        strokeWidth={10}
      />
      <ProgressCircle
        style={styles.chart}
        progress={data['스포티']}
        progressColor={'#FF5733'}
        backgroundColor={'#E0E0E0'}
        strokeWidth={10}
      />
      <ProgressCircle
        style={styles.chart}
        progress={data['걸리시']}
        progressColor={'#C70039'}
        backgroundColor={'#E0E0E0'}
        strokeWidth={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chart: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

export default GaugeChart;