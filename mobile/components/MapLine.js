import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default class MapLine extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View 
        style={styles.container}>
        <Text style={[styles.text, this.props.color]}>
          {this.props.line}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.onDetailsPress(this.props.line)}>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
    marginRight: 8
  },
  buttonText: {
    color: '#841584'
  }
});