import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';

import Helpers from '../lib/util'

const ComplaintCard = (props) => (
  <Card>
    <View style={styles.container}>
      <View style={styles.type}>
        <Text style={styles.text}>{Helpers.WordHelper(props.name)}</Text>
        <Text style={styles.text}>{props.count}</Text>
      </View>
      <TouchableOpacity
        onPress={() => props.onAdd(props.name)}>
        <EvilIcons
          name="plus"
          size={32}
          color="lightgrey"
          style={styles.button} />
      </TouchableOpacity>
    </View>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  type: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  text: {
    fontSize: 18,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    marginLeft: 16
  }
});

export default ComplaintCard;