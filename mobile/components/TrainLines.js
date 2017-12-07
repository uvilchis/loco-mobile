import React, { Component } from 'react';
import { View, StyleSheet, Image, Button, Text } from 'react-native';

export default class TrainLines extends Component {
  static navigationOptions = {
    	title: 'Welcome',
  };
  constructor(props) {
    super(props);
  }
 
  render() {   
    return (
        <View>
          <Text>Here's where all the trains get mapped</Text>
          {/* {this.state.lines.map((line, idx) => (
            <TrainLine line={line} key={idx}
              getDetails={this.getDetails.bind(this)}
            />
          ))} */}
        </View>
    )
  }
}