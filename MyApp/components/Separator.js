import React from 'react';
import { StyleSheet, View} from "react-native";

function Separator() {
    return <View style={styles.Separator} />;
}

const styles = StyleSheet.create({
    Separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
  });

export default Separator;