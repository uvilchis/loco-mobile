import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class StationSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      search: '',
      filtered: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentWillMount() {
    // this.setState({
    //   filtered:
    // })
  }

  onChange(search) {
    let newState = {};
    newState.search = search;
    // filtered = this.props.stations.filter(
  }

  onSelect(idx) {
    console.log(idx);
  }

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          name="search"
          placeholder="Search for a station"
          value={this.state.search}
          onChangeText={this.onChange} />
        {this.state.filtered.map((el, idx) => 
          <TouchableOpacity
            key={idx}>
            {/* <Text> */}
          </TouchableOpacity>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  input: {
    
  }
});