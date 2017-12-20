import React from 'react';
import { Platform, StyleSheet, View, StatusBar } from 'react-native';
import RootNav from './components/RootNav';
// TODO : Implement a favorites list
// import Favorites from './components/Favorites'
// import FavNav from './components/FavNav';
// TODO : implement tab navigation
// import TabNav from './components/TabNav';
// import URL from './env/urls';

const App = (props) => (
  <View style={styles.container}>
    <RootNav />
  </View>
);

/*
  <Modal
    animationType = {"slide"}
    transparent = {false}
    visible = {this.state.favoritesVisible}
    onRequestClose = {() => console.log("Modal has been closed.")}>
    <FavNav />
  </Modal>
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
});

export default App;
