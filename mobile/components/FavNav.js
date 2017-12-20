import React from 'react';
import { StackNavigator } from 'react-navigation';
import Favorites from './Favorites';
import Details from './Details';

export default FavNav = StackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      header: null,
      headerMode:'screen'
    }
  },
  Details: {
    screen: Details
  }
});
