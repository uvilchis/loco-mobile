import React, { Component } from 'react';
import { View, StyleSheet, Image, Button, Text, Alert, Animated, Easing, TouchableOpacity } from 'react-native';
import { Entypo, EvilIcons } from '@expo/vector-icons';
import Lines from './Lines';
import StatusMarker from './StatusMarker';

import Helpers from '../lib/util';

export default class TrainLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLines: false,
      _dropValue: new Animated.Value()
    };
    this._spinValue = new Animated.Value(0);
    this._opacityValue = new Animated.Value(0);
    this._showAlert = this._showAlert.bind(this);
    this._toggleLines = this._toggleLines.bind(this);
    this._setMax = this._setMax.bind(this);
    this._setMin = this._setMin.bind(this);
    this._drop = this._drop.bind(this);
  }

  _showAlert() {
    Alert.alert(
      'Official Status',
      this.props.line.text,
      [
        { text: 'Close', style: 'cancel' }
      ]
    );
  }

  _toggleLines() {
    this.setState({ showLines: !this.state.showLines }, this._drop);
  }

  _setMax(e) {
    this.setState({ max: e.nativeEvent.layout.height + 16 });
  }

  _setMin(e) {
    this.state._dropValue.setValue(e.nativeEvent.layout.height)
    this.setState({ min: e.nativeEvent.layout.height });
  }

  // True = rotate down, false = rotate up
  _drop() {
    let init = this.state.showLines ? this.state.min : this.state.max + this.state.min;
    let final = this.state.showLines ? this.state.min + this.state.max : this.state.min;

    this.state._dropValue.setValue(init);
    this._spinValue.setValue(this.state.showLines ? 0 : 1);

    Animated.parallel([
      Animated.timing(
        this._spinValue,
        {
          toValue: this.state.showLines ? 1 : 0,
          duration: 100,
          easing: Easing.linear
        }
      ),
      Animated.spring(
        this.state._dropValue,
        {
          toValue: final
        }
      ),
      Animated.timing(
        this._opacityValue,
        {
          toValue: this.state.showLines ? 100 : 0,
          duration: 200,
          easing: Easing.linear
        }
      )
    ]).start();
  }

  render() {
    const style = Helpers.LineStyle[this.props.line.name.toUpperCase()] || {};
    const spin = this._spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-180deg']
    });

    return (
      <Animated.View style={[styles.container, { height: this.state._dropValue }]}>
        <View style={styles.inner} onLayout={this._setMin}>
          <View style={styles.icon}>
              <Text style={[styles.symbols, { color: style.color }]}>{this.props.line.name.toUpperCase()}</Text>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={{ height: 32, width: 32 }}>
              {this.props.line.text ? 
                <EvilIcons 
                  name="exclamation"
                  color='darkblue'
                  size={38}
                  onPress={this._showAlert}/> : null}
            </TouchableOpacity>
            <StatusMarker status={this.props.line.status} />
            <Animated.View
              style={[styles.rotateArrow, { transform: [{ rotate: spin }] }]}>
              <EvilIcons
                name="chevron-down"
                color='darkgrey'
                size={32}
                onPress={this._toggleLines} /> 
            </Animated.View>
          </View> 
        </View>
        <Animated.View style={{ opacity: this._opacityValue }} onLayout={this._setMax}>
          <Lines
            countedRoutes={this.props.line.countedRoutes} 
            color={style.color}
            onDetailsPress={this.props.onDetailsPress} />
        </Animated.View>
      </Animated.View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  inner: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    flexDirection: 'row',
    flex: 2
  },
  buttons: {
    flex: 2,
    padding: 2,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  symbols: {
    fontWeight: 'bold',
    fontSize: 30,
    textShadowOffset: { width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: '#dddddd'
  },
  rotateArrow: {
    height: 28,
    width: 28,
    marginRight: 8,
    marginTop: 2
  }
});