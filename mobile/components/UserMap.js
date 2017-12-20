import React, { Component } from 'react';
import { Image, View, Text, Modal, StyleSheet, Animated } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';
import geodist from 'geodist';

import URL from '../env/urls';
import MapDeets from './MapDeets';
import MapCallout from './MapCallout';
import MapRoutePicker from './MapRoutePicker';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

export default class UserMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: [],
      results: [],
      modalVisible: false,
      selected: ''
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onDetailsPress = this.onDetailsPress.bind(this);

    this.opacityValue = new Animated.Value(1);
    this._fade = this._fade.bind(this);
  }

  componentWillMount() {
    this.locationChanged()
  }

  locationChanged = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({})
    this.setState({
      location: location
    }, () => {
      axios.get(`${URL}/api/stops/location`, {
        params: {
          lat: this.state.location.coords.latitude,
          lon: this.state.location.coords.longitude
        }
      })
      .then((response) => {
        this.setState({
          results: response.data
        })
      })
      .catch((err) => {
        console.error('ERROR IN AXIOS REQUEST', err)
      })
    });
  }

  onDetailsPress(route) {
    this.hideModal();
    this.props.navigation.navigate('Details', { route });
  }

  showModal() {
    this.setState({ modalVisible: true }, () => this._fade(0.4));
  }

  hideModal() {
    this.setState({ modalVisible: false }, () => this._fade(1));
  }

  _fade(final = 1) {
    Animated.timing(
      this.opacityValue,
      {
        toValue: final
      }
    ).start();
  }

  render() {
    return (
      <View
        style={styles.container}>
        <Animated.View
          style={[styles.map, { opacity: this.opacityValue }]}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 40.750808794289775,
              longitude: -73.97638340930507,
              latitudeDelta: 0.01,
              longitudeDelta: 0.05,
            }}>
            {this.state.results.map((marker, idx) =>
              <MapView.Marker
                coordinate={{latitude: Number(marker.stop_lat), longitude: Number(marker.stop_lon)}}
                onPress={() => this.setState({ selected: marker.stop_name })}
                key={idx}>
                <MapView.Callout
                  onPress={this.showModal}>
                  <MapCallout stop={marker} />
                </MapView.Callout>
              </MapView.Marker>)}
          </MapView>
        </Animated.View>
        <MapRoutePicker />
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.hideModal}>
          <MapDeets
            stopName={this.state.selected}
            lines={this.state.results.filter((station, idx) => this.state.selected === station.stop_name)}
            hideModal={this.hideModal}
            onDetailsPress={this.onDetailsPress} />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dimgrey'
  },
  map: {
    flex: 1
  }
});

UserMap.navigationOptions = {
  title: 'Map',
  headerStyle: {
    backgroundColor: 'grey'
  },
  headerTitleStyle: {
    color: 'white'
  },
  headerTintColor: 'white'
};
