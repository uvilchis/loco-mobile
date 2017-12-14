import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Modal, Button } from 'react-native';
import RootNav from './components/RootNav';
import axios from 'axios';
import Login from './components/Login';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      username: '',
      password: '',
      modalVisible: false
    }
    this.signUp = this.signUp.bind(this)
    this.logIn = this.logIn.bind(this)
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
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.title}>loco</Text>
          {this.state.loggedIn ? (
            <Button
              onPress={() => {
                this.setState({
                  loggedIn: !this.state.loggedIn
                })
              }}
              title="Logout"
              color='#841584'
            /> ) : (
            <Button
              onPress={() => {
                this.setState({
                  loggedIn: !this.state.loggedIn
                })
              }}
              title="Login"
              color='#841584'
            />
          )}
          <Image source={require('./images/NYCmap.png')} />
        </View>
        <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.modalVisible}
               onRequestClose = {() => { console.log("Modal has been closed.") } }>
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
        </Modal>    
        <RootNav />        
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#6d6868',
    paddingVertical: 30,
    justifyContent: 'space-between'
  },
  title: {  
    flex: 1,
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 30  
  }, 
  img: {
    flex: 1,
    alignItems: 'flex-end'
  }
});

// async function getUserInfo(accessToken) {
  //   let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
  //     headers: { Authorization: `Bearer ${accessToken}`},
  //   });
  
  //   return userInfoResponse;
  // }