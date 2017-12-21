import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

export default class MapCallout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      duration: ''
    }
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
        <View style={styles.text}>
          <Text>{this.props.stop.stop_name}</Text>
          <Text>{this.state.duration.length !== 0 ? this.state.duration + ' away' : 'loading...'}</Text>
        </View>
        <EvilIcons
          style={styles.button}
          name="plus"
          color="darkgrey"
          size={24} />
      </View>
    )
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
  text: {
    flexDirection: 'column'
  },
  button: {
    marginLeft: 12
  }
});
