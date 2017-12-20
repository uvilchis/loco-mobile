import React, { Component } from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import axios from 'axios';

import Login from './Login';
import TrainLines from './TrainLines';
import Header from './Header';
import MapNav from './MapNav';
import URL from '../env/urls';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      loggedIn: false
    };

    this.onDetailsPress = this.onDetailsPress.bind(this);
    this.onMapPress = this.onMapPress.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onGoogle = this.onGoogle.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let title = 'Loco';
    let headerTitleStyle = {
      color: 'white',
      fontSize: 30
    };
    let headerStyle = {
      backgroundColor: 'grey'
    };
    let headerRight = (
      <Header
        showModal={params.showModal}
        loggedIn={params.loggedIn}
        onLogout={params.onLogout}
        onMapPress={params.onMapPress} />
    );

    return { title, headerTitleStyle, headerStyle, headerRight };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      showModal: this.showModal,
      onMapPress: this.onMapPress,
      onLogout: this.onLogout
    });
  }

  componentDidUpdate() {
    this.props.navigation.setParams({
      loggedIn: this.state.loggedIn
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.loggedIn !== this.state.loggedIn) || (nextState.modalVisible !== this.state.modalVisible);
  }

  onMapPress() {
    this.props.navigation.navigate('MapNav');
  }

  onDetailsPress(route) {
    this.props.navigation.navigate('Details', { route });
  }

  showModal() {
    this.setState({ modalVisible: true });
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
      <View style={styles.container}>
        <TrainLines onDetailsPress={this.onDetailsPress} />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.hideModal}>
          <Login
            onLogin={this.onLogin}
            onSignup={this.onSignup}
            onGoogle={this.onGoogle}
            hideModal={this.hideModal} />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});