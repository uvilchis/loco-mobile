import React from 'react';
import { StackNavigator } from 'react-navigation';
import Favorites from './Favorites';
import Details from './Details';
import MapNav from './MapNav';

export default FavNav = StackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      headerMode:'screen'
    }
  },
  Details: { screen: Details },
  MapNav: { screen: MapNav }
});
