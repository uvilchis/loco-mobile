import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapCallout = (props) => {
  console.log(props);
  return (
    <View>
      <Text>{props.stop.stop_name}</Text>
    </View>
  );
};


const styles = StyleSheet.create({

});

export default MapCallout;