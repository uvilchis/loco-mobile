import React, { Component } from 'react';
import { Image, View, Text, Modal, Button, StyleSheet, Dimensions } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import axios from 'axios';
import geodist from 'geodist';
import URL from '../env/urls';
import MapLineNav from './MapLineNav';
import Polyline from '@mapbox/polyline';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

export default class UserMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: {},
      results: [],
      modalVisible: false,
      selected: '',
      coords: [],
      directionsData: {}
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
      }, () => {
        console.log('THIS.STATE.RESULTS:', this.state.results)
      })
      .catch((err) => {
        console.error('ERROR IN AXIOS REQUEST', err)
      })
    })
  }

  getDirections = async (startLoc, destinationLoc) => { 
    let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&mode=walking`)
    let respJson = await resp.json();
    this.setState({
      directionsData: respJson
    }, () => {
      console.log('THIS.STATE.DIRECTIONSDATA:', this.state.directionsData)
      // console.log('THIS.STATE.DIRECTIONSDATA.ROUTES:', this.state.directionsData.routes)
    })
    
    let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
    let coords = points.map((point, index) => {
      return {
        latitude : point[0],
        longitude : point[1]
      }
    })
    this.setState({coords: coords})
    return coords;
  }

  render() {
    // console.log('USERMAP LOCATION STATE:', this.state.location)
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
        {this.state.location.coords ? (
          <MapView.Marker
            coordinate={{latitude: Number(this.state.location.coords.latitude), longitude: Number(this.state.location.coords.longitude)}}
            title={"HI! IT\'S ME!!!"}
            onPress={() => {
              // console.log('you pressed me!!!')
              // console.log(`'${this.state.location.coords.latitude}', '${this.state.location.coords.longitude}'`)
              // this.getDirections("40.750808794289775, -73.97638340930507", "40.750409, -73.9764837")
              this.state.results.forEach((station, idx) => {  
                this.getDirections(`'${this.state.location.coords.latitude}', '${this.state.location.coords.longitude}'`, `'${station.stop_lat}', '${station.stop_lon}'`)
              })
            }}
            pinColor={'#38A2FF'}> 
              <MapView.Callout>
                {/* <Text>{this.state.directionsData.routes[0].legs}</Text>
                <Text>{station.duration.text}</Text>
                <Text>{station.distance.text}</Text> */}
              </MapView.Callout>  
          </MapView.Marker> ) : null }         
          {this.state.results.map((marker, idx) => (
            <MapView.Marker
              coordinate={{latitude: Number(marker.stop_lat), longitude: Number(marker.stop_lon)}}
              description={marker.stop_name}
              onPress={() => {
                this.setState({
                  modalVisible: true,
                  selected: marker.stop_name
                })
              }}
              key={idx}>            
            </MapView.Marker>
          ))}        
        </MapView>

        <MapView.Polyline
          coordinates= {[{
            latitude : 40.750409,
            longitude : -73.9764837
          }]}
          strokeWidth={4}
          strokeColor="blue" 
        />

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