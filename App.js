import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Row, Col, Grid } from 'react-native-easy-grid';
const mainScreen = require('./mainScreen.js');


export default class App extends Component<{}> {

constructor(){
  super();
  this.server = new WebSocket('ws://192.168.1.14:5000');
}

state = {
  players:[],
  categories:[],
  dice:0,
  turn:null,
  questionObj:null,
  stage:"initial",

}

componentDidMount(){
  this.server.onopen= () =>{
    this.server.send("gameboardconnected");
  }

  this.server.onmessage = (message) => {
    var msg = JSON.parse(message.data);
    var diceRoll = Math.floor(Math.random() * (12) ) + 1;
    switch(msg.type){
      case "readyPlayerTurn":
        var questionObj = {
          category:msg.category,
          hardquestion:msg.hardquestion,
          easyquestion:msg.easyquestion,
          mediumquestion:msg.mediumquestion,
        };
        this.setState({
          dice: diceRoll,
          stage: msg.type,
          turn:msg.turn,
          questionObj:questionObj
        });
        break;
      case "playerSetup":
        this.setState({
          players: [...this.state.players, msg]
        });
        break;
      case "categorySetup":
      this.setState({
        categories: [...this.state.categories, msg.categor]
      });


        default:
        return(null);
    }
  }
}


diceBox = () =>{
  if (this.state.dice > 0){
    return(<Text style = {styles.textStyle}>this.state.dice</Text>)
  } else {
    return(<Text style = {styles.textStyle}>
      {Math.floor(Math.random() * (12) ) + 1; }
      </Text>)
    }
  }

playersBox = () => {
  var playersArr = []
  for (var i = 0; i < this.state.players.length; i++) {
   playersArr.push(
       <Col style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: 45
          backgroundColor: this.state.players[i].playercolor
        }}>
           {this.state.players[i].playername}
       </Col>
     )
    }
  return(
      <Row>
        {this.playersArr}
        </Row>
      )
}

categoryBox = () => {
  var categoryArr = []
  for (var i = 0; i < this.state.categories.length; i++) {
   categoryArr.push(
       <Text style={styles.textStyle}>
       this.state.categories[i];
       </Text>
     )
    }
  return({this.categoryArr});
}

gameBox = () =>{
  switch(this.state.stage){
    case "initial":
    return({mainScreen.gameBoard()});
    break;
    case "difficultySelection":
    return({mainScreen.difficultySelection()});
    case "showTrivia":
    return({mainScreen.showTrivia()});
    case "correct":
    return({mainScreen.correct()});
    case "wrong":
    return({mainScreen.wrong()});
    default:
    return(null);
  }
}

  render() {
    return (
    <Grid>
      <Row size={25}>
        <Col size={25}>
            {this.diceBox()}
        </Col>
        <Col size={75}>
            {this.playersBox()}
        </Col>
      </Row>
      <Row size={75}>
        <Col size={25}>
            {this.categoryBox()}
        </Col>
        <Col size={75}>
            {this.gameBox()}
        </Col>
      </Row>
    </Grid>
  )
}





    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#606060',
  },
  textStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize:40,
    color: '#FFFFFF',
  },
});
