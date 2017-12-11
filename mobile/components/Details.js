import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, Alert, Picker } from 'react-native';
import axios from 'axios';
import Cards from './Cards';

const markers = {
  "GOOD SERVICE": require('../images/markers/green.png'),
  "SERVICE CHANGE": require('../images/markers/red.png'),
  "PLANNED WORK": require('../images/markers/yellow.png'),
  "DELAYS": require('../images/markers/yellow.png')
}

const line = {
  "1": require('../images/line/1.png'),
  "2": require('../images/line/2.png'),
  "3": require('../images/line/3.png'),
  "4": require('../images/line/4.png'),
  "5": require('../images/line/5.png'),
  "6": require('../images/line/6.png'),
  "7": require('../images/line/7.png'),
  "A": require('../images/line/A.png'),
  "C": require('../images/line/C.png'),
  "E": require('../images/line/E.png'),
  "B": require('../images/line/B.png'),
  "D": require('../images/line/D.png'),
  "F": require('../images/line/F.png'),
  "M": require('../images/line/M.png'),
  "G": require('../images/line/G.png'),
  "J": require('../images/line/J.png'),
  "Z": require('../images/line/Z.png'),
  "L": require('../images/line/L.png'),
  "N": require('../images/line/N.png'),
  "Q": require('../images/line/Q.png'),
  "R": require('../images/line/R.png'),
  "S": require('../images/line/S.png'),
  "SIR": require('../images/line/SIR.png')
}

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compressed: false
    }
  }

  // componentDidMount() {
  //   axios.get(`http://10.16.1.191/api/route/stops?route_id=${this.props.train}`)
  //   .then((response) => {
  //     console.log(response.data)
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   })
  // }

  render() {
    // console.log('DETAILS PROPS:', this.props)
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.icon}>
            <Image source={ line[this.props.train] } />
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