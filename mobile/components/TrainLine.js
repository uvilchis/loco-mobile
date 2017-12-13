import React, { Component } from 'react';
import { View, StyleSheet, Image, Button, Text } from 'react-native';

const markers = {
  "GOOD SERVICE": require('../images/markers/green.png'),
  "SERVICE CHANGE": require('../images/markers/red.png'),
  "PLANNED WORK": require('../images/markers/yellow.png'),
  "DELAYS": require('../images/markers/yellow.png')
}

const lines = {
  "123": require('../images/lines/123.png'),
  "456": require('../images/lines/456.png'),
  "7": require('../images/lines/7.png'),
  "ACE": require('../images/lines/ACE.png'),
  "BDFM": require('../images/lines/BDFM.png'),
  "G": require('../images/lines/G.png'),
  "JZ": require('../images/lines/JZ.png'),
  "L": require('../images/lines/L.png'),
  "NQR": require('../images/lines/NQR.png'),
  "S": require('../images/lines/S.png'),
  "SIR": require('../images/lines/SIR.png')
}

const TrainLine = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Image source={lines[props.line.name]} />
      </View>
      <View style={styles.buttons}>
        <Image style={{width: 50, height: 50}} source={ markers[props.line.status] } />
        <Button
          onPress={() => {
            props.navToLines(props.idx);
          }} 
          title="Lines"
          color="#841584"   
        /> 
      </View> 
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    flex: 2
  },
  buttons: {
    flex: 1.5,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default TrainLine