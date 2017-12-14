import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';

export default class UserMap extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style ={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
  }
});