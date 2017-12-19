import React from 'react';
import { StackNavigator } from 'react-navigation';
import MapNav from './MapNav';
import TrainLines from './TrainLines';
import Details from './Details';

export default RootNav = StackNavigator({
  TrainLines: {
    screen: TrainLines,
    navigationOptions: {
      header: null,
      headerMode: 'screen'
    }
  },
  MapNav: {
    screen: MapNav
  },
  Details: { 
    screen: Details
  }
});
