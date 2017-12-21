import React, { Component } from 'react';
import { View, StyleSheet, Text, Animated, Dimensions, Easing, ScrollView, PanResponder } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';
import URL from '../env/urls';

import Schedule from './Schedule';
import CustomToggle from './CustomToggle';

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: '',
      schedule : [], // This should be optional
    };

    this.onDirectionSelect = this.onDirectionSelect.bind(this);
    this.onFetchSchedule = this.onFetchSchedule.bind(this);

    this._dropValue = new Animated.Value(0);
    this._drop = this._drop.bind(this);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 200) {
          this.props.hideModal();
        }
      }
    })
  }

  componentDidMount() {
    this._drop();
  }

  onDirectionSelect(direction) {
    if (direction !== this.state.direction) {
      this.setState({ direction }, this.onFetchSchedule);
    }
  }

  onFetchSchedule() {
    let stopId = this.props.stopId.slice(0, -1) + this.state.direction;

    let dayTranslator = { 0: 'SUN', 6: 'SAT' };
    let day = dayTranslator[new Date().getDay()] || 'WKD';
    let time = new Date().toLocaleTimeString('en-gb');

    axios.get(`${URL}/api/times/stoproute`, {
      params: {
        sub: 'mta',
        stop_id: stopId,
        route_id: this.props.routeId
      }
    })
    .then(({ data }) => {
      let schedule = data.filter((el) => el.route_type === day && el.arrival_time >= time).slice(0, 30)
      if (!schedule.length) { schedule = [{ arrival_time: 'No further trains today' }]; }
      this.setState({ schedule });
    })
    .catch((error) => console.log(error));
  }

  _drop() {
    this._dropValue.setValue(0);
    Animated.timing(
      this._dropValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(this.drop);
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        {...this._panResponder.panHandlers}>
        <Animated.View
          style={[styles.downButton, {
            transform: [{
              translateY: this._dropValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [5, 0, 5]
              })
            }]
          }]}>
          <EvilIcons
            name="chevron-down"
            size={50}
            color="black"
            onPress={this.props.hideModal} />
        </Animated.View>
        <View style={styles.inner}>
          <Text style={styles.directionSelect}>Select direction</Text>
          <CustomToggle onDirectionSelect={this.onDirectionSelect} />
          <Text style={styles.stationSelect}>Schedule</Text>
          <Schedule schedule={this.state.schedule} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  },
  inner: {
    marginTop: 60
  },
  picker: {
    borderColor: 'black'
  },
  cards: {
    paddingVertical: 10
  },
  downButton: {
    position: 'absolute',
    left: (Dimensions.get('window').width / 2) - 25
  },
  directionSelect: {
    fontSize: 24,
    marginTop: 20,
    margin: 12
  },
  stationSelect: {
    fontSize: 24,
    margin: 12,
    marginTop: 24
  }
})
