import React, { Component } from 'react';
import { TouchableOpacity, Alert } from 'react-native';

import { EvilIcons } from '@expo/vector-icons';

const StatusMarker = (props) => {
  let name, color;
  switch(props.status) {
    case 'DELAYS': {
      name = 'clock';
      color = '#ff9872';
      break;
    }
    
    case 'PLANNED WORK': {
      name = 'close-o';
      color = '#ff9872';
      break;
    }

    case 'SERVICE CHANGE': {
      name = 'exclamation';
      color = 'red';
      break;
    }
    
    case 'GOOD SERVICE': {
      name = 'check';
      color = 'darkseagreen'
      break;
    }

    default: {
      name = 'question';
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
      <EvilIcons
        name={name}
        color={color}
        size={40}
        style={{ marginTop: 4 }} />
    </TouchableOpacity>
  );
};

export default StatusMarker;