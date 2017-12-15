import React, { Component } from 'react';
import { Constants, Location, Permissions, MapView } from 'expo';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

export default class UserMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: { coords: {latitude: 0, longitude: 0}},
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
    let location = await Location.getCurrentPositionAsync({});
    console.log(location)
  }

  render() {
    console.log(this.state.location)
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