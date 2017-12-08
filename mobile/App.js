import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TrainLines from './components/TrainLines';
import RootNav from './components/RootNav';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log('APP PROPS:', this.props)
    return (
      <View style={{flex: 1}}>
        <Text style={styles.title}>loco</Text>        
        <RootNav />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    backgroundColor: '#6d6868',
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 30,
    paddingVertical: 30
  }
});
