import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, RefreshControl, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';
import TrainLine from './TrainLine';
import URL from '../env/urls';

export default class TrainLines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: [],
      refreshing: false,
      showIndicator: true
    };

    this._onRefresh = this._onRefresh.bind(this);
    this._fetch = this._fetch.bind(this);
    this._fetchTimer = this._fetchTimer.bind(this);
  }

  componentDidMount() {
    this._fetch({ showIndicator: false });
  }

  componentWillUnmount() {
    if (this.timer) { clearTimeout(this.timer); }
  }

  _onRefresh() {
    this.setState({ refreshing: true }, () => {
      this._fetch({ refreshing: false });
    });
  }

  _fetch(newState = {}) {
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
      this.setState(newState, this._fetchTimer);
    })
    .catch((error) => console.log(error));
  }

  _fetchTimer() {
    if (this.timer) { clearTimeout(this.timer); } // Make sure timer is fresh
    this.timer = setTimeout(this._fetch, 60000); // Refresh every minute
  }

  render() {
    return (
      <ScrollView
        style={styles.main}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh} /> }>
        {this.state.showIndicator ?
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="cadetblue" />
          </View> :
          this.state.service.map((line, idx) =>
            <TrainLine key={idx} line={line} idx={idx} onDetailsPress={this.props.onDetailsPress}/>)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white'
  },
  loader: {
    flex: 1,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center'
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