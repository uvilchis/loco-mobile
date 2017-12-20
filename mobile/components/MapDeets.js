import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, StyleSheet, ScrollView, Text, Animated, Easing, PanResponder, Dimensions } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import MapLine from './MapLine';
import Helpers from '../lib/util';

export default class MapDeets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unique: []
    };

    this.dropValue = new Animated.Value(0);

    this._drop = this._drop.bind(this);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 100) {
          this.props.hideModal();
        }
      }
    });
  }

  componentDidMount() {
    this._drop();
    let unique = this.props.lines.reduce((acc, el) => {
      acc[el.route_id] = el.route_id;
      return acc;
    }, {});
    this.setState({ unique: Object.keys(unique) })
  }

  _drop() {
    this.dropValue.setValue(0);
    Animated.timing(
      this.dropValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(this._drop);
  }

  render() {
    return (
      <View
        style={styles.container}
        {...this._panResponder.panHandlers}>
        <View style={styles.inner}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{this.props.stopName}</Text>
          </View>
          {this.state.unique.map((line, idx) => 
            <MapLine 
              key={idx}
              color={Helpers.LineStyleHelper(line)}
              line={line}
              onDetailsPress={this.props.onDetailsPress} />)}
          <Animated.View
            style={[styles.downButton, {
              transform: [{
                translateY: this.dropValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [5, 0, 5]
                })
              }]
            }]}>
            <EvilIcons
              name="chevron-down"
              color="black"
              size={32}
              onPress={this.props.hideModal} />
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  inner: {
    padding: 16,
    borderRadius: 6,
    width: Dimensions.get('window').width * 0.8,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  titleWrapper: {
    width: '100%',
    paddingBottom: 4,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 22,
    alignSelf: 'flex-start'
  },
  downButton: {
    marginTop: 8,
    backgroundColor: 'transparent',
  }
})