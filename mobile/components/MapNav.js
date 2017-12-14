import React from 'react';
import { StackNavigator } from 'react-navigation';
import App from '../App';
import UserMap from './UserMap';

export default MapNav = StackNavigator({
  App: { 
    screen: App,
    navigationOptions: {
      header: null,
      headerMode: 'screen'
    }
  },
  UserMap: { screen: UserMap }
});