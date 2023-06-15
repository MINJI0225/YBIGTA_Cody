import React, {useState} from 'react';
import { Image, StyleSheet, View, TouchableOpacity} from "react-native";

const ImageButton = props => {
  const {unclickedImg, clickedImg} = props;

  const [isClicked, setIsClicked] = useState(false);
  const [count, setCount] = useState(1);
  { /*count 수가 실제랑은 1 더 많지만 이래야 정상적으로 작동됨..? 이유는 모름
      근데 isClicked는 실제 의미랑 같으므로 count 무시하고 isClicked 사용하면 될듯?*/
  }

  const onPress = () => {
    setCount(count + 1);
    if (count % 2 == 1) setIsClicked(true);
    else setIsClicked(false);
  };

  return (
    <TouchableOpacity
        onPress={onPress}>
        <Image
          style={styles.image}
          source={isClicked ? clickedImg : unclickedImg} />
    </TouchableOpacity>
  );
}
ImageButton.defaultProps = {
  clickedImg : require('../assets/closet/clicked.png')
}

const styles = StyleSheet.create({
    image: {
      borderRadius: 5,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'grey',
    },
  });


export default ImageButton;