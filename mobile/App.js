import React, { Component } from 'react';
import axios from 'axios';
import { Platform, StyleSheet, View, StatusBar } from 'react-native';

import TabNav from './components/TabNav';
import URL from './env/urls';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentWillMount() {
    axios.get(`${URL}/api/user/start`, {
      params: {
        sub: 'mta'
      }
    })
    .then((data) => this.setState({ isLoggedIn: true }))
    .catch((error) => console.log(error));
  }

  onLogin() {
    this.setState({ isLoggedIn: true });
  }

  onLogout() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNav
          screenProps={{
            isLoggedIn: this.state.isLoggedIn,
            onLogin: this.onLogin,
            onLogout: this.onLogout
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
});