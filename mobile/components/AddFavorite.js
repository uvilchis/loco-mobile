
import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Button, RefreshControl, Modal, Picker, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import axios from 'axios';
import URL from '../env/urls';
import RouteSelect from './RouteSelect'
import StationSelect from './StationSelect'

export default class AddFavorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes : [],
      stopId : '',
      routeId: '',
      stationsN: [],
      stationsS: []
    };
    this.onRouteSelect = this.onRouteSelect.bind(this);
    this.onStationSelect = this.onStationSelect.bind(this);
  }

  componentDidMount() {
    let newState = {};
    axios.get(`${URL}/api/routes?sub=mta`)
    .then(({ data }) => {
      newState.routes = data;
      this.setState(newState);
    })
    .catch((error) => console.log(error))
  }

  onRouteSelect(routeId) {
    let newState = {}
    this.setState({ routeId }, ()=> {
      axios.get(`${URL}/api/route/stops?sub=mta`, {
        params: {
          route_id: this.state.routeId
        }
      })
      .then(({ data }) => {
        newState.stationsN = data.N;
        newState.stationsS = data.S;
        this.setState(newState)
      })
      .catch((data) => console.log(data))
    })
  }

  onStationSelect(stopId) {
    this.setState({ stopId }, () => {
      // TODO : first make a get request to obtain the station name, be sure to send that in the post request
      axios.get(`${URL}/api/stop?sub=mta`, {
        params : {
          stop_id : stopId
        }
      })
      .then(({ data }) => {
        let stopName = data[0].stop_name;
        return axios.post(`${URL}/api/favorites/add`, {
          route_id: this.state.routeId,
          stop_id: this.state.stopId,
          stop_name: stopName
        })
      })
      .then(({ data }) => {
        this.props.handleAddFavorite(data.favorites)
        this.props.hideModal()
      })
      .catch((err) => console.error(err))
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Add a Favorite</Text>
            <RouteSelect
              style={styles.stationStyle}
              routes={this.state.routes}
              onRouteSelect={this.onRouteSelect}
            />
            <StationSelect
              style={styles.stationStyle}
              stations={this.state.stationsN}
              onStationSelect={this.onStationSelect}
            />
            <Button
              title="Go Back"
              onPress={() => this.props.hideModal()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center'
  },
  scroll: {
    flex: 1
  },
  section: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    marginHorizontal: 16,
    marginBottom: 12
  },
  sectionHeader: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 4
  },
  stationStyle: {
  },
  icon: {
    // flex: 2
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  add: {
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'transparent',
    bottom: 20
  }
});
