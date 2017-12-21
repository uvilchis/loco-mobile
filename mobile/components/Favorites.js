import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Button, RefreshControl, Modal } from 'react-native';
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
      loggedIn: false
    }
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
    axios.get(`${URL}/api/favorites/allfavorites?sub=mta`)
    .then(({ data }) => this.setState({ favorites : data }, ()=> console.log(this.state.favorites)))
    .catch(err => console.log(err))

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

    axios.get(`${URL}/api/favorites/allfavorites?sub=mta`)
    .then(({ data }) => this.setState({ favorites : data }, ()=> console.log(this.state.favorites)))
    .catch(err => console.log(err))

  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.loggedIn !== this.state.loggedIn) ||
           (nextState.modalVisible !== this.state.modalVisible) ||
           (nextState.addFavoriteVisible !== this.state.addFavoriteVisible);
  }

  showAddFavorite() {
    this.setState({ addFavoriteVisible: true })
  }

  hideAddFavorite() {
    this.setState({ addFavoriteVisible: false })
  }

  handleAddFavorite(favorites) {
    this.setState({ favorites : favorites })
  }

  onMapPress() {
    this.props.navigation.navigate('MapNav');
  }

  onDetailsPress(route) {
    this.props.navigation.navigate('Details', { route })
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

  render () {
    return (
      <ScrollView style={styles.main}>
        <SafeAreaView>
          <Text>FAVORITES</Text>
          {this.state.favorites.map((element, idx)=>
            <Favorite
              key ={idx}
              routeId={element.route_id}
              stopId={element.stop_id}
              stopName={element.stop_name}
              onDetailsPress={this.onDetailsPress} />)
          }
          <Button
            title="Add Favorite"
            onPress={()=> {
              console.log('clicked', this.state.addFavoriteVisible)
              this.showAddFavorite()
              console.log('post click', this.state.addFavoriteVisible)
            }}
          />
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.addFavoriteVisible}>
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
        </SafeAreaView>
      </ScrollView>
    )
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
