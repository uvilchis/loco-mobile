import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, Animated, Dimensions, Easing, RefreshControl, View, PanResponder, TouchableOpacity, Alert } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';

import URL from '../env/urls';

import RouteSelect from '../shared/RouteSelect';
import StopSelect from '../shared/StopSelect';

export default class AddFavorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes : [],
      routeId: '',
      stopsN: [],
      stopsS: [],
      touchableEnabled: false
    };
    this.onRouteSelect = this.onRouteSelect.bind(this);
    this.onStopSelect = this.onStopSelect.bind(this);
    this.onConfirm = this.onConfirm.bind(this);

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
    .catch((error) => console.log(error));
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
      newState.stopsN = data.N;
      newState.stopsS = data.S;
      this.setState(newState);
    })
    .catch((error) => console.log(error));
  }

  onStopSelect(stopId, stopName) {
    this.setState({
      stopId: stopId,
      stopName: stopName,
      touchableEnabled: true
    });
  }

  onConfirm() {
    if (this.state.touchableEnabled) {
      axios.post(`${URL}/api/favorites/add`, {
        sub: 'mta',
        route_id: this.state.routeId,
        stop_id: this.state.stopId,
        stop_name: this.state.stopName
      })
      .then(({ data }) => this.props.handleAddFavorite(data.favorites))
      .catch((error) => Alert.alert(
        '',
        'Please Login to Add a Favorite',
        [
          {text: 'OK', style: 'cancel'}
        ]
      ));
    }
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
            routes={this.state.routes}
            onRouteSelect={this.onRouteSelect} />
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Select a stop</Text>
            </View>
          <StopSelect
            stops={this.state.stopsN}
            onStopSelect={this.onStopSelect} />
          <TouchableOpacity
            onPress={this.onConfirm}
            style={[styles.confirmButton, { backgroundColor: this.state.touchableEnabled ? 'cadetblue' : 'lightgrey' }]}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
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
  },
  confirmButton: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'center',
    borderRadius: 20
  },
  confirmText: {
    color: 'white',
    fontSize: 20
  }
});
