import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Animated, Dimensions, Easing, ScrollView } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';

import ComplaintCard from './ComplaintCard';
import Schedule from './Schedule';

import CustomToggle from './CustomToggle';
import StationSelect from './StationSelect';
import URL from '../env/urls';

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.defaultComplaints = [
      { name: 'delayed', count: 0 },
      { name: 'closed', count: 0 },
      { name: 'accident', count: 0 },
      { name: 'crowded', count: 0 }
    ];
    this.state = {
      staticSched : false,
      compressed: false,
      direction: '',
      routeId: '',
      stopId : '',
      stationsN : [],
      stationsS: [],
      schedule : [],
      complaints: this.defaultComplaints.map((el) => Object.assign({}, el))
    };

    this.dropValue = new Animated.Value(0);

    this.drop = this.drop.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.handleDirectionSelect = this.handleDirectionSelect.bind(this);
    this.onDirectionSelect = this.onDirectionSelect.bind(this);
  }

  componentDidMount() {
    this.drop();
    axios.get(`${URL}/api/route/stops`, {
      params: { 
        sub: 'mta', 
        route_id: this.props.route.name
      }
    })
    .then(({ data }) => {
      this.setState({
        routeId: this.props.routeName,
        stationsN: data.N,
        stationsS: data.S
      }, () => {
        console.log('STATE AT CARDS', this.state)
        console.log('PROPS AT CARDS', this.props)
      })
    })
    .catch((error) => console.log(error));
  }

  handleDirectionSelect(direction) {
    this.setState({ direction : direction }, ()=> {console.log(this.state.direction)})
  }

  handleChange(itemValue) {
    let newState= {};
    let dayNumber = new Date().getDay();
    let dayTranslator = { 0: 'SUN', 6: 'SAT' }
    let day = dayTranslator[dayNumber] || 'WKD';
    let time = new Date().toLocaleTimeString('en-gb');
    this.setState({
      stopId: itemValue
    }, () => {
      axios.get(`${URL}/api/times/stoproute`, {
        params : {
          sub : 'mta',
          stop_id  : this.state.stopId,
          route_id : this.state.routeId
        }
      })
      .then((response ) => {
        newState.schedule = response.data.filter((el) => el.arrival_time >= time && el.route_type === day).slice(0, 10);
        console.log(newState)
      })
      .catch((err) => console.error(err))
    })
  }

  handleAdd(type) {
    this.setState({
      currentComplaint: type
    }, () => {
      axios.post(`${URL}/api/report/add`, {
        sub: 'mta',
        type: this.state.currentComplaint,
        stop_id: this.state.stopId,
        route_id: this.state.routeId
      })
      .then((response) => {
        this.handleChange(this.state.stopId)
      })
      .catch((err) => {
        console.error(err)
      })
    })
  }

  drop() {
    this.dropValue.setValue(0);
    Animated.timing(
      this.dropValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(this.drop);
  }

  onDirectionSelect(direction) {
    this.setState({ direction });
  }

  onSelect(stopId) {
    this.setState({ stopId });
  }

  render() {
    return (
      // <ScrollView style={styles.cards}>
      //   <Button
      //     title="Uptown"
      //     onPress={()=>{this.handleDirectionSelect('N')}}
      //   />
      //   <Button
      //     title="Downtown"
      //     onPress={()=>{this.handleDirectionSelect('S')}}
      //   />
      //   <Picker
      //     style={styles.picker}
      //     selectedValue={this.state.stopId}
      //     onValueChange={(itemValue, itemIndex) => this.handleChange(itemValue)}
      //   >
      //   <Picker.Item label='Please select a station...' value=''/>
      //   {
      //     this.state.direction === 'N' ?
      //     this.state.stationsN.map((station, idx) =>
      //      <Picker.Item
      //         label={station.stop_name}
      //         value={station.stop_id}
      //         key={idx}
      //         route_id={station.route_id}
      //       />
      //     ) :
      //     this.state.stationsS.map((station, idx) =>
      //       <Picker.Item
      //         label={station.stop_name}
      //         value={station.stop_id}
      //         key={idx}
      //         route_id={station.route_id}
      //       />
      //     )
      //   }
      //   </Picker>
      //   {
      //     this.state.schedule.length > 0 ? <Schedule schedule={this.state.schedule}/> : null
      //   }
      //   {this.state.stopId !== '' ? (
      //     this.state.complaints.map((complaint, idx) =>
      //       <ComplaintCard complaint={complaint.name} count={complaint.count}
      //         key={idx} train={this.state.routeId} selected={this.state.stopId}
      //         handleAdd={this.handleAdd}
      //       />
      //   )) : null }

      <ScrollView style={styles.container}>
        <Animated.View
          style={[styles.downButton, {
            transform: [{
              translateY: this.dropValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [5, 0, 5]
              })
            }]
          }]}>
          <EvilIcons
            name="chevron-down"
            size={50}
            color="black"
            onPress={this.props.hideModal} />
        </Animated.View>
        <View style={styles.inner}>
          <Text style={styles.directionSelect}>Select Direction</Text>
          <CustomToggle style={{}} onDirectionSelect={this.onDirectionSelect} />
          <Text style={styles.stationSelect}>Select Station</Text>
          <StationSelect 
            stations={this.state.stationsN}
            onSelect={this.onSelect} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  },
  inner: {
    marginTop: 60
  },
  picker: {
    borderColor: 'black'
  },
  cards: {
    paddingVertical: 10
  },
  downButton: {
    position: 'absolute',
    left: (Dimensions.get('window').width / 2) - 25
  },
  directionSelect: {
    fontSize: 24,
    marginTop: 20,
    margin: 12
  },
  stationSelect: {
    fontSize: 24,
    margin: 12,
    marginTop: 24
  }
})
