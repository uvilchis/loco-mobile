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
          <View style={styles.icon}>
            <Image source={this.props.line} />
          </View>
          <View style={styles.buttons}>
            <Image style={{width: 50, height: 50}} source={require("../images/green.png")} />
            <Button
              onPress={this.getDetails}
              title="Details"
              color="#841584"
            />
          </View>
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
    justifyContent: 'space-between'
  },
  icon: {
    flex: 2
  },
  buttons: {
    flex: 1.5,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
