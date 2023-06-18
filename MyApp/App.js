import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
///*
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import MainPage from "./screens/MainPage";
import Cody_BTI from "./screens/Cody_BTI";
import MyStyle from "./screens/MyStyle";
import Mycloset_main from "./screens/Mycloset_main";
import Mycloset_pickandchoose from "./screens/Mycloset_pickandchoose";
import Mycloset_saved from "./screens/Mycloset_saved";
import Mycloset_setting from "./screens/Mycloset_setting";

// Create a native stack navigator
const Stack = createNativeStackNavigator();
//*/
/*
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
*/
///*
export default function Navigation() {
  // NavigationContainer is a component which manages our navigation tree and contains the navigation state
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen options = {{ headerShown: false}} name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Cody_BTI" component={Cody_BTI} />
        <Stack.Screen name="MyStyle" component={MyStyle} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="Mycloset_main" component={Mycloset_main} />
        <Stack.Screen name="Mycloset_pickandchoose" component={Mycloset_pickandchoose} />
        <Stack.Screen name="Mycloset_saved" component={Mycloset_saved} />
        <Stack.Screen name="Mycloset_setting" component={Mycloset_setting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
