import React from 'react';
import { Button, ScrollView } from 'react-native';
import { SafeAreaView, StackNavigator, TabNavigator } from 'react-navigation';

import RouteNav from './RouteNav';
import FavNav from './FavNav';

export default TabNav = TabNavigator ({
  RouteNav : {
    screen : RouteNav,
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
      fontSize: 20,
      alignSelf: 'center'
    },
    tabStyle: {
      paddingBottom: 8
    },
    style: {
      backgroundColor: 'grey'
    },
    activeTintColor: 'white',
    inactiveTintColor: 'lightgrey'
  }
});
