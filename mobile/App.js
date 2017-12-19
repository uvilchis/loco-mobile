import React from 'react';
import { Platform, StyleSheet, View, StatusBar } from 'react-native';
import RootNav from './components/RootNav';

const App = (props) => (
  <View style={styles.container}>
    <RootNav />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
});

export default App;