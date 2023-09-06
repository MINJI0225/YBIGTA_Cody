import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function MyClosetButton({ selected, onPress }) {
  return (
    <TouchableOpacity style={[styles.buttonContainer, selected ? styles.buttonSelected : null]} onPress={onPress}>
      {selected ? (
        <Icon name="check-circle" size={20} color="#000" />
      ) : (
        <Icon name="circle-o" size={20} color="#000" />
      )}
      <Text style={styles.buttonText}>내 옷장의 옷만 보기</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 3,
    shadowOpacity: 0.3
  },
  buttonSelected: {
    backgroundColor: '#EFEFEF', // 선택된 경우의 배경색
  },
  buttonText: {
    marginLeft: 10,
    color: '#000',
    fontWeight: 'bold'
  }
});

export default MyClosetButton;
