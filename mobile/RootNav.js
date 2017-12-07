import React from 'react';
import { StackNavigator } from 'react-navigation';
import TrainLines from './components/TrainLines.js';
import Lines from './components/Lines.js';


// const HomeScreen = () => (
//   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//     <Text>Home Screen</Text>
//   </View>
// );


const RootNav = StackNavigator({
  Home: {
    screen: TrainLines
  },
  Lines: {
    screen: Lines,
    navigationOptions: {
      headerTitle: 'lines'
    }
  },
});


// const RootNavigator = StackNavigator({
//   Home: {
//     screen: HomeScreen,
//     navigationOptions: {
//       headerTitle: 'Home',
//     },
//   },
//   Details: {
//     screen: DetailsScreen,
//     navigationOptions: {
//       headerTitle: 'Details',
//     },
//   },
// });


export default RootNav