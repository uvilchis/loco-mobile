import React, { Component } from 'react';
import { View, StyleSheet, Image, Button, Text } from 'react-native';

const markers = {
  "GOOD SERVICE": require('../images/green.png'),
  "SERVICE CHANGE": require('../images/red.png'),
  "PLANNED WORK": require('../images/yellow.png'),
  "DELAYS": require('../images/yellow.png')
}

const lines = {
  "123": require('../images/123.png'),
  "456": require('../images/456.png'),
  "7": require('../images/7.png'),
  "ACE": require('../images/ACE.png'),
  "BDFM": require('../images/BDFM.png'),
  "G": require('../images/G.png'),
  "JZ": require('../images/JZ.png'),
  "L": require('../images/L.png'),
  "NQR": require('../images/NQR.png'),
  "S": require('../images/S.png'),
  "SIR": require('../images/SIR.png')
}

const TrainLine = (props) => {
  // console.log('TRAIN STATUS', markers[props.line.status])
  // console.log('LINE NAMES', lines[props.line.name])
    return (
      <View style={styles.container}>
        <View style={styles.icon}>
          <Image source={lines[props.line.name]} />
        </View>
        <View style={styles.buttons}>
          <Image style={{width: 50, height: 50}} source={ markers[props.line.status] } />
          <Button
            onPress={() => {
              console.log('pressed!!')
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