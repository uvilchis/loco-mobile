import React, { Component } from 'react';
import { View, StyleSheet, Image, Button, Text, Alert, Animated, Easing, TouchableOpacity } from 'react-native';
import { Entypo, EvilIcons } from '@expo/vector-icons';
import StatusMarker from './StatusMarker';

import Helpers from '../lib/util';

export default class Favorite extends Component {
  constructor(props){
    super(props);
  }
  // note: the color helper doesn't accomodate individual trainlines
  render() {
    const style = Helpers.LineStyleHelper(this.props.routeId.toUpperCase()) || {};
    return (
      <View style={styles.inner}>
        <View style={styles.icon}>
          <Text style={[styles.symbols, { color: style.color }]}>{this.props.routeId.toUpperCase()}</Text>
        </View>
        <View>
          <Text>{this.props.stopName}</Text>
        </View>
        <View>
          <EvilIcons
            name="chevron-right"
            color='darkgrey'
            size={32}
            onPress={() => this.props.onDetailsPress(this.props.routeId)}
          />
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderColor: 'grey',
    borderWidth: 1
  },
  inner: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    flexDirection: 'row',
    flex: 2
  },
  buttons: {
    flex: 2,
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  symbols: {
    fontWeight: 'bold',
    fontSize: 30,
    textShadowOffset: { width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: '#dddddd'
  },
  rotateArrow: {
    height: 28,
    width: 28,
    marginRight: 8,
    marginTop: 2
  }
});
