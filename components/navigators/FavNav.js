import React from 'react';
import { StackNavigator } from 'react-navigation';

import Favorites from '../favorite/Favorites';
import Detail from '../detail/Detail';
import MapNav from './MapNav';

export default FavNav = StackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      headerMode:'screen'
    }
  },
  Detail: { screen: Detail },
  MapNav: { screen: MapNav }
});
