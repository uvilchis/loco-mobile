import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native';

export default class MapEntry extends Component {
  constructor(props) {
    super(props)
    this.navToMap = this.navToMap.bind(this)
  }

  navToMap() {
    this.props.navigation.navigate('UserMap')
  }

  render() {
    return (
      <Button
        onPress={() => {
          this.navToMap()
        }}
        title="Location"
        color='#841584'
      />
    )
  }
}
