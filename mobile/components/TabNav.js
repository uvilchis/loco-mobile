import React from 'react';
import { Button, ScrollView } from 'react-native';
import { SafeAreaView, StackNavigator, TabNavigator } from 'react-navigation';
import RootNav from './RootNav';
import FavNav from './FavNav';
// import UserMap from './UserMap';
// TODO : This is on the backburner

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
    animationEnabled : false,
    swipeEnabled : false
  });
