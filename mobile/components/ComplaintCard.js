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
  
  handleComplaintSubmit(event) {
    let value = event.target.value;
    axios.post('/api/report/add', {
      sub: 'mta',
      type: value,
      stop_id: this.state.stopId,
      route_id: this.state.routeId
    })
    .then(({ data }) => {
      let complaints = this.state.complaints.slice();
      complaints.find((el) => el.name === value).count = data.count;
      this.setState({ complaints });
    })
    .catch((error) => console.log(error));
  }

  render() {
    // console.log('COMPLAINTCARD PROPS', this.props)
    return (
      <ScrollView>
        <Card style={styles.detailsBar} >    
          <Text style={styles.text} >
            {this.props.complaint}
          </Text>
          <Button
            onPress={() => {
              console.log('pressed!')
              axios.post(`http://10.16.1.191:3000/api/report/add`, {
                sub: 'mta',
                type: this.props.complaint,
                stop_id: this.props.selected,
                route_id: this.props.train
              })
              .then((response) => {
                console.log(response.data)
                this.props.count += 1
              })
              .catch((err) => {
                console.error(err)
              })
            }}
            title="upvote"
            color='#841584'
          />
          <Text>
            {this.props.count}
          </Text>
          <Button
            onPress={() => {
              console.log('pressed!')
              axios.post(`http://10.16.1.191:3000/api/report/subtract`)
              .then((response) => {
                console.log(response.data)
              })
              .catch((err) => {
                console.error(err)
              })
            }}
            title="downvote"
            color='#841584'
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