import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Modal, Button, TextInput } from 'react-native';
import axios from 'axios';
// import MapNav from './components/MapNav';

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

  signUp() {
    var tempObj = {}
    tempObj.username = this.state.username
    tempObj.password = this.state.password
    axios.post(`http://10.16.1.191:3000/api/user/signup`, tempObj)
    .then((response) => {
      console.log(response.data)
      this.setState({
        loggedIn: true
      })
    })
    .catch((err) => {
      console.error(err)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  logOut() {
    axios.get(`http://10.16.1.191:3000/api/user/logout`)
    .then((response) => {
      console.log('logged out')
      this.setState({
        loggedIn: false
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }
  render() {
    console.log('APP PROPS:', this.props)
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>          
          <Text style={styles.title}>loco</Text>
          <Button
            onPress={() => {
              console.log('pressed!')
            }}
            title="Location"
            color='#841584'
          />
          {this.state.loggedIn ? (
            <Button
              onPress={() => {
                this.setState({
                  loggedIn: true,
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
    backgroundColor: '#fff',
    padding: 100,
    height: '60%'
  }
});

// async function getUserInfo(accessToken) {
  //   let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
  //     headers: { Authorization: `Bearer ${accessToken}`},
  //   });

  //   return userInfoResponse;
  // }