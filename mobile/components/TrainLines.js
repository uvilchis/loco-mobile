import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Button } from 'react-native';
import axios from 'axios';
import TrainLine from './TrainLine';

export default class TrainLines extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      lines: [
        require("../images/123.png"),
        require("../images/456.png"),
        require("../images/7.png"),
        require("../images/ACE.png"),
        require("../images/BDFM.png"),
        require("../images/G.png"),
        require("../images/JZ.png"),
        require("../images/L.png"),
        require("../images/NQR.png"),
        require("../images/S.png")
      ]
    };
    this.navToLines = this.navToLines.bind(this);
  }
  
  componentDidMount() {
    axios.get('http://ec2-18-221-253-159.us-east-2.compute.amazonaws.com:3001/loco/service?sub=mta')
    .then((response) => {
      console.log(response.data)
      this.setState({
        service: response.data 
      });
    })
    .catch((err) => {
      console.error(err);
    })
  }

  navToLines(idx) {
    this.props.navigation.navigate('Lines', { line: this.state.lines[idx] })
  }

  render() {
    // console.log('TRAINLINES PROPS', this.props)    
    return (
      <ScrollView>
        <Text style={styles.text}>Welcome to loco, your one stop resource for MTA delays</Text>
        {this.state.lines.map((line, idx) =>
          <TrainLine key={idx} line={line} idx={idx} navToLines={this.navToLines} />
        )}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
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

