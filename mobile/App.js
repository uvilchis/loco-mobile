import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import RootNav from './RootNav.js';
import TrainLines from './components/TrainLines.js';
import Lines from './components/Lines.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() { 
    return (
      <View>
        <Text style={styles.title}>loco</Text>
        <Text style={styles.text}>Welcome to loco, 
        your one stop resource for MTA delays</Text>
        <TrainLines RootNav={RootNav} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    backgroundColor: '#6d6868',
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 30,
    paddingVertical: 8,

  },
  contentContainer: {
    paddingVertical: 20,
    justifyContent: 'center'
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 20
  }
});
