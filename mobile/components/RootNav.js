import React from 'react';
import { StackNavigator } from 'react-navigation';
import MapNav from './MapNav';
import Main from './Main';
import Details from './Details';

export default RootNav = StackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      headerMode: 'screen'
    }
  },
  MapNav: { screen: MapNav },
  Details: { screen: Details }
});
