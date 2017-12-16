import React, { Component } from 'react';

import { Constants, Location, Permissions, MapView } from 'expo';
import axios from 'axios';
import geodist from 'geodist';
import URL from '../env/urls';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

export default class UserMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: [],
      results: []
    };
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
    })
  }

  render() {
    console.log('RESULTS', this.state.results)
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 40.750808794289775,
          longitude: -73.97638340930507,
          latitudeDelta: 0.01,
          longitudeDelta: 0.05,
        }}
      >
        {this.state.results.map((marker, idx) => (
          <MapView.Marker
            coordinate={{latitude: Number(marker.stop_lat), longitude: Number(marker.stop_lon)}}
            title={marker.stop_id}
            description={marker.stop_name}
            key={idx}
          />
        ))}        
      </MapView>
    )
  }
}

UserMap.navigationOptions = {
  title: 'Map',
}