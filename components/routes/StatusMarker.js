import React, { Component } from 'react';
import { TouchableOpacity, Alert } from 'react-native';

import { Feather } from '@expo/vector-icons';

const _showAlert = (status) => {
  let alertText = status.charAt(0).toUpperCase() + status.slice(1);
  Alert.alert(
    'Icon Definition',
    alertText,
    [
      { text: 'Close', style: 'cancel' }
    ]
  );
};

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

  return (
    <TouchableOpacity
      onLongPress={() => _showAlert(props.status)}>
      <Feather
        name={name}
        color={color}
        size={26}
        style={{ alignSelf: 'center' }} />
    </TouchableOpacity>
  );
};

export default StatusMarker;