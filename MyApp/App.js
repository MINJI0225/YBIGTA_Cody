import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// components import
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import MainPage from "./screens/MainPage";
import Cody_BTI from "./screens/Cody_BTI";
import MyStyle from "./screens/MyStyle";
import Mycloset_main from "./screens/Mycloset_main";
import Mycloset_pickandchoose from "./screens/Mycloset_pickandchoose";
import Mycloset_saved from "./screens/Mycloset_saved";
import Mycloset_setting from "./screens/Mycloset_setting";
import StyleIcon from "./screens/StyleIcon";
import LoadingScreen from "./screens/LoadingScreen";
import PickAndChooseRecommend from './screens/PickAndChooseRecommend';

// Tabs 
const TabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="HomeTabStack">
      <Tab.Screen
          name="MyclosetTabStack"
          component={MyclosetTabStack}
          options={{
            headerShown: false,
            title: '마이클로젯',
            tabBarIcon: ({color, size}) => (
              <Icon name="favorite" color={color} size={size} />
            ),
        }}
        />
        <Tab.Screen 
            name="HomeTabStack" 
            component={HomeTabStack}
            options={{
              headerShown: false,
              title: '홈',
              tarBarIcon: ({color,size}) => (
                <MaterialIcons name="home" color={color} size={size} />
              ),
        }} 
      />
        <Tab.Screen
          name="MyStyleStack"
          component={MyStyleStack}
          options={{
            headerShown: false,
            title: '마이스타일',
            tabBarIcon: ({color, size}) => (
              <Icon name="edit" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
  );
};

// stacks for each tab
const HomeTabStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainPage" component={MainPage} />
    </Stack.Navigator>
  )
}

const MyclosetTabStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Mycloset_main" component={Mycloset_main} />
      <Stack.Screen name="Mycloset_pickandchoose" component={Mycloset_pickandchoose} />
      <Stack.Screen name="Mycloset_saved" component={Mycloset_saved} />
      <Stack.Screen name="Mycloset_setting" component={Mycloset_setting} />
      <Stack.Screen name="PickAndChooseRecommend" component={PickAndChooseRecommend} />
    </Stack.Navigator>
  )
}

const MyStyleStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Cody_BTI" component={Cody_BTI} />
      <Stack.Screen name="MyStyle" component={MyStyle} />
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="StyleIcon" component={StyleIcon} />
    </Stack.Navigator>
  )
}

// final stack navigation including tab,stack navigation
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen options = {{ headerShown: false}} name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="Cody_BTI" component={Cody_BTI} 
                      options={{
                        headerStyle: {
                          backgroundColor: '#AFD3E2',
                          borderBottomColor: 'transparent',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {fontWeight: 'bold'},
                      }}
                    />
        <Stack.Screen name="MyStyle" component={MyStyle} />
        <Stack.Screen options = {{ headerShown: false}} name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="StyleIcon" component={StyleIcon} />
        <Stack.Screen options = {{ headerShown: false}} name="TabNavigation" component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;