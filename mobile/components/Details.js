import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import Card from './Card.js';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaints: [
        'delayed',
        'closed',
        'accident',
        'crowded'
      ]
    }
  }

  render() {
    return (
      <View>
        {this.state.complaints.map((complaint, idx) => {
          <Card complaint={complaint} key={idx} />
        })}
      </View>
    )
  }
}