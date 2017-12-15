import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Button } from 'react-native';
import axios from 'axios';
import TrainLine from './TrainLine';

export default class TrainLines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: []
    };
    this.navToLines = this.navToLines.bind(this)
  }

  componentDidMount() {
    axios.get(`http://ec2-18-221-253-159.us-east-2.compute.amazonaws.com/loco/service?sub=mta`)
    .then((response) => {
      this.setState({
        service: response.data.lines
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }

  navToLines(idx) {
    this.props.navigation.navigate('Details', { lines: this.state.service[idx] })
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.text}>Welcome to loco, your one stop resource for MTA delays</Text>
        {this.state.service.map((line, idx) =>
          <TrainLine key={idx} line={line} idx={idx} navToLines={this.navToLines} />
        )}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 25
  }
});
