import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';

export default class ComplaintCard extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <ScrollView>
        <Card>    
          <Text>
            {this.props.complaint}
          </Text>
        </Card>
      </ScrollView>
    )
  }
}

