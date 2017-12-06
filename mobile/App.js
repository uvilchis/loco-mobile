import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import TrainLine from './components/TrainLine.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [
        require("./images/123.png"),
        require("./images/456.png"),
        require("./images/7.png"),
        require("./images/ACE.png"),
        require("./images/BDFM.png"),
        require("./images/G.png"),
        require("./images/JZ.png"),
        require("./images/L.png"),
        require("./images/NQR.png"),
        require("./images/S.png")
      ]
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to loco, your one stop resource for MTA delays</Text>
          {this.state.lines.map((line, idx) => (
            <TrainLine line={line} key={idx}/>
          ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
