import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, RefreshControl, Modal, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import axios from 'axios';
import URL from '../env/urls';
import { EvilIcons } from '@expo/vector-icons';

import ComplaintsInfo from './ComplaintsInfo';
import StationSelect from './StationSelect';
import StationComplaints from './StationComplaints';
import CustomToggle from './CustomToggle';
import Cards from './Cards';

export default class Details extends Component {
  constructor(props) {
    super(props);

    this.defaultComplaints = [
      { name: 'delayed', count: 0 },
      { name: 'closed', count: 0 },
      { name: 'accident', count: 0 },
      { name: 'crowded', count: 0 }
    ];

    this.state = {
      refreshing: false,
      modalVisible: false,
      station: false,
      direction: '',
      stopId: '',
      currentComplaints: [],
      stationComplaints: [],
      stationsN: [],
      stationsS: []
    };

    // Click handlers
    this.onFetchComplaints = this.onFetchComplaints.bind(this);
    this.onAdd = this.onAdd.bind(this);

    // Helpers
    this._onRefresh = this._onRefresh.bind(this);
    this._fetchStops = this._fetchStops.bind(this);
    this._fetchReports = this._fetchReports.bind(this);
    this._fetchComplaints = this._fetchComplaints.bind(this);
    this._addComplaint = this._addComplaint.bind(this);
    this._formatReports = this._formatReports.bind(this);

    // Animation handlers
    this.jumpValue = new Animated.Value(0);
    this.jumpAnim = this.jumpAnim.bind(this);
  }

  componentDidMount() {
    this.jumpAnim();

    let newState = { refreshing: false };
    this._fetchStops()
    .then(({ data }) => {
      newState.stationsN = data.N;
      newState.stationsS = data.S;
      return this._fetchReports();
    })
    .then(({ data }) => {
      newState.currentComplaints = this._formatReports(data, newState.stationsN);
      this.setState(newState);
    })
    .catch((error) => console.log(error));
  }

  onStationSelect = (stopId) => this.setState({ stopId }, this.onFetchComplaints); 

  // True = uptown
  onDirectionSelect = (direction) => this.setState({ direction }, this.onFetchComplaints);

  onFetchComplaints() {
    if (!this.state.stopId || !this.state.direction) {
      return this.setState({ selected: false });
    }

    let stopId = this.state.stopId.slice(0, -1) + this.state.direction;

    this._fetchComplaints(stopId)
    .then(({ data }) => this.setState({ selected: true, stationComplaints: data }))
    .catch((error) => console.log(error));
  }

  onAdd(complaintType) {
    let newState = {};
    let stopId = this.state.stopId.slice(0, -1) + this.state.direction;
    this._addComplaint(complaintType, stopId)
    .then(({ data }) => {
      newState.stationComplaints = this.state.stationComplaints.slice();
      let temp = newState.stationComplaints.find((el) => el.name === complaintType);
      if (temp) { 
        temp.count = data.count; 
      } else {
        newState.stationComplaints.push({ name: complaintType, count: data.count });
      }
      return this._fetchReports();
    })
    .then(({ data }) => {
      newState.currentComplaints = this._formatReports(data, this.state.stationsN);
      this.setState(newState);
    })
    .catch((error) => console.log(error));
  }

  _onRefresh() {
    if (!this.state.selected) { return; }

    let newState = { refreshing: false };

    this.setState({ refreshing: true }, () => {
      this._fetchReports()
      .then(({ data }) => {
        newState.currentComplaints = this._formatReports(data, this.state.stationsN);
        return this._fetchComplaints(this.state.stopId)
      })
      .then(({ data }) => {
        newState.stationComplaints = data;
        this.setState(newState);
      })
      .catch((error) => console.log(error));
    });
  }

  _fetchStops() {
    return axios.get(`${URL}/api/route/stops`, {
      params: {
        sub: 'mta',
        route_id: this.props.navigation.state.params.route
      }
    });
  }

  _fetchReports() {
    return axios.get(`${URL}/api/report/reports`, {
      params: {
        sub: 'mta',
        route_id: this.props.navigation.state.params.route
      }
    });
  }

  _fetchComplaints(stopId) {
    return axios.get(`${URL}/api/report/stoproute`, {
      params: {
        sub: 'mta',
        route_id: this.props.navigation.state.params.route,
        stop_id: stopId
      }
    });
  }

  _addComplaint(type, stopId) {
    return axios.post(`${URL}/api/report/add`, {
      sub: 'mta',
      type: type,
      stop_id: stopId,
      route_id: this.props.navigation.state.params.route
    });
  }

  _formatReports(reports, stations) {
    return Object.entries(reports.reduce((acc, el) => {
      let temp = el[0].split('-').pop().slice(0, -1);
      let name = stations.find((a) => a.stop_id.includes(temp)).stop_name;
      acc[name] = acc[name] ? acc[name] + el[1] : el[1];
      return acc;
    }, {}));
  }

  jumpAnim() {
    this.jumpValue.setValue(0);
    Animated.timing(
      this.jumpValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(this.jumpAnim);
  }

  showModal = () => this.setState({ modalVisible: true });

  hideModal = () => this.setState({ modalVisible: false });

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh} />}>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Recent complaints</Text>
          </View>
          <ComplaintsInfo currentComplaints={this.state.currentComplaints} />

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Select a station</Text>
          </View>
          <StationSelect 
            stations={this.state.stationsN} 
            onStationSelect={this.onStationSelect} />

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Select direction</Text>
          </View>
          <CustomToggle onDirectionSelect={this.onDirectionSelect} />

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Station complaints</Text>
          </View>
          <StationComplaints
            stationComplaints={this.state.stationComplaints}
            selected={this.state.selected}
            onAdd={this.onAdd} />
        </ScrollView>

        {this.state.selected ? <TouchableOpacity
          onPress={this.showModal}
          style={styles.add}>
          <Animated.View
            style={{ 
              transform: [{
                translateY: this.jumpValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [5, -2, 5]
                })
              }]
            }}>
            <EvilIcons
              name='chevron-up'
              size={32}
              style={{ backgroundColor: 'transparent' }} />
          </Animated.View>
          <Text>View Schedule</Text>
        </TouchableOpacity> : null}

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.hideModal}>
          <Cards 
            hideModal={this.hideModal}
            routeId={this.props.navigation.state.params.route}
            stopId={this.state.stopId} />
        </Modal>
      </View>
    );
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

Details.navigationOptions = {
  title: 'Details',
  headerStyle: {
    backgroundColor: 'grey'
  },
  headerTitleStyle: {
    color: 'white'
  },
  headerTintColor: 'white'
};