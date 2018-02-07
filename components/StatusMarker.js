import React, { Component } from 'react';
import { TouchableOpacity, Alert } from 'react-native';

import { Feather } from '@expo/vector-icons';

const StatusMarker = (props) => {
  let name, color;
  switch(props.status) {
    case 'DELAYS': {
      name = 'clock';
      color = 'gold';
      break;
    }
    
    case 'PLANNED WORK': {
      name = 'flag';
      color = '#ff9872';
      break;
    }

    case 'SERVICE CHANGE': {
      name = 'alert-octagon';
      color = 'red';
      break;
    }
    
    case 'GOOD SERVICE': {
      name = 'check-circle';
      color = 'darkseagreen'
      break;
    }

    default: {
      name = 'help-circle';
      color = 'black';
    }
  }

  const showAlert = () => {
    Alert.alert(
      'Icon Definition',
      props.status,
      [
        { text: 'Close', style: 'cancel' }
      ]
    );
  }

  return (
    <TouchableOpacity
      onLongPress={showAlert}>
      <Feather
        name={name}
        color={color}
        size={26}
        style={{ alignSelf: 'center' }} />
    </TouchableOpacity>
  );
};

export default StatusMarker;