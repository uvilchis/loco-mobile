import React, { Component } from 'react';
import { StyleSheet, View, Button, Image, Text } from 'react-native';

export default class MapLine extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('MAPLINE PROPS:', this.props)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.line}
        </Text>
        <Button style={styles.button}
          onPress={() => {
            console.log('pressed line, redirect to details for more info')
          }}
          title="Details"
          color='#841584'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }, 
  text: {
    flex: 2
  },
  button: {
    flex: 1
  }
})