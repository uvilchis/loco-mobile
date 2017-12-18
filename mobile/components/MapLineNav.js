import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Details from './Details';

export default MapLineNav = StackNavigator({
  Details: { screen: Details }
})