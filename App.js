import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Row, Col, Grid } from 'react-native-easy-grid';
const mainScreen = require('./mainScreen.js');
import TVEventHandler from 'TVEventHandler';
// import RNRestart from 'react-native-restart';

export default class App extends Component<{}> {

_tvEventHandler: any;

constructor(){
  super();
  this.server = new WebSocket('ws://192.168.1.9:5000');
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



  _enableTVEventHandler() {
    this._tvEventHandler = new TVEventHandler();
    this._tvEventHandler.enable(this, function(cmp, evt) {
       if(evt && evt.eventType === 'playPause') {
        cmp.restartGame();
      }
    });
  }

  _disableTVEventHandler() {
    if (this._tvEventHandler) {
      this._tvEventHandler.disable();
      delete this._tvEventHandler;
    }
  }

restartGame(){
  // RNRestart.Restart();
return(null);
}

  componentWillUnmount() {
      this._disableTVEventHandler();
    }

componentDidMount(){
  this._enableTVEventHandler();
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
          turn: msg.turn,
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
          questionLevel: 3,
          stage:"showTrivia",
        });
        break;
      case "easyQuestion":
        var wager = Math.floor(this.state.diceRoll/3);
        this.setState({
          questionLevel: 1,
          stage:"showTrivia",
          diceRoll: wager
        });
        break;
      case "mediumQuestion":
        var wager = Math.floor(this.state.diceRoll*2/3+0.28);
        this.setState({
          questionLevel: 2,
          stage:"showTrivia",
          diceRoll: wager
        });
        break;
      case "A":
      if (this.state.answer === "A"){
        this.correctAnswer();
        this.setState({stage:"correct", answer:null});
      } else {
        this.nextPlayerTurn();
        this.setState({stage:"wrong"});
        }
      break;
      case "B":
      if (this.state.answer === "B"){
        this.correctAnswer();
        this.setState({stage:"correct", answer:null});
      } else {this.nextPlayerTurn();
        this.setState({stage:"wrong"});}
      break;
      case "C":
      if (this.state.answer === "C"){
        this.correctAnswer();
        this.setState({stage:"correct", answer:null});
      } else {this.nextPlayerTurn();this.setState({stage:"wrong"});}
      break;
      case "D":
      if (this.state.answer === "D"){
        this.correctAnswer();
        this.setState({stage:"correct", answer:null});
      } else {this.nextPlayerTurn();this.setState({stage:"wrong"});}
      break;
      default:
        return(null);
    }


  readyForDifficultySelection = () =>{
    this.server.send('{"type":"readyForDifficultySelection"}');
  }
  readyForAnAnswer = () =>{
    this.server.send('{"type":"readyForAnswerSelection"}');
  }
}
// if (this.state.diceRoll <= 0){
//   window.setInterval(()=>{this.setState(
//           {dice:this.generateDiceRoll()}
//         )}, 100);
//     }
}

correctAnswer(){
  var tempPlayersArray = this.state.players;
  var specificPlayerArray = tempPlayersArray[this.state.turn];
  var newPosition = specificPlayerArray.playerboardposition + this.state.diceRoll;
  specificPlayerArray.playerboardposition = newPosition;
  tempPlayersArray.splice(this.state.turn, 1, specificPlayerArray);
  this.setState({players:tempPlayersArray});
  setTimeout(() => {
    this.setState({stage:"initial"});
  }, 3000);
  setTimeout(() => {
    this.server.send(JSON.stringify({"type":"correctAnswer", "turn":this.state.turn}));
  }, 8000);
}

nextPlayerTurn() {
    this.server.send('{"type":"wrongAnswer"}');
    var newTurn = this.state.turn + 1;
    if (newTurn === this.state.players.length){ newTurn = 0;}
    this.setState({turn:newTurn});
    setTimeout(() => {
    this.setState({stage:"nextPlayer"});
  }, 3000);
    setTimeout(() => {
    this.setState({stage:"showTrivia"});
  }, 8000);
}


generateDiceRoll = () =>{
  return(Math.floor(Math.random() * (12) ) + 1);
}

setAnswer = (rightAnswer) =>{
  switch(rightAnswer){
    case 0:
    if (this.state.answer != 'A'){
      this.setState({answer:"A"});
    }
    break;
    case 1:
      if (this.state.answer != 'B'){
    this.setState({answer:"B"});
    }
    break;
    case 2:
      if (this.state.answer != 'C'){
    this.setState({answer:"C"});
    }
    break;
    case 3:
      if (this.state.answer != 'D'){
    this.setState({answer:"D"});
    }
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
    return(mainScreen.difficultySelection(this.state.diceRoll, this.state.questionObj, () => {readyForDifficultySelection()}));
    break;
    case "showTrivia":
    return(mainScreen.showTrivia(this.state.questionObj, this.state.questionLevel, (answer) =>{this.setAnswer(answer)}));
    case "correct":
    return(mainScreen.correct())
    case "wrong":
    return(mainScreen.wrong())
    case "nextPlayer":
    return(mainScreen.playerName(this.state.players[this.state.turn].playername))
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
