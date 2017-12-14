import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Modal, Button, TextInput } from 'react-native';
import axios from 'axios';

import Login from './components/Login';
import RootNav from './components/RootNav';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: '',
      password: '',
      modalVisible: false
    };
    this.onSignUp = this.onSignUp.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  onLogin(userObj) {
    axios.post(`http://10.16.1.193:3000/api/user/login`, userObj)
    .then(({ data }) => {
      console.log(data);
      this.setState({
        loggedIn: true
      });
    })
    .catch((error) => console.log(error));
  }

  onSignUp(userObj) {
    // console.log(userObj);
    axios.post(`http://10.16.1.193:3000/api/user/signup`, userObj)
    .then(({ data }) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  onLogout() {
    // console.log('logout');
    axios.get(`http://10.16.1.193:3000/api/user/logout`)
    .then(({ data }) => {
      console.log('logged out', data)
    })
    .catch((error) => {
      console.log(error);
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
                  loggedIn: !this.state.loggedIn,
                  modalVisible: false
                })
                this.onLogout()
              }}
              title="Logout"
              color='#841584'
            /> ) : (
            <Button
              onPress={() => {
                this.setState({
                  loggedIn: !this.state.loggedIn,
                  modalVisible: true
                })
              }}
              title="Login"
              color='#841584'
            />
          )}
          <Image source={require('./images/NYCmap.png')} />
        </View>
        <Modal 
          animationType = {"slide"} 
          transparent = {false}
          visible = {this.state.modalVisible}
          onRequestClose = {() => console.log("Modal has been closed.")}>
          <Login
            onLogin={this.onLogin} 
            onSignUp={this.onSignUp} 
            toggleModal={this.toggleModal} />
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
  },
  modal: {
    alignItems: 'center',
    backgroundColor: '#f7021a',
    padding: 100,
    height: '80%'
  }
});

// async function getUserInfo(accessToken) {
  //   let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
  //     headers: { Authorization: `Bearer ${accessToken}`},
  //   });

  //   return userInfoResponse;
  // }