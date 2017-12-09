import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, Text } from 'react-native';
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
      ]
    }
  }

  render() {
    // console.log('CARDS PROPS:', this.props)
    return (
      <ScrollView style={styles.cards}>
        <Text>{this.props.train}</Text>
        {this.props.statusText.length > 0 ? (
          <Card>
            <Text> {this.props.statusText} </Text>
          </Card>
        ) : null }        
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