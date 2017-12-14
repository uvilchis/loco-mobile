import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Animated, Easing, Dimensions } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import axios from 'axios';

const bgSource = '../images/backgrounds/escalator-bg.jpg';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.panValue = new Animated.Value(0);
    this.fadeValue = new Animated.Value(0);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleGoogle = this.handleGoogle.bind(this);
  }

  componentDidMount() {
    this.pan();
  }

  pan() {
    this.panValue.setValue(0);
    this.fadeValue.setValue(0);

    Animated.parallel([
      Animated.timing(
        this.panValue,
        {
          toValue: 1,
          duration: 35000,
          easing: Easing.linear
        }
      ),
      Animated.timing(
        this.fadeValue,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear
        }
      )
    ]).start(() => this.pan());
  }

  handleLogin() {
    this.props.onLogin({
      username: this.state.username,
      password: this.state.password
    });
  }

  handleSignUp() {
    this.props.onSignUp({
      username: this.state.username,
      password: this.state.password
    });
  }

  handleGoogle() {
    console.log('handle google');
  }

  render() {
    return (
      <View style={styles.main}>
        <Animated.Image
          style={{
            opacity: this.fadeValue,
            position: 'absolute',
            maxHeight: Math.max(960, Dimensions.get('window').height),
            transform: [{
              translateX: this.panValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, (-1440 + Dimensions.get('window').width)]
              })
            }]
          }}
          source={require('../images/backgrounds/escalator-bg.jpg')} />
        <FontAwesome 
          name="chevron-down" 
          size={32}
          style={styles.downButton}
          onPress={this.props.toggleModal} />
        <TextInput 
          name="username"
          placeholder="Username"
          placeholderTextColor="white"
          autoCapitalize={'none'}
          style={styles.input}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          autoFocus={true} />
        <TextInput
          name="password"
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          autoCapitalize={'none'}
          style={styles.input}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password} />
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={this.handleLogin}>
          <Text style={styles.button}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={this.handleSignUp}>
          <Text style={styles.button}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={this.handleGoogle}>
          <Text style={styles.button}>Sign in with Google+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
    backgroundColor: 'black'
  },
  downButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 40,
    left: (Dimensions.get('window').width / 2) - 16,
    color: 'white'
  },
  buttonWrapper: {
    backgroundColor: 'transparent'
  },
  button: {
    height: 40,
    color: 'white',
    fontSize: 16,
    padding: 20,
    margin: 8
  },
  input: {
    height: 40,
    padding: 8,
    margin: 8,
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
})