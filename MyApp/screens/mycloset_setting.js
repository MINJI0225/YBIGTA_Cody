import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Button, View, TouchableOpacity, Alert } from "react-native";

function mycloset_setting({navigation}) {
    
    return (
      <View style={{
        flexDirection:'col',
        justifyContent:'center',
        flex:1,
      }}>
        <View style={styles.eachRow}>
          <TouchableOpacity
            onPress={this._onPressButton}
            style={styles.typeBtn}>
            <Image
              style={styles.image}
              source={require('../assets/closet/white_tshirt.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._onPressButton}
            style={styles.typeBtn}>
            <Image
              style={styles.image}
              source={require('../assets/closet/white_sleeveless.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._onPressButton}
            style={styles.typeBtn}>
            <Image
              style={styles.image}
              source={require('../assets/closet/white_poloshirt.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.eachRow}>
        <TouchableOpacity
            onPress={this._onPressButton}
            style={styles.typeBtn}>
            <Image
              style={styles.image}
              source={require('../assets/closet/white_skirt.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._onPressButton}
            style={styles.typeBtn}>
            <Image
              style={styles.image}
              source={require('../assets/closet/blue_jean.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._onPressButton}
            style={styles.typeBtn}>
            <Image
              style={styles.image}
              source={require('../assets/closet/green_overall.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.eachRow}>
        <TouchableOpacity
            onPress={this._onPressButton}
            style={styles.typeBtn}>
            <Image
              style={styles.image}
              source={require('../assets/closet/necklace.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._onPressButton}
            style={styles.typeBtn}>
            <Image
              style={styles.image}
              source={require('../assets/closet/green_cap.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._onPressButton}
            style={styles.typeBtn}>
            <Image
              style={styles.image}
              source={require('../assets/closet/black_dress.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.eachRow}>
        <TouchableOpacity
            onPress={this._onPressButton}
            style={styles.typeBtn}>
            <Image
              style={styles.image}
              source={require('../assets/closet/green_poloshirt.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._onPressButton}
            style={styles.typeBtn}>
            <Image
              style={styles.image}
              source={require('../assets/closet/white_hat.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._onPressButton}
            style={styles.typeBtn}>
            <Image
              style={styles.image}
              source={require('../assets/closet/green_backpack.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#AFD3E2', // 하늘색 배경
      alignItems: 'center',
      justifyContent: 'center'
    },
    eachRow: {
      flex:1,
      flexDirection:'row',
      justifyContent:'center'
    },
    image: {
      borderRadius: 5,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'grey',
    },
  });

export default mycloset_setting;