import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
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
      results: [],
      iconLoaded: false
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
    console.log('RESULTS', this.state.results.length)
    return (
      <View style={{flex: 1}} >
        {this.state.results.map((marker, idx) => {
          <Image source={require('../images/line/2.png')} />
        })}
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 40.750808794289775,
            longitude: -73.97638340930507,
            latitudeDelta: 0.01,
            longitudeDelta: 0.05,
          }}
        >
          <MapView.Marker //for current location
            key={this.state.iconLoaded ? 'markerLoaded' : 'marker'}
            coordinate={{latitude: 40.750808794289775, longitude: -73.97638340930507}}
            title={'me!'}
            >
            <Text>Hello Christine</Text>
            <Image style={{height: 20, width: 20}} source={require('../images/line/A.png')} onLoadEnd={() => {if (!this.state.iconLoaded) this.setState({iconLoaded: true});}}/>
          </MapView.Marker>
          {this.state.results.map((marker, idx) => (
            <MapView.Marker
              coordinate={{latitude: Number(marker.stop_lat), longitude: Number(marker.stop_lon)}}
              title={marker.route_id}
              description={marker.stop_name}
              // identifier={marker.stop_id}
              key={idx}>
              <Image style={{width: 25, height: 25}} source={require('../images/line/3.png')} />
              
            </MapView.Marker>
          ))}        
        </MapView>
      </View>
    )
  }
}

UserMap.navigationOptions = {
  title: 'Map',
}