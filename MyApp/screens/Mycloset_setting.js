import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Button, View, TouchableOpacity, Alert } from "react-native";
import ImageButton from "../components/ImageButton";
import SaveButton from "../components/SaveButton";

function Mycloset_setting({navigation}) {
    const urlList = [
      {
        unclicked : require('../assets/closet/white_tshirt.png'),
        clicked : require('../assets/closet/clicked.png')
      },
      {
        unclicked : require('../assets/closet/white_sleeveless.png'),
        clicked : require('../assets/closet/clicked.png')
      },
      {
        unclicked : require('../assets/closet/white_poloshirt.png'),
        clicked : require('../assets/closet/clicked.png')
      },
      {
        unclicked : require('../assets/closet/white_skirt.png'),
        clicked : require('../assets/closet/clicked.png')
      },
      {
        unclicked : require('../assets/closet/blue_jean.png'),
        clicked : require('../assets/closet/clicked.png')
      },
      {
        unclicked : require('../assets/closet/green_overall.png'),
        clicked : require('../assets/closet/clicked.png')
      },
      {
        unclicked : require('../assets/closet/necklace.png'),
        clicked : require('../assets/closet/clicked.png')
      },
      {
        unclicked : require('../assets/closet/green_cap.png'),
        clicked : require('../assets/closet/clicked.png')
      },
      {
        unclicked : require('../assets/closet/black_dress.png'),
        clicked : require('../assets/closet/clicked.png')
      },
      {
        unclicked : require('../assets/closet/green_poloshirt.png'),
        clicked : require('../assets/closet/clicked.png')
      },
      {
        unclicked : require('../assets/closet/white_hat.png'),
        clicked : require('../assets/closet/clicked.png')
      },
      {
        unclicked : require('../assets/closet/green_backpack.png'),
        clicked : require('../assets/closet/clicked.png')
      },

    ]
    return (
      <View style={styles.container}>
        <View style={{
          flexDirection:'col',
          justifyContent:'center',
          flex:1,
        }}>
          <View style={styles.eachRow}>
            <ImageButton unclickedImg={urlList[0].unclicked} clickedImg={urlList[0].clicked}/>
            <ImageButton unclickedImg={urlList[1].unclicked} />
            <ImageButton unclickedImg={urlList[2].unclicked} />
          </View>

          <View style={styles.eachRow}>
            <ImageButton unclickedImg={urlList[3].unclicked} clickedImg={urlList[3].clicked}/>
            <ImageButton unclickedImg={urlList[4].unclicked} clickedImg={urlList[4].clicked}/>
            <ImageButton unclickedImg={urlList[5].unclicked} clickedImg={urlList[5].clicked}/>
          </View>

          <View style={styles.eachRow}>
            <ImageButton unclickedImg={urlList[6].unclicked} clickedImg={urlList[6].clicked}/>
            <ImageButton unclickedImg={urlList[7].unclicked} clickedImg={urlList[7].clicked}/>
            <ImageButton unclickedImg={urlList[8].unclicked} clickedImg={urlList[8].clicked}/>
          </View>

          <View style={styles.eachRow}>
            <ImageButton unclickedImg={urlList[9].unclicked} clickedImg={urlList[9].clicked}/>
            <ImageButton unclickedImg={urlList[10].unclicked} clickedImg={urlList[10].clicked}/>
            <ImageButton unclickedImg={urlList[11].unclicked} clickedImg={urlList[11].clicked}/>
          </View>
        </View>
        <SaveButton title = "저장" />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFF',
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

export default Mycloset_setting;