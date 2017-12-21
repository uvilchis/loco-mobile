import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, Animated, Easing, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { EvilIcons } from '@expo/vector-icons';

import URL from '../env/urls';
import Helpers from '../lib/util';

export default class MapRoutePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      selected: '',
      routes: []
    };

    this.handleRoutePick = this.handleRoutePick.bind(this);

    this._spinValue = new Animated.Value(1);
    this._heightValue = new Animated.Value(1);

    this._toggleExpand = this._toggleExpand.bind(this);
    this._expand = this._expand.bind(this);
  }

  componentDidMount() {
    axios.get(`${URL}/api/routes`, {
      params: {
        sub: 'mta'
      }
    })
    .then(({ data }) => {
      let routes = data.reduce((acc, el) => {
        el.key = el.id;
        if (el.route_id.length === 1) { acc.push(el); }
        return acc;
      }, []);
      this.setState({ routes });
    })
    .catch((error) => console.log(error));
  }

  handleRoutePick(selected) {
    let routes = this.state.routes.map((el) => {
      el.selected = selected === this.state.selected ? false : el.route_id === selected;
      return el;
    });
    if (selected === this.state.selected) { selected = ''; }
    this.setState({ selected, routes }, () => this.props.onRoutePick(selected));
  }

  _toggleExpand() {
    this.setState({ expanded: !this.state.expanded }, this._expand)
  }

  _expand() {
    let final = this.state.expanded ? 0 : 1;
    Animated.parallel([
      Animated.timing(
        this._spinValue,
        {
          toValue: final,
        }
      ),
      Animated.timing(
        this._heightValue,
        {
          toValue: final
        }
      )
    ]).start();
  }

  render() {
    return (
      <Animated.View
        style={[styles.container, {
          height: this._heightValue.interpolate({
            inputRange: [0, 1],
            outputRange: [44, 112]
          })
        }]}>
        <TouchableOpacity
          style={styles.header}
          onPress={this._toggleExpand}>
          <Animated.View
            style={{
              backgroundColor: 'transparent',
              transform: [{
                rotate: this._spinValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['-180deg', '-0deg']
                })
              }]
            }}>
            <EvilIcons
              name="chevron-down"
              color="white"
              size={48} />
          </Animated.View>
        </TouchableOpacity>
        <FlatList
          style={styles.list}
          data={this.state.routes}
          renderItem={({ item }) =>
            <Text
              onPress={() => this.handleRoutePick(item.route_id)}
              style={[styles.text, Helpers.LineStyleHelper(item.route_id), { opacity: item.selected ? 1 : 0.2 }]}>
                {item.route_id}
            </Text>}
          horizontal={true} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  header: {
    backgroundColor: 'grey',
    alignItems: 'center',
    padding: 4
  },
  containerContent: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  inner: {
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  text: {
    fontSize: 30,
    marginHorizontal: 8
  },
  list: {
    marginHorizontal: 4,
    marginTop: 4
  }
});