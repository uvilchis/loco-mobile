import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Helpers from '../lib/util';

const Schedule = (props) => (
  <View style={styles.container}>
    {props.schedule.map((el, idx) => 
        <Text 
          style={[styles.entry, { 
            color: idx % 2 ? 'black' : 'white', 
            backgroundColor: idx % 2 ? 'white' : 'cadetblue' 
          }]} 
          key={idx}>
          Arriving at {Helpers.DateHelper(el.arrival_time)}
        </Text>)}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    marginBottom: 80
  },
  entry: {
    padding: 8,
    borderColor: 'lightgrey',
    borderWidth: 1
  }
});

export default Schedule;
