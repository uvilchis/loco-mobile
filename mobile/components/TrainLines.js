import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Button, RefreshControl } from 'react-native';
import axios from 'axios';
import TrainLine from './TrainLine';
import URL from '../env/urls';

export default class TrainLines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: [],
      refreshing: false
    };
    this.onDetailsPress = this.onDetailsPress.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  componentDidMount() {
    let newState = { refreshing: false};
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
      this.setState(newState);
    })
    .catch((error) => console.log(error));
  }

  _onRefresh() {
    this.setState({ refreshing: true }, () => {
      let newState = { refreshing: false };
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
      .catch((error) => console.log(error));
    });
  }

  // onDetailsPress(routeName) {
  //   this.props.navigation.navigate('Details', { routeName: routeName })
  onDetailsPress(route) {
    this.props.navigation.navigate('Details', { route })
  }

  render() {
    return (
      <ScrollView
        style={styles.main}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh} /> }>
        {this.state.service.map((line, idx) =>
          <TrainLine key={idx} line={line} idx={idx} onDetailsPress={this.onDetailsPress}/>)}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white'
  },
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
