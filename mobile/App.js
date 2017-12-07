import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import RootNav from './RootNav.js';
import TrainLine from './components/TrainLine.js';
import Lines from './components/Lines.js';


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

  getDetails(e) {
    console.log('pressed!')
    // this.props.navigation.navigate('Lines') //, { user: 'Daniel' })}
    // title="RootNavigator"
  }
  
  // 

  render() { 
    // const { navigate } = this.props.navigation; 
    // console.log(navigate)  
    return (
      <View>
        <Text style={styles.title}>loco</Text>
        <Text style={styles.text}>Welcome to loco, your one stop resource for MTA delays</Text>
        <RootNav />
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
