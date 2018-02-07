import React from 'react';
import { StackNavigator } from 'react-navigation';

import MapNav from './MapNav';
import Main from '../Main';
import Detail from '../detail/Detail';

export default RouteNav = StackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      headerMode: 'screen'
    }
  },
  MapNav: { screen: MapNav },
  Detail: { screen: Detail }
});
