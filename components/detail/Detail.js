import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, RefreshControl, Modal, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import axios from 'axios';
import { EvilIcons } from '@expo/vector-icons';

import ComplaintsInfo from './ComplaintsInfo';
import ScheduleModal from './ScheduleModal';
import StopComplaints from './StopComplaints';

import StopSelect from '../shared/StopSelect';
import CustomToggle from '../shared/CustomToggle';

import URL from '../env/urls';

export default class Detail extends Component {
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
      direction: '',
      stopId: '',
      currentComplaints: [],
      stopComplaints: [],
      stopsN: [],
      stopsS: []
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
    this._jumpValue = new Animated.Value(0);
    this._jumpAnim = this._jumpAnim.bind(this);
  }

  componentDidMount() {
    this._jumpAnim();
    let stopId = this.props.navigation.state.params.stop ? this.props.navigation.state.params.stop.stop_id : '';
    let newState = {
      refreshing: false,
      stopId: stopId
    };
    this._fetchStops()
    .then(({ data }) => {
      newState.stopsN = data.N;
      newState.stopsS = data.S;
      return this._fetchReports();
    })
    .then(({ data }) => {
      newState.currentComplaints = this._formatReports(data, newState.stopsN);
      this.setState(newState);
    })
    .catch((error) => console.log(error));
  }

  onStopSelect = (stopId) => this.setState({ stopId }, this.onFetchComplaints);

  // True = uptown
  onDirectionSelect = (direction) => this.setState({ direction }, this.onFetchComplaints);

  onFetchComplaints() {
    if (!this.state.stopId || !this.state.direction) {
      return this.setState({ selected: false });
    }

    let stopId = this.state.stopId.slice(0, -1) + this.state.direction;

    this._fetchComplaints(stopId)
    .then(({ data }) => this.setState({ selected: true, stopComplaints: data }))
    .catch((error) => console.log(error));
  }

  onAdd(complaintType) {
    let newState = {};
    let stopId = this.state.stopId.slice(0, -1) + this.state.direction;
    this._addComplaint(complaintType, stopId)
    .then(({ data }) => {
      newState.stopComplaints = this.state.stopComplaints.slice();
      let temp = newState.stopComplaints.find((el) => el.name === complaintType);
      if (temp) {
        temp.count = data.count;
      } else {
        newState.stopComplaints.push({ name: complaintType, count: data.count });
      }
      return this._fetchReports();
    })
    .then(({ data }) => {
      newState.currentComplaints = this._formatReports(data, this.state.stopsN);
      this.setState(newState);
    })
    .catch((error) => {
      Alert.alert(
        '',
        'Please log in to post a complaint',
        [
          {text: 'OK', style: 'cancel'}
        ]
      );
    });
  }

  _onRefresh() {
    if (!this.state.selected) { return; }

    let newState = { refreshing: false };

    this.setState({ refreshing: true }, () => {
      this._fetchReports()
      .then(({ data }) => {
        newState.currentComplaints = this._formatReports(data, this.state.stopsN);
        return this._fetchComplaints(this.state.stopId)
      })
      .then(({ data }) => {
        newState.stopComplaints = data;
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

  _formatReports(reports, stop) {
    
    return Object.entries(reports.reduce((acc, el) => {
      let temp = el[0].split('-').pop().slice(0, -1).toUpperCase();
      let name = stop.find((a) => a.stop_id.includes(temp)).stop_name;
      acc[name] = acc[name] ? acc[name] + el[1] : el[1];
      return acc;
    }, {}));
  }

  _jumpAnim() {
    this._jumpValue.setValue(0);
    Animated.timing(
      this._jumpValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(this._jumpAnim);
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
            <Text style={styles.sectionHeader}>Select a stop</Text>
          </View>
          <StopSelect
            stop={this.props.navigation.state.params.stop}
            stops={this.state.stopsN}
            onStopSelect={this.onStopSelect} />

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Select direction</Text>
          </View>
          <CustomToggle onDirectionSelect={this.onDirectionSelect} />

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Stop complaints</Text>
          </View>
          <StopComplaints
            stopComplaints={this.state.stopComplaints}
            selected={this.state.selected}
            onAdd={this.onAdd} />
          {this.state.selected ?
            <TouchableOpacity
              onPress={this.showModal}
              style={styles.bottomButton}>
              <Animated.View
                style={{
                  transform: [{
                    translateY: this._jumpValue.interpolate({
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
        </ScrollView>

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.hideModal}>
          <ScheduleModal
            direction={this.state.direction}
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
  bottomButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    marginBottom: 20
  }
});

Detail.navigationOptions = {
  title: 'Details',
  headerStyle: { backgroundColor: 'grey' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white'
};
