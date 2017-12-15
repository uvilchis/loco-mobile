import React from 'react';
import { StackNavigator } from 'react-navigation';
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
  Details: { screen: Details }
});
