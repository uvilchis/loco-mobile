import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text, Alert } from 'react-native';
import axios from 'axios';

import Login from './login/Login';
import Routes from './routes/Routes';
import Header from './shared/Header';
import MapNav from './navigators/MapNav';

import URL from './env/urls';

/*
  Main entry point into the app
*/

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };

    this.onSignUp = this.onSignUp.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onGoogle = this.onGoogle.bind(this);
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
      onLogout: this.onLogout,
      loggedIn: this.props.screenProps.isLoggedIn
    });
  }

  componentDidUpdate() {
    this.props.navigation.setParams({
      loggedIn: this.props.screenProps.isLoggedIn
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.screenProps.isLoggedIn !== this.props.screenProps.isLoggedIn) || 
           (nextState.modalVisible !== this.state.modalVisible);
  }

  onMapPress = () => this.props.navigation.navigate('MapNav')

  onDetailsPress = (route) => this.props.navigation.navigate('Detail', { route });

  showModal = () => this.setState({ modalVisible: true });

  hideModal = () => this.setState({ modalVisible: false });

  onLogin(userObj) {
    axios.post(`${URL}/api/user/login`, userObj)
    .then(({ data }) => this.setState({ modalVisible: false }, this.props.screenProps.onLogin))
    .catch((error) => Alert.alert(
      '',
      'Incorrect Username or Password',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')}
      ],
      { cancelable: false }
    ));
  }

  onSignUp(userObj) {
    axios.post(`${URL}/api/user/signup`, userObj)
    .then(({ data }) => this.setState({ modalVisible: false }, this.props.screenProps.onLogin))
    .catch((error) => console.log(error));
  }

  onLogout() {
    axios.get(`${URL}/api/user/logout`)
    .then(({ data }) => this.props.screenProps.onLogout())
    .catch((error) => console.log(error));
  }

  onGoogle(data) {
    this.setState({ modalVisible: false }, this.props.screenProps.onLogin);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Routes onDetailsPress={this.onDetailsPress} />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.hideModal}>
          <Login
            onLogin={this.onLogin}
            onSignUp={this.onSignUp}
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