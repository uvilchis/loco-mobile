import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import StatusMarker from './StatusMarker';

import Helpers from '../lib/util';

const Favorite = (props) => (
  <View style={styles.inner}>
    <View style={styles.icon}>
      <Text style={[styles.symbols, Helpers.LineStyleHelper(props.routeId)]}>{props.routeId.toUpperCase()}</Text>
    </View>
    <View>
      <Text>{props.stopName}</Text>
    </View>
    <View>
      <EvilIcons
        style={{ alignSelf: 'center' }}
        name="chevron-right"
        color='darkgrey'
        size={32}
        onPress={() => props.onDetailsPress(props.routeId, { stop_id: props.stopId, stop_name: props.stopName })}/>
    </View>
  </View>
);

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

export default Favorite;