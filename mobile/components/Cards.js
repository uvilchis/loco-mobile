import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, Text, Picker } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import axios from 'axios';
import ComplaintCard from './ComplaintCard';

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compressed: false,
      complaints: [
        'delayed',
        'closed',
        'accident',
        'crowded'
      ], 
      stations: [], 
      selected: ''
    }
  }

  componentDidMount() {
    axios.get(`http://ec2-18-221-253-159.us-east-2.compute.amazonaws.com/loco/stops/routes?sub=mta&route_id=${this.props.train}`)
    .then((response) => { 
      let arrSize = response.data.length
      this.setState({
        stations: response.data.slice(0, (arrSize/2))
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }

  render() {
    // console.log('CARDS PROPS:', this.props)
    return (
      <ScrollView style={styles.cards}>
        <Picker style={styles.picker}
          selectedValue={this.state.selected}
          onValueChange={(itemValue, itemIndex) => this.setState({selected: itemValue})}>
          <Picker.Item label='Please select a station...' value='' />
          {this.state.stations.map((station, idx) => {
            return <Picker.Item label={station.stop_name} value={station.stop_id} key={idx} />
          })}
        </Picker>
        
        {this.state.selected !== '' ? (
          this.state.complaints.map((complaint, idx) => 
            <ComplaintCard complaint={complaint} key={idx} train={this.props.train} selected={this.state.selected}
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