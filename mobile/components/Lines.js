import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import Details from './Details.js';
import URL from '../env/urls';

export default class Lines extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        {this.props.countedRoutes.map((route, idx) => 
          <Card 
            key={idx}>
            <View style={styles.inner}>
              <Text style={[styles.name, { color: this.props.color }]}>{route.name}</Text>
              <Text style={styles.complaints}>{`${route.count} complaints in last 30 minutes`}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.onDetailsPress(route)}>
                <EvilIcons
                  name='arrow-right'
                  color='darkgrey'
                  size={32} />
              </TouchableOpacity>
            </View>
          </Card>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inner: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold'
  },
  complaints: {
    flex: 9
  },
  button: {
    flex: 1
  }
});