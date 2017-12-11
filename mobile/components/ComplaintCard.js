import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import axios from 'axios';

export default class ComplaintCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaintData: [{count: 0}]
    }
  }

  componentDidMount() {
    console.log(this.props);
    axios.get(`http://10.16.1.191:3000/api/report?sub=mta&type=${this.props.complaint}&stop_id=${this.props.selected}&route_id=${this.props.train}`)
    .then((response) => {
      console.log(response.data)
      this.setState({
        complaintData: response.data
      })
    })
    .catch((err) => {
      console.error(err)
    })
  }
  
  render() {
    // console.log('COMPLAINTCARD PROPS', this.props)
    return (
      <ScrollView>
        <Card style={styles.detailsBar} >    
          <Text style={styles.text} >
            {this.props.complaint}
          </Text>
          <Text>
            {this.state.complaintData.count}
          </Text>
          <Button 
            onPress={() => {
              console.log('pressed complaint details!')  
            }}
            title="see more"
            color="#841584"
          />
        </Card>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  detailsBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18
  }
})