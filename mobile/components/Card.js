import React, { Component } from 'react';
import { View, StyleSheet, Image, Button, Text } from 'react-native';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compressed: false
    }
  }

  render() {
    return (
      <View>
        {this.props.complaint}
      </View>
    )
  }
}