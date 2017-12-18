import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Button, RefreshControl, Modal } from 'react-native';
import { SafeAreaView } from 'react-navigation'
import axios from 'axios';
import AddFavorite from './AddFavorite'

export default class Favorites extends Component {
  constructor (props) {
    super(props);
    this.state  = {
      addFavoriteVisible : false
    }
    this.hideAddFavoriteScreen = this.hideAddFavoriteScreen.bind(this);
  }

  hideAddFavoriteScreen() {
    this.setState({ addFavoriteVisible : false })
  }

  render () {
    return (
      <ScrollView>
        <SafeAreaView>
          <Text>WE HAVE A NEW PAGE HOMIES</Text>
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
            />
          </Modal>
        </SafeAreaView>
      </ScrollView>
    )
  }
}
