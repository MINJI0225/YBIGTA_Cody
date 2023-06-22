import React from 'react';
import { StyleSheet } from 'react-native';

const HeaderOptions = () => {
  return {
    headerStyle: styles.headerStyle,
    headerTintColor: '#fff',
    headerTitleStyle: styles.headerTitleStyle,
  };
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#AFD3E2',
    borderBottomColor: 'transparent',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
});

export default HeaderOptions;
