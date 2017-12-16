import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Modal, Button } from 'react-native';
import axios from 'axios';
import MapNav from './components/MapNav';
import Login from './components/Login';
import RootNav from './components/RootNav';
import URL from './env/urls';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: '',
      password: '',
      modalVisible: false,
      showMap: false
    };
    this.onSignUp = this.onSignUp.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onGoogle = this.onGoogle.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  hideModal() {
    this.setState({ modalVisible: false });
  }

  onLogin(userObj) {
    axios.post(`${URL}/api/user/login`, userObj)
    .then(({ data }) => {
      this.setState({
        loggedIn: true,
        modalVisible: false
      });
    })
    .catch((error) => console.log(error));
  }

  onSignUp(userObj) {
    axios.post(`${URL}/api/user/signup`, userObj)
    .then(({ data }) => {
      this.setState({
        loggedIn: true,
        modalVisible: false
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  onLogout() {
    axios.get(`${URL}/api/user/logout`)
    .then(({ data }) => {
      this.setState({
        loggedIn: false
      }, () => console.log('logged out'));
    })
    .catch((error) => console.log(error));
  }

  onGoogle(data) {
    this.setState({
      loggedIn: true,
      modalVisible: false
    }, () => console.log('google auth successful'));
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>          
          <Text style={styles.title}>loco</Text>          
          {this.state.loggedIn ? (
            <Button
              onPress={() => {
                this.setState({ modalVisible: false });
                this.onLogout()
              }}
              title="Logout"
              color='#841584' /> ) : (
            <Button
              onPress={() => this.setState({ modalVisible: true })}
              title="Login"
              color='#841584'
            />
          )}
          <Button
            onPress={() => this.setState({ showMap: !this.state.showMap })}
            title="Map"
            color='#841584'/>
        </View>
        <Modal 
          animationType={"slide"} 
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => console.log("Modal has been closed.")}>
          <Login
            onLogin={this.onLogin} 
            onSignUp={this.onSignUp}
            onGoogle={this.onGoogle} 
            hideModal={this.hideModal} />
        </Modal>
        {this.state.showMap ? ( <MapNav /> ) : ( <RootNav /> )}        
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
    fontSize: 30,
    paddingLeft: 16
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