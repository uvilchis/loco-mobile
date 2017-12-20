import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import Details from './Details.js';
import URL from '../env/urls';

const Lines = (props) => (
  <View>
    {props.countedRoutes.map((route, idx) =>
      <Card
        key={idx}>
        <View style={styles.inner}>
          <Text style={[styles.name, { color: props.color }]}>{route.name.toUpperCase()}</Text>
          <Text style={styles.complaints}>{`${route.count} complaints in last 30 minutes`}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={function() { props.onDetailsPress(route.name); }}>
            <EvilIcons
              name='arrow-right'
              color='darkgrey'
              size={32} />
          </TouchableOpacity>
        </View>
      </Card>)}
  </View>
);

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
    flex: 6
  },
  button: {
    flex: 1
  }
});

export default Lines;