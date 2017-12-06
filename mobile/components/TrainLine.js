import React, { Component } from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';

export default class TrainLine extends Component {
  constructor(props) {
    super(props);
  }
 
  getDetails(e) {
    console.log('pressed!')
  }

  render() { 
    return (
        <View style={styles.container}>
          <Image source={this.props.line} />
          <Image style={{width: 50, height: 50}} source={require("../images/green.png")} />
          <Button
            onPress={this.getDetails}
            title="Details"
            color="#841584"
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})