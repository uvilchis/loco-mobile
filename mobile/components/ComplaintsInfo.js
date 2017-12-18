import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const ComplaintsInfo = (props) => (
  <View style={styles.container}>
    {props.currentComplaints.length ? props.currentComplaints.map((el, idx) => 
      <Text key={idx}>{`${el[1]} complaints at ${el[0]} station`}</Text>)
    : <Text>None!</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    padding: 16,
    paddingTop: 0
  }
});

export default ComplaintsInfo;