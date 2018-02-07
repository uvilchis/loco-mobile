import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import MapContainer from '../map/MapContainer';
import MapModal from '../map/MapModal';
import Detail from '../detail/Detail';

export default MapNav = StackNavigator({
  MapContainer: {
    screen: MapContainer
  },
  Detail: { screen: Detail }
}, { headerMode: 'none' });
