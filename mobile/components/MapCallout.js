import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const MapCallout = (props) => (
  <View style={styles.container}>
    <Text>{props.stop.stop_name}</Text>
    <EvilIcons
      style={styles.button}
      name="plus"
      color="darkgrey"
      size={24} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
    paddingRight: 0
  },
  button: {
    marginLeft: 12
  }
});

export default MapCallout;