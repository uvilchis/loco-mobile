import React from 'react';
import { StackNavigator } from 'react-navigation';
import TrainLines from './TrainLines';
import Lines from './Lines';

export default RootNav = StackNavigator({
  TrainLines: { 
    screen: TrainLines,
    navigationOptions: {
      header: null,
      headerMode: 'screen'
    }
  },
  Lines: { screen: Lines }
});