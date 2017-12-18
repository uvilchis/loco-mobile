import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Modal, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import axios from 'axios';
import URL from '../env/urls';
import { EvilIcons } from '@expo/vector-icons';

import ComplaintsInfo from './ComplaintsInfo';
import StationSelect from './StationSelect';
import Cards from './Cards';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compressed: false,
      modalVisible: false,
      currentComplaints: [],
      stationsN: [],
      stationsS: []
    };

    // Click handlers
    this.onStationSelect = this.onStationSelect.bind(this);

    // Animation handlers
    this.jumpValue = new Animated.Value(0);
    this.jumpAnim = this.jumpAnim.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    this.jumpAnim();

    let newState = {};
    axios.get(`${URL}/api/route/stops`, {
      params: {
        sub: 'mta',
        route_id: this.props.navigation.state.params.route
      }
    })
    .then(({ data }) => {
      newState.stationsN = data.N;
      newState.stationsS = data.S;
      return axios.get(`${URL}/api/report/reports`, {
        params: {
          sub: 'mta',
          route_id: this.props.navigation.state.params.route
        }
      })
    })
    .then(({ data }) => {
      newState.currentComplaints = data.map((el, idx) => {
        let temp = el[0].split('-').pop().slice(0, -1);
        let stop = newState.stationsN.find((a) => a.stop_id.includes(temp));
        let count = el[1];
        return { stop, count };
      })
      this.setState(newState);
    })
    .catch((error) => console.log(error));
  }

  onStationSelect(stopId) {
    console.log(stopId);
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

  showModal() {
    this.setState({ modalVisible: true });
  }

  hideModal() {
    this.setState({ modalVisible: false });
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <ComplaintsInfo currentComplaints={this.state.currentComplaints} />
        <Text style={styles.sectionHeader}>Select a station</Text>
        <StationSelect 
          style={styles.stationStyle}
          stations={this.state.stationsN} 
          onStationSelect={this.onStationSelect} />
        <Text style={styles.sectionHeader}>Detailed Complaints</Text>
      </ScrollView>
        <TouchableOpacity
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
          <Text>Add Complaint</Text>
        </TouchableOpacity>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.hideModal}>
          <Cards 
            hideModal={this.hideModal}
            route={this.props.navigation.state.params.route} />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
    paddingTop: 10
  },
  scroll: {
    flex: 1
  },
  sectionHeader: {
    fontSize: 24,
    marginTop: 20,
    margin: 16
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