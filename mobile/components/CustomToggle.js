import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated, Easing } from 'react-native';

export default class CustomToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      uptown: null
    };

    this.onSelect = this.onSelect.bind(this);

    this._leftValue = new Animated.Value(0);
    this._rightValue = new Animated.Value(0);
    this._anim = this._anim.bind(this);
  }

  onSelect(uptown) {
    this.props.onDirectionSelect(uptown ? 'N' : 'S');
    if (uptown !== this.state.uptown) {
      this.setState({ uptown, selected: true }, this._anim);
    }
  }

  _anim() {
    let leftFinal = this.state.uptown ? 1 : 0;
    let rightFinal = this.state.uptown ? 0 : 1;

    Animated.parallel([
      Animated.timing(
        this._leftValue,
        {
          toValue: leftFinal,
          duration: 150,
          easing: Easing.linear
        }
      ),
      Animated.timing(
        this._rightValue,
        {
          toValue: rightFinal,
          duration: 150,
          easing: Easing.linear
        }
      )
    ]).start();
  }

  // True = left, False = right

  render() {
    return(
      <View style={[styles.container, this.props.style]}>
        <TouchableWithoutFeedback
          style={styles.touchable}
          onPress={() => this.onSelect(true)}>
          <Animated.View
            style={[styles.buttonLeft, {
              backgroundColor: this._leftValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['rgba(255, 255, 255, 1)', 'rgba(0, 102, 102, 1)']
              })
            }]}>
            <Animated.Text 
              style={[styles.text, { 
                color: this._leftValue.interpolate({
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
              backgroundColor: this._rightValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['rgba(255, 255, 255, 1)', 'rgba(0, 102, 102, 1)']
              })
            }]}>
            <Animated.Text 
              style={[styles.text, { 
                color: this._rightValue.interpolate({
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
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'lightgrey'
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