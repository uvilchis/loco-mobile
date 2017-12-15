import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
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
            <Text>{route.name}</Text>
            <Text>{`${route.count} complaints in the last 30 minutes`}</Text>
          </Card>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    // flexDirection: 'row'
  }
});