import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class FirstPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          First Page
        </Text>
        <Text>
          First Page PART 2
        </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center'
  },
});