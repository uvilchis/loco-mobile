import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import Helpers from '../lib/util';

export default class RouteSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      search: '',
      all: [],
      filtered: []
    };

    this.spinValue = new Animated.Value(0);
    this.anim = this.anim.bind(this);

    this._onChange = this._onChange.bind(this);
    this._onSelect = this._onSelect.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._toggle = this._toggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.all.length && nextProps.routes.length) {
      this.setState({
        all: nextProps.routes,
        filtered: nextProps.routes
      });
    }
  }

  anim() {
    let init = this.state.dropdown ? 0 : 1;
    let final = this.state.dropdown ? 1 : 0;

    Animated.timing(
      this.spinValue,
      {
        toValue: final,
        duration: 100,
        easing: Easing.linear
      }
    ).start();
  }

  _onChange(search) {
    let newState = {};
    newState.search = search;
    newState.filtered = this.state.all.filter((a) => a.route_id.toLowerCase().includes(search.toLowerCase()));
    this.setState(newState);
  }

  _onSelect(idx) {
    this.props.onRouteSelect(this.state.filtered[idx].route_id)
    this.setState({
      search: this.state.filtered[idx].route_id,
      dropdown: false
    }, this.anim);
  }

  _onFocus() {
    this.setState({ dropdown: true }, this.anim);
  }

  _toggle() {
    this.setState({ dropdown: !this.state.dropdown }, this.anim);
  }

  render() {
    return (
    <View style={[this.props.style, styles.container, { marginBottom: this.state.dropdown ? 60 : 20 }]}>
      <TouchableWithoutFeedback
        onPress={this._toggle}>
        <View
          style={styles.inner}>
          <TextInput
            style={styles.input}
            name="search"
            placeholder="Search for a route"
            value={this.state.search}
            onFocus={this._onFocus}
            onChangeText={this._onChange}
            underlineColorAndroid="transparent"
            clearButtonMode="while-editing" />
            <Animated.View
              style={{
                alignSelf: 'center',
                marginRight: 4,
                transform: [{
                  rotate: this.spinValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-180deg']
                  })
                }]
              }}>
              <EvilIcons
                name="chevron-down"
                size={32}
                onPress={this._toggle} />
            </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      {this.state.dropdown ?
        <View style={[styles.dropdown]}>
          {this.state.filtered.map((route, idx) =>
            <TouchableOpacity
              key={idx}
              style={styles.item}
              onPress={this._onSelect.bind(null, idx)}>
              <Text style={[styles.station, Helpers.LineStyleHelper(route.route_id)]}>{route.route_id}</Text>
            </TouchableOpacity>)}
        </View> : null}
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    borderColor: 'lightgrey',
    borderWidth: 1
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    minHeight: 48,
    minWidth: 150,
    paddingHorizontal: 8,
    flex: 1
  },
  dropdown: {
    overflow: 'hidden'
  },
  item: {
    borderTopColor: 'lightgrey',
    borderTopWidth: 1
  },
  station: {
    fontSize: 20,
    paddingVertical: 12,
    paddingLeft: 8
  }
});
