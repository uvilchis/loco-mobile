import React, { Component } from 'react';
import { Text } from 'react-native-elements';

const Schedule = (props) => {
  this.props.schedule.map((el) =>
    <Text>{el.arrival_time}</Text>
  )
}

export default Schedule;
