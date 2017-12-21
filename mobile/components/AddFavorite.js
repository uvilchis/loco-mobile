
import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Animated, Dimensions, Easing, RefreshControl, View, PanResponder } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';
import URL from '../env/urls';
import RouteSelect from './RouteSelect'
import StationSelect from './StationSelect'

export default class AddFavorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes : [],
      routeId: '',
      stationsN: [],
      stationsS: []
    };
    this.onRouteSelect = this.onRouteSelect.bind(this);
    this.onStationSelect = this.onStationSelect.bind(this);

    this._dropValue = new Animated.Value(0);
    this._drop = this._drop.bind(this);
  }

  componentDidMount() {
    this._drop();

    let newState = {};
    axios.get(`${URL}/api/routes`, {
      params: {
        sub: 'mta'
      }
    })
    .then(({ data }) => {
      newState.routes = data.reduce((acc, el) => {
        if (el.route_id.length === 1) { acc.push(el); }
        return acc;
      }, []);
      this.setState(newState);
    })
    .catch((error) => console.log(error))
  }

  onRouteSelect(routeId) {
    let newState = { routeId };
    axios.get(`${URL}/api/route/stops`, {
      params: {
        sub: 'mta',
        route_id: routeId
      }
    })
    .then(({ data }) => {
      newState.stationsN = data.N;
      newState.stationsS = data.S;
      this.setState(newState);
    })
    .catch((error) => console.log(error));
  }

  onStationSelect(stopId, stopName) {
    axios.post(`${URL}/api/favorites/add`, {
      route_id: this.state.routeId,
      stop_id: stopId,
      stop_name: stopName
    })
    .then(({ data }) => {
      this.props.handleAddFavorite(data.favorites);
      this.props.hideModal();
    })
    .catch((error) => console.log(error));
  }

  _drop() {
    this._dropValue.setValue(0);
    Animated.timing(
      this._dropValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(this._drop);
  }

  render() {
    return (
      <ScrollView
        style={styles.container}>
        <Animated.View
          style={[styles.downButton, {
            transform: [{
              translateY: this._dropValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [5, 0, 5]
              })
            }]
          }]}>
          <EvilIcons
            name="chevron-down"
            size={50}
            color="black"
            onPress={this.props.hideModal} />
        </Animated.View>
        <View style={styles.inner}>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Select a route</Text>
          </View>
          <RouteSelect
            style={styles.stationStyle}
            routes={this.state.routes}
            onRouteSelect={this.onRouteSelect} />
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Select a station</Text>
            </View>
          <StationSelect
            style={styles.stationStyle}
            stations={this.state.stationsN}
            onStationSelect={this.onStationSelect} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: 'white'
  },
  inner: {
    flex: 1,
    marginTop: 40
  },
  downButton: {
    position: 'absolute',
    left: (Dimensions.get('window').width / 2) - 25
  },
  section: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    marginHorizontal: 16,
    marginBottom: 12
  },
  sectionHeader: {
    fontSize: 24,
    marginBottom: 4
  }
});
