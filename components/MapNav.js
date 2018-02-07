import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import UserMap from './UserMap';
import MapDeets from './MapDeets';
import Details from './Details';

export default MapNav = StackNavigator({
  UserMap: {
    screen: UserMap
  },
  Details: { screen: Details }
}, { headerMode: 'none' });
