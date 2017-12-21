import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import URL from '../env/urls';

const Lines = (props) => (
  <View>
    {props.countedRoutes.map((route, idx) =>
      <TouchableOpacity
        key={idx}
        onPress={() => props.onDetailsPress(route.name)}>
        <Card>
          <View style={styles.inner}>
            <Text style={[styles.name, { color: props.color }]}>{route.name.toUpperCase()}</Text>
            <Text style={styles.complaints}>{`${route.count} complaints in last 30 minutes`}</Text>
            <TouchableOpacity
              style={styles.button}>
              <EvilIcons
                name='arrow-right'
                color='darkgrey'
                size={32}
                onPress={() => props.onDetailsPress(route.name)}/>
            </TouchableOpacity>
          </View>
        </Card>
    </TouchableOpacity>)}
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