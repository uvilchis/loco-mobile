import React, { Component } from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';

export default class TrainLine extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View>
          <Image source={require("../images/123.png")} />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})