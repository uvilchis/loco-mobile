import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Button, RefreshControl, Modal } from 'react-native';
import { SafeAreaView } from 'react-navigation'
import axios from 'axios';
import URL from '../env/urls';
import AddFavorite from './AddFavorite';
import Favorite from './Favorite';


export default class Favorites extends Component {
  constructor (props) {
    super(props);
    this.state  = {
      addFavoriteVisible : false,
      favorites : []
    }
    this.hideAddFavoriteScreen = this.hideAddFavoriteScreen.bind(this);
    this.handleAddFavorite = this.handleAddFavorite.bind(this);
    this.onDetailsPress = this.onDetailsPress.bind(this);
  }

  componentDidMount() {
    axios.get(`${URL}/api/favorites/allfavorites?sub=mta`)
    .then(({ data }) => this.setState({ favorites : data }, ()=> console.log(this.state.favorites)))
    .catch(err => console.log(err))
  }

  hideAddFavoriteScreen() {
    this.setState({ addFavoriteVisible : false })
  }

  handleAddFavorite(favorites) {
    this.setState({ favorites : favorites })
  }

  onDetailsPress(route) {
    this.props.navigation.navigate('Details', { route })
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
            title="Go Back"
            onPress={this.props.hideFavorites}
          />
          <Button
            title="Add Favorite"
            onPress={() => this.setState({ addFavoriteVisible : true })}
          />
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.addFavoriteVisible}>
            <AddFavorite
              hideModal={this.hideAddFavoriteScreen}
              handleAddFavorite={this.handleAddFavorite}/>
          </Modal>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
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
