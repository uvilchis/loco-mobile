import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, Text, Picker } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import axios from 'axios';
import ComplaintCard from './ComplaintCard';
import Schedule from './Schedule';
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
      direction: 'N',
      routeId: '',
      stopId : '',
      stationsN : [],
      stationsS: [],
      complaints: this.defaultComplaints.map((el) => Object.assign({}, el)),
      schedule : []
    };
    this.handleDirectionSelect = this.handleDirectionSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    console.log('PROPS AT DETAILS',this.props)
    axios.get(`${URL}/api/route/stops`, {
      params: {
        sub: 'mta',
        route_id: this.props.routeName
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

  render() {
    return (
      <ScrollView style={styles.cards}>
        <Button
          title="Uptown"
          onPress={()=>{this.handleDirectionSelect('N')}}
        />
        <Button
          title="Downtown"
          onPress={()=>{this.handleDirectionSelect('S')}}
        />
        <Picker
          style={styles.picker}
          selectedValue={this.state.stopId}
          onValueChange={(itemValue, itemIndex) => this.handleChange(itemValue)}
        >
        <Picker.Item label='Please select a station...' value=''/>
        {
          this.state.direction === 'N' ?
          this.state.stationsN.map((station, idx) =>
           <Picker.Item
              label={station.stop_name}
              value={station.stop_id}
              key={idx}
              route_id={station.route_id}
            />
          ) :
          this.state.stationsS.map((station, idx) =>
            <Picker.Item
              label={station.stop_name}
              value={station.stop_id}
              key={idx}
              route_id={station.route_id}
            />
          )
        }
        </Picker>
        {
          this.state.schedule.length > 0 ? <Schedule schedule={this.state.schedule}/> : null
        }
        {this.state.stopId !== '' ? (
          this.state.complaints.map((complaint, idx) =>
            <ComplaintCard complaint={complaint.name} count={complaint.count}
              key={idx} train={this.state.routeId} selected={this.state.stopId}
              handleAdd={this.handleAdd}
            />
        )) : null }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  picker: {
    borderColor: 'black'
  },
  cards: {
    paddingVertical: 10
  }
})
