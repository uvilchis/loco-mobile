import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to loco, your one stop resource for MTA delays</Text>
        <Image source={require("./images/123.png")} />
        <Image source={require("./images/456.png")} />
        <Image source={require("./images/7.png")} />
        <Image source={require("./images/ACE.png")} />
        <Image source={require("./images/BDFM.png")} />
        <Image source={require("./images/G.png")} />
        <Image source={require("./images/JZ.png")} />
        <Image source={require("./images/L.png")} />
        <Image source={require("./images/NQR.png")} />
        <Image source={require("./images/S.png")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
