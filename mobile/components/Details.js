import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, Alert, Picker, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { EvilIcons } from '@expo/vector-icons';

import Cards from './Cards';

// const markers = {
//   "GOOD SERVICE": require('../images/markers/green.png'),
//   "SERVICE CHANGE": require('../images/markers/red.png'),
//   "PLANNED WORK": require('../images/markers/yellow.png'),
//   "DELAYS": require('../images/markers/yellow.png')
// }

// const line = {
//   "1": require('../images/line/1.png'),
//   "2": require('../images/line/2.png'),
//   "3": require('../images/line/3.png'),
//   "4": require('../images/line/4.png'),
//   "5": require('../images/line/5.png'),
//   "6": require('../images/line/6.png'),
//   "7": require('../images/line/7.png'),
//   "A": require('../images/line/A.png'),
//   "C": require('../images/line/C.png'),
//   "E": require('../images/line/E.png'),
//   "B": require('../images/line/B.png'),
//   "D": require('../images/line/D.png'),
//   "F": require('../images/line/F.png'),
//   "M": require('../images/line/M.png'),
//   "G": require('../images/line/G.png'),
//   "J": require('../images/line/J.png'),
//   "Z": require('../images/line/Z.png'),
//   "L": require('../images/line/L.png'),
//   "N": require('../images/line/N.png'),
//   "Q": require('../images/line/Q.png'),
//   "R": require('../images/line/R.png'),
//   "S": require('../images/line/S.png'),
//   "SIR": require('../images/line/SIR.png')
// }

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ modalVisible: true });
  }

  hideModal() {
    this.setState({ modalVisible: false });
  }

  render() {
    console.log(this.props);
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.cards}>
            {this.state.compressed ? (
              <Cards />
            ) : null }
          </View>
          <TouchableOpacity
            style={styles.add}
            onPress={() => console.log('test')}>
            <EvilIcons
              name='chevron-up'
              size={32} />
            <Text>Add Complaint</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onPress={this.showModal} >
          <Cards hideModal={this.hideModal} />
        </Modal>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  icon: {
    // flex: 2
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  add: {
    position: 'absolute',
    bottom: 0
  }
})
