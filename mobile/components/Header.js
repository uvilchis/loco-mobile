import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Header } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';

const Header = (props) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.button}
      onPress={props.onMapPress}>
      <Entypo
        name="location-pin"
        color="white"
        size={24} />
    </TouchableOpacity>

    <TouchableOpacity
      onPress={props.loggedIn ? props.onLogout : props.showModal}
      style={styles.button}>
      <Text style={styles.text}>{props.loggedIn ? 'Logout' : 'Login'}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    marginRight: 16
  },
  text: {
    color: 'white',
    fontSize: 16
  }
});

export default Header;
