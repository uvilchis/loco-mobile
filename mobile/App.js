import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import TrainLines from './components/TrainLines';
import RootNav from './components/RootNav';
import axios from 'axios';

const App = (props) => {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.title}>loco</Text>
          <Image source={require('./images/NYCmap.png')} />
        </View>      
        <RootNav />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#6d6868',
    paddingVertical: 30,
    justifyContent: 'space-between'
  },
  title: {  
    flex: 1,
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 30  
  }, 
  img: {
    flex: 1,
    alignItems: 'flex-end'
  }
});

export default App