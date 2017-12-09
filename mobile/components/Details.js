import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import Cards from './Cards';

const markers = {
  "GOOD SERVICE": require('../images/markers/green.png'),
  "SERVICE CHANGE": require('../images/markers/red.png'),
  "PLANNED WORK": require('../images/markers/yellow.png'),
  "DELAYS": require('../images/markers/yellow.png')
}

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compressed: false
    }
  }

  render() {
    // console.log('DETAILS PROPS:', this.props)
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.icon}>
            <Text>{this.props.train}</Text>
          </View>
          <View style={styles.buttons}>
            <Image style={{width: 50, height: 50}} source={ markers[this.props.statusIcon] } />
            <Button 
              onPress={() => {
                console.log('pressed a Line!!')
                this.setState({
                  compressed: !this.state.compressed
                })
              }}
              title="Details"
              color='#841584'
            />
          </View>
        </View>
        <View style={styles.cards}>
          {this.state.compressed ? (
              <Cards train={this.props.train} statusText={this.props.statusText} />
          ) : null }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  icon: {
    flex: 2
  },
  buttons: {
    flex: 1.5,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})