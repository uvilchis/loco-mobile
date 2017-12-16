import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, Alert, Modal, TouchableOpacity, Animated, Easing } from 'react-native';
import axios from 'axios';
import Cards from './Cards';
import URL from '../env/urls';

const markers = {
  "GOOD SERVICE": require('../images/markers/green.png'),
  "SERVICE CHANGE": require('../images/markers/red.png'),
  "PLANNED WORK": require('../images/markers/yellow.png'),
  "DELAYS": require('../images/markers/yellow.png')
}
import { EvilIcons } from '@expo/vector-icons';

import Cards from './Cards';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compressed: false,
      N : [],
      S : [],
      modalVisible: false
    };
    this.jumpValue = new Animated.Value(0);
    this.jumpAnim = this.jumpAnim.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    this.jumpAnim();
  }

  jumpAnim() {
    this.jumpValue.setValue(0);
    Animated.timing(
      this.jumpValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(this.jumpAnim);
  }

  showModal() {
    this.setState({ modalVisible: true });
  }

  hideModal() {
    this.setState({ modalVisible: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.cards}>
            {this.state.compressed ? (
              <Cards />
            ) : null }
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={this.showModal}
          style={styles.add}>
          <Animated.View
            style={{ 
              transform: [{
                translateY: this.jumpValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [5, -2, 5]
                })
              }]
            }}>
            <EvilIcons
              name='chevron-up'
              size={32} />
          </Animated.View>
          <Text>Add Complaint</Text>
        </TouchableOpacity>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.hideModal}>
          <Cards 
            hideModal={this.hideModal}
            route={this.props.navigation.state.params.route} />
        </Modal>
      </View>
    )
  }
}


// }}
// title="Details"
// color='#841584'
// />
// </View>
// </View>
// <View style={styles.cards}>
// {this.state.compressed ? (
// <Cards routeName={this.props.navigation.state.params.routeName}/>
// ) : null }
// </View>
// </ScrollView>

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
    alignItems: 'center',
    position: 'absolute',
    bottom: 20
  }
})
