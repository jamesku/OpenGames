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
  diceRoll:0,
  turn:null,
  questionObj:null,
  stage:"initial",
  questionLevel:null,
  answer:null
}

componentDidMount(){
  this.server.onopen= () =>{
    // var msgObj = {};
    // msgObj['type']="gameboardconnected";
    // msgObj
    this.server.send('{"type":"gameboardconnected"}');
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
          name:this.state.players[msg.turn].playername
        };
        this.setState({
          diceRoll: diceRoll,
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
          categories: [...this.state.categories, msg.category]
        });
        break;
      case "hardQuestion":
        this.setState({
          questionLevel: 3
        });
        break;
      case "easyQuestion":
        this.setState({
          questionLevel: 1
        });
        break;
      case "mediumQuestion":
        this.setState({
          questionLevel: 2
        });
        break;
      default:
        return(null);
    }
  }

  readyForDifficultySelection = () =>{
    this.server.send('{"type":"readyForDifficultySelection"}');
  }
  readyForDifficultySelection = () =>{
    this.server.send('{"type":"readyForAnswerSelection"}');
  }

window.setInterval(()=>{this.setState(
        {dice:this.generateDiceRoll()}
      )}, 100);
}

generateDiceRoll = () =>{
  return(Math.floor(Math.random() * (12) ) + 1);
}

setAnswer = (rightAnswer) =>{
  switch(rightAnswer){
    case 1:
    this.setState({answer:"A"});
    break;
    case 2:
    this.setState({answer:"B"});
    break;
    case 3:
    this.setState({answer:"C"});
    break;
    case 4:
    this.setState({answer:"D"});
    break;
    default:
    return(null);
  }
};

diceBox = () =>{
  if (this.state.diceRoll > 0){
    return(<Text style = {styles.textStyle}>{this.state.diceRoll}</Text>);
  } else {
    return(<Text style = {styles.textStyle}>
      {this.state.dice}
      </Text>)
    }
  }

playersBox = () => {
  var playersArr = [];
  for (var i = 0; i < this.state.players.length; i++) {
   playersArr.push(
       <Col style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: this.state.players[i].playercolor
        }}>
           <Text style = {{color: 'white',
           fontSize: 45,}}>{this.state.players[i].playername}</Text>
       </Col>
     )
    }
  return(
      <Row>
        {playersArr}
        </Row>
      );
}

categoryBox = () => {
  var categoryArr = [];
  for (var i = 0; i < this.state.categories.length; i++) {
   categoryArr.push(
       <Text style={styles.textStyle}>
       {this.state.categories[i]}
       </Text>
     )
    }
  return(categoryArr);
}

gameBox = () => {
  switch(this.state.stage){
    case "initial":
    return(mainScreen.gameBoard(this.state.players));
    break;
    case "readyPlayerTurn":
    return(mainScreen.difficultySelection(this.state.diceRoll, this.state.questionObj))
    this.readyForDifficultySelection();
    case "showTrivia":
    return(mainScreen.showTrivia(this.state.questionObj, this.state.questionLevel, this.setAnswer))
    this.readyForAnAnswer();
    case "correct":
    return(mainScreen.correct())
    case "wrong":
    return(mainScreen.wrong())
    default:
    return(null);
  }
}

  render() {
    return (
      <Grid>
        <Row size={25}>
          <Col size={1} style={styles.diceBox} >
              {this.diceBox()}
          </Col>
          <Col size={4} style={{backgroundColor:"black"}} >
              {this.playersBox()}
          </Col>
        </Row>
        <Row size={75}>
          <Col size={25} style={{backgroundColor:"black"}}>
              {this.categoryBox()}
          </Col>
          <Col size={75} style={{backgroundColor:"#606060"}}>
              {this.gameBox()}
          </Col>
        </Row>
      </Grid>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#606060',
  },
  diceBox:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#606060',
  },
  textStyle: {
    fontSize:50,
    color: '#FFFFFF',
  },
});
