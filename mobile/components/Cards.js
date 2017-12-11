import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, Text, Picker } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
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
      console.log(response.data)
      this.setState({
        stations: response.data
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
        <Picker
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) => this.setState({selected: itemValue})}>
          {this.state.stations.map((station, idx) => {
            return <Picker.Item label={station.stop_name} value={station.stop_name} key={idx} />
          })}
        </Picker>
        {this.props.statusText.length > 0 ? (
          <Card>
            <Text> {this.props.statusText} </Text>
          </Card>
        ) : null }        
        {this.state.complaints.map((complaint, idx) => 
          <ComplaintCard complaint={complaint} key={idx} train={this.props.train}
          />
        )}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  cards: {
    paddingVertical: 10
  }
})