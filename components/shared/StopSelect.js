import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

export default class StopSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      search: this.props.stop ? this.props.stop.stop_name : '',
      all: [],
      filtered: this.props.stop ? [this.props.stop] : []
    };

    this.onSelect = this.onSelect.bind(this);

    this._spinValue = new Animated.Value(0);
    this._anim = this._anim.bind(this);

    this._onChange = this._onChange.bind(this);
    this._clear = this._clear.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._toggle = this._toggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.all.length && nextProps.stops.length) {
      this.setState({
        all: nextProps.stops,
        filtered: nextProps.stops
      });
    }
  }

  _anim() {
    let init = this.state.dropdown ? 0 : 1;
    let final = this.state.dropdown ? 1 : 0;

    Animated.timing(
      this._spinValue,
      {
        toValue: final,
        duration: 150,
        easing: Easing.linear
      }
    ).start();
  }

  _onChange(search) {
    let newState = {};
    newState.search = search;
    newState.filtered = this.state.all.filter((a) => a.stop_name.toLowerCase().includes(search.toLowerCase()));
    this.setState(newState, () => {
      this._anim();
      if (!search.length) {
        this.props.onStopSelect('');
      }
    });
  }

  onSelect(idx) {
    this.props.onStopSelect(this.state.filtered[idx].stop_id, this.state.filtered[idx].stop_name);
    this.setState({
      search: this.state.filtered[idx].stop_name,
      filtered:[this.state.filtered[idx]],
      dropdown: false
    }, this._anim);
  }

  _clear() {
    this.setState({ search: '' }, this._onChange(''));
  }

  _onFocus() {
    this.setState({ dropdown: true }, this._anim);
  }

  _toggle() {
    this.setState({ dropdown: !this.state.dropdown }, this._anim);
  }

  render() {
    return (
      <View
        style={[this.props.style, styles.container]}>
        <TouchableWithoutFeedback
          onPress={this._toggle}>
          <View style={styles.inner}>
            <TextInput
              style={styles.input}
              name="search"
              placeholder="Search for a stop"
              value={this.state.search}
              onFocus={this._onFocus}
              onChangeText={this._onChange}
              underlineColorAndroid="transparent" />
            {this.state.search ?
              <Animated.View
                style={styles.clear}>
                <EvilIcons
                  name="close"
                  size={20}
                  color="grey"
                  onPress={this._clear} />
              </Animated.View> : null}
            <Animated.View 
              style={[styles.rotate, {
                transform: [{
                  rotate: this._spinValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-180deg']
                  })
                }]
              }]}>
              <EvilIcons
                name="chevron-down"
                size={32}
                onPress={this._toggle} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        {this.state.dropdown ?
          <View style={[styles.dropdown]} onLayout={this._setHeight}>
            {this.state.filtered.map((stop, idx) =>
              <TouchableOpacity
                key={idx}
                style={styles.item}
                onPress={this.onSelect.bind(null, idx)}>
                <Text style={styles.stop}>{stop.stop_name}</Text>
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
    borderWidth: 1,
    overflow: 'hidden'
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  clear: {
    alignSelf: 'center'
  },
  rotate: {
    alignSelf: 'center',
    marginRight: 4
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
  stop: {
    fontSize: 14,
    paddingVertical: 16,
    paddingLeft: 8
  }
});
