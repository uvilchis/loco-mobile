import React from 'react';
import { StackNavigator } from 'react-navigation';
import TrainLines from './TrainLines';
import Lines from './Lines';
import NewDetails from './NewDetails'

export default RootNav = StackNavigator({
  TrainLines: {
    screen: TrainLines,
    navigationOptions: {
      header: null,
      headerMode: 'screen'
    }
  },
  Lines: { screen: Lines },
  NewDetails : {
    screen : NewDetails,
    navigationOptions: {
      header : null,
      headerMode : 'screen'
    }
  }
});
