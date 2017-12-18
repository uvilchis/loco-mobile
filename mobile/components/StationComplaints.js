import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import ComplaintCard from './ComplaintCard';

const defaultComplaints = [
  { name: 'delayed', count: 0 },
  { name: 'closed', count: 0 },
  { name: 'accident', count: 0 },
  { name: 'crowded', count: 0 }
];

const StationComplaints = (props) => {
  let complaints = defaultComplaints.map((el) => {
    let temp = props.stationComplaints.find((a) => a.name === el.name);
    el.count = temp ? temp.count : 0;
    return el;
  });
  return (
    <View style={styles.container}>
      {props.stationComplaints.length ? 
        complaints.map((el, idx) => 
          <ComplaintCard key={idx} name={el.name} count={el.count} />) : 
        props.selected ? <Text>No recent complaints</Text> : <Text>Select station above</Text> }
    </View>
  );
};
 

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16
  }
});

export default StationComplaints;