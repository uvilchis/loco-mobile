import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native';
import Details from './Details.js';
import TrainLines from './TrainLines';

export default class Lines extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log('Lines', this.props);
    return (
      <View>
        <Text>This is where I want to go after the first detail click</Text>
      </View>
    );
  }
}

// Lines.navigationOptions = {
//   title: 'Lines',
// };