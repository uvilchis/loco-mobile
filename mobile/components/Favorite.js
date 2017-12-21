import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import StatusMarker from './StatusMarker';

import Helpers from '../lib/util';

const Favorite = (props) => (
  <TouchableOpacity
    onPress={() => props.onDetailsPress(props.routeId, { stop_id: props.stopId, stop_name: props.stopName })}
    onLongPress={() => props.showAlert(props.stopId)}>
    <View style={styles.container}>
      <View style={styles.icon}>
        <Text style={[styles.symbols, Helpers.LineStyleHelper(props.routeId)]}>{props.routeId.toUpperCase()}</Text>
      </View>
      <View>
        <Text>{props.stopName}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => props.onDetailsPress(props.routeId, { stop_id: props.stopId, stop_name: props.stopName })}>
          <EvilIcons
            style={{ alignSelf: 'center' }}
            name="chevron-right"
            color='darkgrey'
            size={32} />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    flexDirection: 'row',
    flex: 2
  },
  symbols: {
    fontWeight: 'bold',
    fontSize: 28,
    textShadowOffset: { width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: '#dddddd'
  }
});

export default Favorite;
