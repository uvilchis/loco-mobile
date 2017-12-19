import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Image, Button } from 'react-native';
import MapLine from './MapLine';

export default class MapDeets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      unique: []
    }
  }

  componentDidMount() {
    console.log(this.props);
    var unique = {};
    this.props.lines.forEach((item) => {
      unique[item.route_id] = item.route_id;
    })
    this.setState({ unique: Object.keys(unique) })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>{this.props.stopName}</Text>
        {this.state.unique.map((line, idx) => 
          <MapLine key={idx} line={line} navigation={this.props.navigation} />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})