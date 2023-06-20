import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MainPage from "./screens/MainPage";
import Cody_BTI from "./screens/Cody_BTI";
import Mycloset_main from "./screens/Mycloset_main";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="MainPage">
        <Tab.Screen 
            name="MainPage" 
            component={MainPage}
            options={{
                title: 'MainPage',
                tarBarIcon: ({color,size}) => (
                    <Icon name="MainPage" color={color} size={size} />
                ),
        }} 
        />
        <Tab.Screen
          name="Mycloset_main"
          component={Mycloset_main}
          options={{
            title: 'Mycloset_main',
            tabBarIcon: ({color, size}) => (
              <Icon name="Mycloset_main" color={color} size={size} />
            ),
        }}
        />
        <Tab.Screen
          name="Cody_BTI"
          component={Cody_BTI}
          options={{
            title: 'Cody_BTI',
            tabBarIcon: ({color, size}) => (
              <Icon name="Cody_BTI" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

BottomTabNavigator;
