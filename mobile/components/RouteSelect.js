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

    this.onSelect = this.onSelect.bind(this);

    this._spinValue = new Animated.Value(0);
    this._anim = this._anim.bind(this);

    this._onChange = this._onChange.bind(this);
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

  onSelect(idx) {
    this.props.onRouteSelect(this.state.filtered[idx].route_id)
    this.setState({
      search: this.state.filtered[idx].route_id,
      dropdown: false
    }, this._anim);
  }

  _onChange(search) {
    let newState = {};
    newState.search = search;
    newState.filtered = this.state.all.filter((a) => a.route_id.toLowerCase().includes(search.toLowerCase()));
    this.setState(newState);
  }

  _onFocus() {
    this.setState({ dropdown: true }, this._anim);
  }

  _toggle() {
    this.setState({ dropdown: !this.state.dropdown }, this._anim);
  }

  _anim() {
    let init = this.state.dropdown ? 0 : 1;
    let final = this.state.dropdown ? 1 : 0;

    Animated.timing(
      this._spinValue,
      {
        toValue: final,
        duration: 100,
        easing: Easing.linear
      }
    ).start();
  }

  render() {
    return (
    <View style={[this.props.style, styles.container, { marginBottom: this.state.dropdown ? 60 : 20 }]}>
      <TouchableWithoutFeedback
        onPress={this._toggle}>
        <View
          style={styles.inner}>
          <TextInput
            style={[styles.input, styles.station, Helpers.LineStyleHelper(this.state.search)]}
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
                  rotate: this._spinValue.interpolate({
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
              onPress={this.onSelect.bind(null, idx)}>
              <Text style={[styles.station, Helpers.LineStyleHelper(route.route_id)]}>{route.route_id}</Text>
            </TouchableOpacity>)}
        </View> : null}
    </View>
    );
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
