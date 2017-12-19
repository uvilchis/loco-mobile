import React, { Component } from 'react';
import { Image, View, Text, Modal, Button } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import axios from 'axios';
import geodist from 'geodist';
import URL from '../env/urls';
import MapLineNav from './MapLineNav';


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

  render() {
    return (
      <View style={{flex: 1}} >
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
              description={marker.stop_name}
              onPress={() => {
                this.setState({
                  modalVisible: !this.state.modalVisible,
                  selected: marker.stop_name
                })
              }}
              key={idx}>            
            </MapView.Marker>
          ))}        
        </MapView>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => console.log("Modal has been closed.")}
        >
          <MapLineNav
            screenProps={this.state.results.filter((station, idx) => this.state.selected === station.stop_name)}
          />
          <Button
            onPress={() => {
              this.setState({
                modalVisible: false
              })
            }}
            title="Go Back"
            color='#841584'
          />
        </Modal>
      </View>
    )
  }
}

UserMap.navigationOptions = {
  title: 'Map',
}
