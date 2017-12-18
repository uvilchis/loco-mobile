import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import axios from 'axios';

export default class ComplaintCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <View style={styles.container}>
          <Text style={styles.type}>
            {this.props.name}
          </Text>
          <View>
            <Text style={styles.text}>
              {this.props.count}
            </Text>    
            <View style={styles.button}>
              <Button
                onPress={() => {
                  // this.props.handleAdd(this.props.complaint)
                }}
                title="+"
                color='#841584'
              />
            </View>        
          </View>
        </View>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  type: {
    fontWeight: 'bold',
    fontSize: 18
  },
  text: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18
  }, 
  button: {
    flex: 3,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})