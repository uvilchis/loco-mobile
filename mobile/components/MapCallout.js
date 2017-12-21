import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

export default class MapCallout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      duration: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    nextProps.directionsData.duration ? 
    this.setState({
      duration: nextProps.directionsData.duration.text
    }) : null
  }
  
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.name}>{this.props.stop.stop_name}</Text>
          <Text style={styles.count}>{`${this.props.stop.count || 0} complaints`}</Text>
          <Text>{this.state.duration.length !== 0 ? this.state.duration + ' away' : 'loading...'}</Text>
        </View>
        <EvilIcons
          style={styles.button}
          name="plus"
          color="darkgrey"
          size={24} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
    paddingRight: 0
  },
  inner: {
  },
  name: {
    fontSize: 16
  },
  count: {
    fontSize: 12,
    color: 'darkgrey'
  },
  button: {
    marginLeft: 12
  }
});
