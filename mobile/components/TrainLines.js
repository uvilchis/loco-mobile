import React, { Component } from 'react';
import { View, StyleSheet, Image, Button, Text } from 'react-native';

export default class TrainLines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [
        require("../images/123.png"),
        require("../images/456.png"),
        require("../images/7.png"),
        require("../images/ACE.png"),
        require("../images/BDFM.png"),
        require("../images/G.png"),
        require("../images/JZ.png"),
        require("../images/L.png"),
        require("../images/NQR.png"),
        require("../images/S.png")
      ]
    }
  }
  
  static navigationOptions = {
    title: 'Home',
  }
 
  render() {   
    return (
        <View>
          <Text>Here's where all the trains get mapped</Text>
        </View>
    )
  }
}