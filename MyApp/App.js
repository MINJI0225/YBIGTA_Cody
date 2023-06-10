import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
///*
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import 옷BTI from "./screens/옷BTI";
import 나의평소스타일 from "./screens/나의평소스타일";
import mycloset_main from "./screens/mycloset_main";
import mycloset_myclothes from "./screens/mycloset_myclothes";
import mycloset_saved from "./screens/mycloset_saved";
import mycloset_setting from "./screens/mycloset_setting";

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
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="mycloset_main">
        <Stack.Screen name="mycloset_main" component={mycloset_main} />
        <Stack.Screen name="mycloset_myclothes" component={mycloset_myclothes} />
        <Stack.Screen name="mycloset_saved" component={mycloset_saved} />
        <Stack.Screen name="mycloset_setting" component={mycloset_setting} />
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
