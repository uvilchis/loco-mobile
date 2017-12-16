import React, { Component } from 'react';
import { Constants, Location, Permissions, MapView } from 'expo';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

export default class UserMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: { coords: {latitude: 0, longitude: 0}},
      results: [],
      dist: 0.5
    };
  }
  
  componentWillMount() {
    this.locationChanged()
    .then((response) => {
      console.log(response)
      return axios.get(`http://10.16.1.191:3000/api/stops/coords`, {
        sub: 'mta',
        lat: this.state.location.coords.latitude,
        long: this.state.location.coords.longitude,
        dist: this.state.dist
      })
      .then((response) => {
        this.setState({
          results: response.data
        })
      })
      .catch((err) => {
        console.error(err)
      })
    })
    .catch((err) => {
      console.error(err)
    })  
  }

  locationChanged = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    } 
    let location = await Location.getCurrentPositionAsync({});
    console.log(location)
  }

  render() {
    console.log('THIS.STATE.LOCATION IN USERMAP:', this.state.location)
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 40.750808794289775,
          longitude: -73.97638340930507,
          latitudeDelta: 0.01,
          longitudeDelta: 0.05,
        }}
      />
    );
  }
}

UserMap.navigationOptions = {
  title: 'Map',
}