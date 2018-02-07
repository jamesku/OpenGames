import { Row, Col, Grid } from 'react-native-easy-grid';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

var exports = module.exports = {};


exports.difficultySelection = (diceRoll, questionObj) => {
  return(
    <Col>
      <Row style = {{backgroundColor:'black'}}></Row>
      <Row style = {styles.container}>
        <Text style = {styles.textStyle}>{questionObj.category}</Text>
      </Row>
      <Row style = {{backgroundColor:'black'}}></Row>
      <Row style = {styles.container}>
        <Text style = {styles.textStyle}>{questionObj.name}</Text>
      </Row>
      <Row style = {styles.container}>
        <Text style = {styles.textStyle}>Pick Difficulty Level</Text>
      </Row>
      <Row style = {{backgroundColor:'white'}} size={2}>
        <Col style = {styles.container}>
          <Text style = {styles.textStyle}>Easy (A) {Math.floor(diceRoll/3)}</Text>
        </Col>
        <Col style = {styles.container}>
          <Text style = {styles.textStyle}>Medium (B) {Math.floor(diceRoll/2)}</Text>
        </Col>
        <Col style = {styles.container}>
          <Text style = {styles.textStyle}>Hard (C) {Math.floor(diceRoll)}</Text>
        </Col>
      </Row>
      <Row style = {{backgroundColor:'black'}}></Row>
    </Col>
  );
};

exports.showTrivia = (questionObj, selection, setAnswer) => {
  var question;
  switch(selection){
    case 1:
    question = questionObj.easyquestion
    break;
    case 2:
    question = questionObj.mediumquestion
    break;
    case 3:
    question = questionObj.hardquestion
    break;
    default:
    return(null);
  }
  var correctAnswer = question.correct_answer;
  var answerArray = question.incorrect_answers.push(correctAnswer);

  function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
  }
  answerArray=shuffleArray(answerArray);
  setAnswer(answerArray.indexOf(correctAnswer));

return(
  <Col>
    <Row style = {{backgroundColor:'black'}}></Row>
    <Row style = {styles.container}}>
      <Text style = {styles.textStyle}>{questionObj.category}</Text>
    </Row>
    <Row style = {{backgroundColor:'black'}}></Row>
    <Row style = {{backgroundColor:'white'}}>
      <Text style = {styles.textStyle}>{questionObj.question}</Text>
    </Row>
    <Row style = {{backgroundColor:'black'}}></Row>
    <Row style = {{backgroundColor:'white'}}>
      <Text style = {styles.textStyle}>{answerArray[0]}</Text>
    </Row>
    <Row style = {{backgroundColor:'white'}}>
      <Text style = {styles.textStyle}>{answerArray[1]}</Text>
    </Row>
    <Row style = {{backgroundColor:'white'}}>
      <Text style = {styles.textStyle}>{answerArray[2]}</Text>
    </Row>
    <Row style = {{backgroundColor:'white'}}>
      <Text style = {styles.textStyle}>{answerArray[3]}</Text>
    </Row>
  </Col>

);
};

exports.correct = (playersArray) => {
return(null);
};

exports.wrong = (playersArray) => {
return(null);
};



exports.gameBoard = (playersArray) => {

  playersOnBoard = (givenPlayersArray, position) => {
    var playersArr = [];
    for (var i = 0; i < givenPlayersArray.length; i++) {
      if(givenPlayersArray[i].playerboardposition === position){
     playersArr.push(
         <Col style={{
            backgroundColor: givenPlayersArray[i].playercolor
          }}>
         </Col>
       )
      }
    }
    return(
      <Col>
        <Row>
          {playersArr}
        </Row>
      </Col>
    )

  }

  return(
    <Row style = {{backgroundColor:'black'}}>
    <Col>
    <Row style = {styles.blackContainer}></Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 1)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 2)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 3)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 4)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 5)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 6)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 7)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 8)}
      </Row>
      <Row style = {styles.blackContainer}></Row>
    </Col>
    <Col>
    <Row style = {styles.blackContainer} size = {8}></Row>
      <Row style = {styles.container} size = {.98}>
        {this.playersOnBoard(playersArray , 9)}
      </Row>
      <Row style = {styles.blackContainer} size = {.98}></Row>
    </Col>
    <Col>
      <Row style = {styles.blackContainer}></Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 10)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 11)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 12)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 13)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 14)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 15)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 16)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 17)}
      </Row>
      <Row style = {styles.blackContainer}></Row>
    </Col>
    <Col>
    <Row style = {styles.blackContainer} size = {.98}></Row>
      <Row style = {styles.container} size = {.98}>
        {this.playersOnBoard(playersArray , 18)}
      </Row>
      <Row style = {styles.blackContainer} size = {8}></Row>
    </Col>
    <Col>
    <Row style = {styles.blackContainer}></Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 19)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 20)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 21)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 22)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 23)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 24)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 25)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 26)}
      </Row>
      <Row style = {styles.blackContainer}></Row>
    </Col>
    <Col>
    <Row style = {styles.blackContainer} size = {8}></Row>
      <Row style = {styles.container} size = {.98}>
        {this.playersOnBoard(playersArray , 27)}
      </Row>
      <Row style = {styles.blackContainer} size = {.98}></Row>
    </Col>
    <Col>
    <Row style = {styles.blackContainer}></Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 28)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 29)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 30)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 31)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 32)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 33)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 34)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 35)}
      </Row>
      <Row style = {styles.blackContainer}></Row>
    </Col>
    <Col>
    <Row style = {styles.blackContainer} size = {.98}></Row>
      <Row style = {styles.container} size = {.98}>
        {this.playersOnBoard(playersArray , 36)}
      </Row>
      <Row style = {styles.blackContainer} size = {8}></Row>
    </Col>
    <Col>
    <Row style = {styles.blackContainer}></Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 37)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 38)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 39)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 40)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 41)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 42)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 43)}
      </Row>
      <Row style = {styles.container}>
        {this.playersOnBoard(playersArray , 44)}
        <Text>END</Text>
      </Row>
      <Row style = {styles.blackContainer}></Row>
    </Col>
    </Row>
  )
}




const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  blackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  textStyle: {
    fontSize:50,
    color: '#000000',
  }
});
