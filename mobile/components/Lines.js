import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native';
import Details from './Details.js';

export default class Lines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      statusIcon: "", 
      statusText: ""
    }
  }

  componentDidMount() {
    this.props.navigation.state.params.lines.name === "SIR" ? 
    this.setState({
      lines: ["SIR"],
      statusIcon: this.props.navigation.state.params.lines.status,
      statusText: this.props.navigation.state.params.lines.text 
    }) :
    this.setState({
      lines: this.props.navigation.state.params.lines.name.split(''),
      statusIcon: this.props.navigation.state.params.lines.status,
      statusText: this.props.navigation.state.params.lines.text
    })
  }
  
  render() {
    // console.log('ALL LINES PROPS', this.props);
    // console.log('NAVIGATION STATE PARAMS LINES PROPS', this.props.navigation.state.params.lines.name)
    return (
      <ScrollView>
        {this.state.lines.map((train, idx) => 
          <Details train={train} key={idx} statusIcon={this.state.statusIcon} statusText={this.state.statusText} /> 
        )}
      </ScrollView>
    );
  }
}

Lines.navigationOptions = {
  title: 'Lines',
};