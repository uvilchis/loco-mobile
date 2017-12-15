import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Button } from 'react-native';
import axios from 'axios';
import TrainLine from './TrainLine';
import URL from '../env/urls';

export default class TrainLines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: []
    };
    this.onDetailsClick = this.onDetailsClick.bind(this);
  }

  componentDidMount() {
    let newState = {};
    axios.get(`${URL}/api/service?sub=mta`)
    .then(({ data }) => {
      newState.service = data.lines;
      return axios.get(`${URL}/api/report/getallcomplaintcounts?sub=mta`);
    })
    .then(({ data }) => {
      newState.service.forEach((a) => {
        if (a.name === 'SIR') {
          return a.countedRoutes = [{ name: a.name, count: data[a.name] || 0}];
        }
        a.countedRoutes = a.name.split('').reduce((acc, b) => {
          acc.push({ name: b, count: data[b] || 0 });
          return acc;
        }, []);
      });
      this.setState(newState)
    })
    .catch((err) => console.error(err));
  }

  onDetailsClick(idx) {
    this.props.navigation.navigate('Details', { lines: this.state.service[idx] })
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        {this.state.service.map((line, idx) =>
          <TrainLine key={idx} line={line} idx={idx} />
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
