import React, { Component } from 'react';
import Expo from 'expo';
import { StyleSheet, ScrollView, Text, View, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image, Animated, Easing, Dimensions, PanResponder } from 'react-native'
import { EvilIcons } from '@expo/vector-icons'
import axios from 'axios';

import KEYS from '../env/key';
import URL from '../env/urls';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this._panValue = new Animated.Value(0);
    this._fadeValue = new Animated.Value();
    this._dropValue = new Animated.Value(0);

    this._drop = this._drop.bind(this);
    this._pan = this._pan.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleGoogle = this.handleGoogle.bind(this);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 100) {
          this.props.hideModal();
        }
      }
    });
  }

  componentDidMount() {
    this._pan();
    this._drop();
  }

  _drop() {
    this._dropValue.setValue(0);
    Animated.timing(
      this._dropValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(this._drop);
  }

  _pan() {
    this._panValue.setValue(0);
    this._fadeValue.setValue(0);

    Animated.parallel([
      Animated.timing(
        this._panValue,
        {
          toValue: 1,
          duration: 35000,
          easing: Easing.linear
        }
      ),
      Animated.timing(
        this._fadeValue,
        {
          toValue: 1000,
          duration: 35000,
          easing: Easing.linear
        }
      )
    ]).start(this._pan);
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

  // Async/Await not playing nice
  handleGoogle() {
    Expo.Google.logInAsync({
      androidClientId: KEYS.GOOGLE_ID_ANDROID,
      iosClientId: KEYS.GOOGLE_ID_iOS,
      scopes: ['profile']
    })
    .then((result) => {
      if (result.type !== 'success') { throw 'failed to auth'; }
      return axios.get(`${URL}/api/user/mobile/google`, {
        params: {
          auth_id: result.user.id,
          display_name: `${result.user.givenName} ${result.user.familyName}`
        }
      });
    })
    .then(({ data }) => {
      this.props.onGoogle(data);
    })
    .catch((error) => {
      console.log(error);
      this.props.hideModal();
    });
  }

  render() {
    return (
      <ScrollView
        style={styles.main}
        scrollEnabled={false}
        {...this._panResponder.panHandlers}>
        <View style={{flex: 1}}>
          <Animated.Image
            style={{
              opacity: this._fadeValue.interpolate({
                inputRange: [0, 50, 950, 1000],
                outputRange: [0, 1, 1, 0]
              }),
              position: 'absolute',
              maxHeight: Dimensions.get('window').height,
              transform: [{
                translateX: this._panValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, (-1440 + Dimensions.get('window').width)]
                })
              }]
            }}
            source={require('../../images/backgrounds/escalator-bg.jpg')}/>
          <Animated.View
            style={[styles.downButton, {
              transform: [{
                translateY: this._dropValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [5, 0, 5]
                })
              }]
            }]}>
            <EvilIcons 
              name="chevron-down" 
              size={50}
              color="white"
              onPress={this.props.hideModal} />
          </Animated.View>
          <View style={styles.form}>
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
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'black'
  },
  downButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 40,
    left: (Dimensions.get('window').width / 2) - 25,
  },
  buttonWrapper: {
    backgroundColor: 'transparent'
  },
  button: {
    color: 'white',
    fontSize: 16,
    margin: 16
  },
  form: {
    height: Dimensions.get('window').height,
    marginTop: 160,
    marginHorizontal: 20
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