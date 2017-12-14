import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import UserMap from './UserMap';

export default MapNav = StackNavigator({   
  UserMap: { screen: UserMap }  
})
