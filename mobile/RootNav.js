import React from 'react';
import { StackNavigator } from 'react-navigation';
import TrainLines from './components/TrainLines.js';
import Lines from './components/Lines.js';

const RootNav = StackNavigator({
  HomeScreen: {
    screen: TrainLines,
    navigationOptions: {
      headerTitle: 'HomeScreen',
    },
  },
  LinesScreen: {
    screen: Lines,
    navigationOptions: {
      headerTitle: 'LinesScreen',
    },
  },
});

export default RootNav