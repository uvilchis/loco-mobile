import React, { Component } from 'react';
import  { Text } from 'react-native';
import  {Card}  from 'react-native-elements';

const Schedule = (props) => {
  return (
    props.schedule.map((el, idx) =>
        <Text key={idx}>{el.arrival_time}</Text>
    )
  )
}

export default Schedule;
