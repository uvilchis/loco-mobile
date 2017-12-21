import React from 'react';
import { Button, ScrollView } from 'react-native';
import { SafeAreaView, StackNavigator, TabNavigator } from 'react-navigation';
import RootNav from './RootNav';
import FavNav from './FavNav';

export default TabNav = TabNavigator ({
  RootNav : {
    screen : RootNav,
    navigationOptions : {
      tabBarLabel : 'Home'
    }
  },
  FavNav : {
    screen : FavNav,
    navigationOptions : {
      tabBarLabel : 'Favorites'
    }
  }
},
{
  tabBarPosition: 'bottom',
  animationEnabled : true,
  swipeEnabled : true,
  tabBarOptions: {
    labelStyle: {
      fontSize: 20
    },
    style: {
      backgroundColor: 'grey'
    },
    activeTintColor: 'white',
    inactiveTintColor: 'lightgrey'
  }
});
