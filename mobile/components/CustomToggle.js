// This could probably be its own NPM module one day

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated, Easing } from 'react-native';

export default class CustomToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      uptown: null
    };

    this.leftValue = new Animated.Value(0);
    this.rightValue = new Animated.Value(0);
    this.onSelect = this.onSelect.bind(this);
    this.anim = this.anim.bind(this);
  }

  onSelect(uptown) {
    this.props.onDirectionSelect(uptown ? 'N' : 'S');
    if (uptown !== this.state.uptown) {
      this.setState({ uptown, selected: true }, this.anim);
    }
  }

  anim() {
    let leftFinal = this.state.uptown ? 1 : 0;
    let rightFinal = this.state.uptown ? 0 : 1;

    Animated.parallel([
      Animated.timing(
        this.leftValue,
        {
          toValue: leftFinal,
          duration: 100,
          easing: Easing.linear
        }
      ),
      Animated.timing(
        this.rightValue,
        {
          toValue: rightFinal,
          duration: 100,
          easing: Easing.linear
        }
      )
    ]).start();
  }

  // True = left, False = right

  render() {
    return(
      <View style={[styles.container, this.props.style, {borderWidth: 1, borderColor: 'lightgrey'}]}>
        <TouchableWithoutFeedback
          style={styles.touchable}
          onPress={() => this.onSelect(true)}>
          <Animated.View
            style={[styles.buttonLeft, {
              backgroundColor: this.leftValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['rgba(255, 255, 255, 1)', 'rgba(0, 102, 102, 1)']
              })
            }]}>
            <Animated.Text 
              style={[styles.text, { 
                color: this.leftValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['rgba(0, 102, 102, 1)', 'rgba(255, 255, 255, 1)']
                })
              }]}>
              Uptown
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={styles.touchable}
          onPress={() => this.onSelect(false)}>
          <Animated.View
            style={[styles.buttonRight, {
              backgroundColor: this.rightValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['rgba(255, 255, 255, 1)', 'rgba(0, 102, 102, 1)']
              })
            }]}>
            <Animated.Text 
              style={[styles.text, { 
                color: this.rightValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['rgba(0, 102, 102, 1)', 'rgba(255, 255, 255, 1)']
                })
              }]}>
              Downtown
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 20
  },
  touchable: {
    flex: 1
  },
  buttonLeft: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  buttonRight: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'flex-end'
  },
  text: {
    fontSize: 20
  }
});