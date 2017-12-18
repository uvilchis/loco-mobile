import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const ComplaintsInfo = (props) => (
  <View style={styles.container}>
    <Text style={styles.header}>Recent complaints</Text>
    {props.currentComplaints.length ? props.currentComplaints.map((el, idx) => 
      <Text key={idx}>{`${el.count} complaints at ${el.stop.stop_name} station`}</Text>)
    : <Text>None!</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    padding: 16
  },
  header: {
    fontSize: 24,
    marginVertical: 8
  }
})

export default ComplaintsInfo;