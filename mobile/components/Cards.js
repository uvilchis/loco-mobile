import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, Button, Text } from 'react-native';
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
      ]
    }
  }

  render() {
    console.log('CARDS PROPS:', this.props)
    return (
      <ScrollView style={styles.cards}>
        <Text>{this.props.train}</Text>
        {this.state.complaints.map((complaint, idx) => 
          <ComplaintCard complaint={complaint} key={idx} />
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