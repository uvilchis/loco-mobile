import React, { Component } from 'react';
import { View, StyleSheet, Image, Button, Text, TextInput } from 'react-native';
import { AuthSession } from 'expo';
import Expo from 'expo';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      submit: false
    }
    // this.signInWithGoogleAsync = this.signInWithGoogleAsync.bind(this)
    this.signUp = this.signUp.bind(this)
  }

  logIn() {
    var tempObj = {}
    tempObj.username = this.state.username
    tempObj.password = this.state.password
    axios.post(`http://10.16.1.191:3000/api/user/login`, tempObj)
    .then((response) => {
      console.log(response.data)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  signUp() {
    var tempObj = {}
    tempObj.username = this.state.username
    tempObj.password = this.state.password
    axios.post(`http://10.16.1.191:3000/api/user/signup`, tempObj)
    .then((response) => {
      console.log(response.data)

    })
    .catch((err) => {
      console.error(err)
    })
  }

  render() {
    return (
      <View >
        <View>
          <TextInput
            name="username"
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
          />
          <TextInput
            name="password"
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
          <Button
            onPress={() => {
              this.signUp()
            }}
            title="Log In"
            color='#841584'
          />
          <Button
            onPress={() => {
              this.signUp()
            }}
            title="Sign Up"
            color='#841584'
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

// `153167299359-2cpffomr751msrk0gnenekd8kq8jipcc.apps.googleusercontent.com`
  // signInWithGoogleAsync = async () => {
  //   console.log('hey i fired')
  //   let redirect = `https://www.google.com`;
  //   let clientID = "153167299359-2cpffomr751msrk0gnenekd8kq8jipcc.apps.googleusercontent.com"
  //   await AuthSession.startAsync({
  //       authUrl:
  //       `https://accounts.google.com/o/oauth2/v2/auth` +
  //       `?scope=https://www.googleapis.com/auth/calendar` +
  //       `&response_type=token` +
  //       `&redirect_uri=https://www.google.com` +
  //       `&client_id=153167299359-2cpffomr751msrk0gnenekd8kq8jipcc.apps.googleusercontent.com`
  //   })
  //   .then(result => {
  //     console.log('got something back', result.type)
  //   })
  //   .catch(err => {
  //       console.error(err, ' first')
  //   })
  // }