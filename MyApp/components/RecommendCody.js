import React, { useState, useEffect} from 'react';
import { Text, FlatList, View, Image, StyleSheet, TouchableOpacity} from "react-native";
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_URL } from '@env';
// npx expo install expo-checkbox
// https://docs.expo.dev/versions/latest/sdk/checkbox/

const CodySet = props => {
    const {cody} = props; // props is used to pass data between components (parent to child)
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
      const fetchLike = async () => {
        try {
          const like = {
            styling_id : cody.id
          };
          console.log('like:', like)
          const response = await fetch(`${API_URL}/mycodi/post`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(like)
          });
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              console.log(data.message);
            } else {
              console.log("Like Request failed:", data.message);
            }
          } else {
            console.log('Like Request failed with status code:', response.status);
            const errorData = await response.json();
            console.error('Error:', errorData);
          }
        } catch (error) {
          console.error('Error: ', error);
        }
      };
      fetchLike();
    }, [isSelected]);

    return (
      // Return part specifies how the component should look like (UI rendering)
        <View style={{alignItems:'center'}}>
            <Text style={styles.titleText}>{cody.title}</Text>
            <Text style={styles.subText}>{cody.subText}</Text>
            <Image
                source = {{uri:cody.image_url}}
                style = {styles.image} />
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <FlatList
                    data={cody.hashtags.slice(0, 3)} // selectedImages 리스트 내의 모든 항목에 대해
                    numColumns={3}
                    renderItem={({item}) => ( // i를 이렇게 render해라
                        <Text style={styles.hashtag}>#{item}</Text>
                    )} 
                />
                {/* <Checkbox
                    style={styles.checkbox}
                    value={isSelected}
                    onValueChange={setIsSelected}
                    color={isSelected ? '#AFD3E2' : undefined}
                /> */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setIsSelected(!isSelected)}
                >
                  <Icon
                    name={isSelected ? 'heart' : 'heart-o'}
                    size={30}
                    color={isSelected ? 'red' : 'grey'}
                  />
                </TouchableOpacity>
            </View>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
      image : {
        width:300,
        height:300,
        marginBottom:15
      },
      checkbox: {
        marginBottom:9
      },  
      hashtag: {
        backgroundColor:'#AFD3E2',
        color:'#FFFFFF',
        fontSize : 13,
        marginRight:5,
        paddingHorizontal:7,
        paddingVertical:3,
        marginBottom:7
      },
      titleText: {
        fontSize:20,
        marginBottom:10,
        alignItems:'center',
        fontWeight:'bold'
      },
      subText:{
        fontSize:15,
        marginBottom:5
      },
      button: {
        marginTop: 0,
        marginRight: 10,
      },
    });
  
  export default CodySet;