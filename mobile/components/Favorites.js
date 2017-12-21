import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Button, RefreshControl, Modal } from 'react-native';
import { SafeAreaView } from 'react-navigation'
import axios from 'axios';
import URL from '../env/urls';

import AddFavorite from './AddFavorite';
import Favorite from './Favorite';
import Header from './Header';
import MapNav from './MapNav';
import Login from './Login';


export default class Favorites extends Component {
  constructor (props) {
    super(props);
    this.state  = {
      addFavoriteVisible: false,
      favorites: [],
      modalVisible: false,
      refreshing: false
    };
    this._onRefresh = this._onRefresh.bind(this);
    this._fetchFavorites = this._fetchFavorites.bind(this);
    this.hideAddFavorite = this.hideAddFavorite.bind(this);
    this.showAddFavorite = this.showAddFavorite.bind(this);
    this.handleAddFavorite = this.handleAddFavorite.bind(this);
    this.onDetailsPress = this.onDetailsPress.bind(this);
    this.onMapPress = this.onMapPress.bind(this);
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
    this._fetchFavorites();

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
    this._fetchFavorites();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.screenProps.isLoggedIn !== this.props.screenProps.isLoggedIn) ||
           (nextState.modalVisible !== this.state.modalVisible) ||
           (nextState.addFavoriteVisible !== this.state.addFavoriteVisible) ||
           (nextState.favorites.length !== this.state.favorites.length);
  }

  _onRefresh() {
    this.setState({ refreshing: true }, () => this._fetchFavorites({ refreshing: false }));
  }

  _fetchFavorites(newState = {}) {
    axios.get(`${URL}/api/favorites/allfavorites?sub=mta`, {
      params: {
        sub: 'mta'
      }
    })
    .then(({ data }) => {
      newState.favorites = data;
      this.setState(newState);
    })
    .catch((error) => console.log(error));
  }

  handleAddFavorite(favorites) {
    this.setState({ favorites : favorites })
  }

  onMapPress() {
    this.props.navigation.navigate('MapNav');
  }

  onDetailsPress(route, stop) {
    this.props.navigation.navigate('Details', { route, stop })
  }

  showAddFavorite() {
    this.setState({ addFavoriteVisible: true })
  }

  hideAddFavorite() {
    this.setState({ addFavoriteVisible: false })
  }

  showModal() {
    this.setState({ modalVisible: true });
  }

  hideModal() {
    this.setState({ modalVisible: false });
  }

  onLogin(userObj) {
    axios.post(`${URL}/api/user/login`, userObj)
    .then(({ data }) => this.setState({ modalVisible: false }, this.props.screenProps.onLogin))
    .catch((error) => console.log(error));
  }

  onSignUp(userObj) {
    axios.post(`${URL}/api/user/signup`, userObj)
    .then(({ data }) => this.setState({ modalVisible: false }, this.props.screenProps.onLogin))
    .catch((error) => console.log(error));
  }

  onLogout() {
    axios.get(`${URL}/api/user/logout`)
    .then(({ data }) => this.setState({ favorites: [] }, this.props.screenProps.onLogout))
    .catch((error) => console.log(error));
  }

  onGoogle(data) {
    this.setState({ modalVisible: false }, this.props.screenProps.onLogin);
  }

  render () {
    return (
      <ScrollView 
        style={styles.main}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh} />}>
        <View>
          {this.state.favorites.map((element, idx)=>
            <Favorite
              key ={idx}
              routeId={element.route_id}
              stopId={element.stop_id}
              stopName={element.stop_name}
              onDetailsPress={this.onDetailsPress} />)}
          <Button
            title="Add Favorite"
            onPress={this.showAddFavorite}
          />
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.addFavoriteVisible}
            onRequestClose={this.hideModal}>
            <AddFavorite
              hideModal={this.hideAddFavorite}
              handleAddFavorite={this.handleAddFavorite} />
          </Modal>
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  main: {
    backgroundColor: 'white'
  },
  text: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 25
  }
});
