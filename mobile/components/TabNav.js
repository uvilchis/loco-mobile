import React from 'react';
import { Button, ScrollView } from 'react-native';
import { SafeAreaView, StackNavigator, TabNavigator } from 'react-navigation';
import TrainLines from './TrainLines';
import UserMap from './UserMap';
// TODO : This is on the backburner

export default TabNav = TabNavigator (
  {
    TrainLines : {
      screen : TrainLines,
      navigationOptions : {
        tabBarLabel : 'Home'
      }
    },
    UserMap : {
      screen : UserMap,
      navigationOptions : {
        tabBarLabel : 'Map'
      }
    }
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled : false,
    swipeEnabled : false
  }
);
