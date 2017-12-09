import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native';
import Details from './Details.js';

export default class Lines extends Component {
  constructor(props) {
    super(props);
    this.state={
      lines: [1, 2, 3]
    }
  }
  
  render() {
    // console.log('LINES PROPS', this.props);
    return (
      <ScrollView>
        {this.state.lines.map((train, idx) => 
          <Details train={train} key={idx} /> 
        )}
      </ScrollView>
    );
  }
}

Lines.navigationOptions = {
  title: 'Lines',
};