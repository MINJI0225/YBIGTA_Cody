import React from 'react';
import { StyleSheet, View} from "react-native";

function separator() {
    return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
  });

export default separator;