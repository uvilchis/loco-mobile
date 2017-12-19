import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import MapDeets from './MapDeets';
import Details from './Details';

export default MapLineNav = StackNavigator({
  MapDeets: { screen: MapDeets },
  Details: { screen: Details }
})