import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RefreshButton = ({ onRefresh }) => {
  return (
    <TouchableOpacity onPress={onRefresh}>
      <Text>
        <Text>
          <Icon name="refresh" size={30} color="black" />
        </Text>
      </Text>
    </TouchableOpacity>
  );
};

export default RefreshButton;