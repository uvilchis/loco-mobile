import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const MapLine = (props) => (
  <View 
    style={styles.container}>
    <Text style={[styles.text, props.color]}>
      {props.line}
    </Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => props.onDetailsPress(props.line, props.stop)}>
      <EvilIcons
        name="arrow-right"
        size={32}
        color="dimgrey" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1
  },
  text: {
    fontSize: 20,
    flex: 1, 
    fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    marginRight: 4
  },
  buttonArrow: {
    color: 'dimgrey'
  }
});

export default MapLine;