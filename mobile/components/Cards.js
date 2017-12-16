import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, Text, Picker } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import axios from 'axios';
import ComplaintCard from './ComplaintCard';

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
      complaints: this.defaultComplaints.map((el) => Object.assign({}, el))
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this)
  }
  
  componentDidMount() {
    axios.get(`http://10.16.1.191:3000/api/route/stops`, {
      params: { 
        sub: 'mta', 
        route_id: this.props.routeId 
      }
    })
    .then(({ data }) => {
      this.setState({ 
        routeId: this.props.routeId,
        stationsN: data.N,
        stationsS: data.S
      })
    })
    .catch((error) => console.log(error));
  }

  handleChange(itemValue) {
    let newState= {};
    this.setState({
      stopId: itemValue
    }, () => {
      axios.get(`http://10.16.1.191:3000/api/report/stoproute?sub=mta&stop_id=${this.state.stopId}&route_id=${this.state.routeId}`)
      .then((response) => {
        let defaults = this.defaultComplaints.map((a) => Object.assign({}, a));
        let newComplaints = response.data.reduce((acc, b) => {
          let temp = acc.find((el) => el.name === b.name);
          temp ? temp.count = b.count : acc.push(b);
          return acc;
        }, defaults);
      
        newState.complaints = newComplaints;
        this.setState(newState);
      })
      .catch((err) => {
        console.error(err)
      })
    })
  }

  handleAdd(type) {
    this.setState({
      currentComplaint: type
    }, () => {
      axios.post(`http://10.16.1.191:3000/api/report/add`, {
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
        <Picker style={styles.picker}
          selectedValue={this.state.direction}
          onValueChange={(itemValue, itemIndex) => this.setState({direction: itemValue})}>
          <Picker.Item label='Please select a direction...' value='' />
          <Picker.Item label='Northbound' value='N' />
          <Picker.Item label='Southbound' value='S' />
        </Picker>   
        <Picker style={styles.picker}
          selectedValue={this.state.stopId}
          onValueChange={(itemValue, itemIndex) => this.handleChange(itemValue)}>
          <Picker.Item label='Please select a station...' value='' />
          {this.state.direction === 'N' ?
            (this.state.stationsN.map((station, idx) => {
              return <Picker.Item label={station.stop_name} value={station.stop_id} key={idx}
                route_id={station.route_id}
              />})) : (this.state.stationsS.map((station, idx) => {
                return <Picker.Item label={station.stop_name} value={station.stop_id} key={idx}
                  route_id={station.route_id}
              />
              }))
          }
        </Picker>             
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