import React, { Component } from 'react';
import { View, StyleSheet, Image, Button, Text } from 'react-native';

const TrainLine = (props) => {
  // console.log('TRAINLINE PROPS', props)   
    return (
      <View style={styles.container}>
        <View style={styles.icon}>
          <Image source={props.line} />
        </View>
        <View style={styles.buttons}>
          <Image style={{width: 50, height: 50}} source={require("../images/green.png")} />
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