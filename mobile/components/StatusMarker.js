import React, { Component } from 'react';
import { View } from 'react-native';

import { EvilIcons } from '@expo/vector-icons';

const StatusMarker = (props) => {
  let name;
  let color;
  switch(props.status) {
    case 'DELAYS': {
      name = 'clock';
      color = 'gold';
      break;
    }
    
    case 'PLANNED WORK': {
      name = 'gear';
      color = 'gold';
      break;
    }

    case 'SERVICE CHANGE': {
      name = 'exclamation';
      color = 'red';
      break;
    }
    
    case 'GOOD SERVICE': {
      name = 'heart';
      color = 'darkseagreen'
      break;
    }

    default: {
      name = 'question';
      color = 'black';
    }
  }

  return (
    <EvilIcons
      name={name}
      color={color}
      size={40}
      style={{ marginTop: 4 }} />
  );
};

export default StatusMarker;