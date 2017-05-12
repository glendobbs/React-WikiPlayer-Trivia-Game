import React, { Component } from 'react';
import './App.css';
import playerList from './player-list';
import Table from './playerdata';
import Modal from './modal';
import TextInput from './textinput';
import wtf_wikipedia from 'wtf_wikipedia';
import random from 'random-number-generator';
let playerName;
let prevPlayerName;
let playerArr;
let lastName;

const genEmpty = () => {
  return {
    clubYears: [],
    clubs: [],
    clubApps: [],
    clubGoals: [],
    totalGoals: [],
    totalApps: [],
    intYears: [],
    intTeams: [],
    intApps: [],
    intGoals: []
  }
  }


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isModal: true,
      isStart: true,
      isGiveUp: false,
      input: '',
      playerScore: 0,
      playerCount: 0,
      player: genEmpty()
    }
    this.genPlayer();
  }

  onChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  onSubmit = (value) => {
    let answer = value;
    answer = answer.replace(/\s*$/,"");
    if(answer.toLowerCase() === lastName.toLowerCase() || answer.toLowerCase() === playerName.toLowerCase()){
      this.setState({
        isModal: true,
        input: '',
        playerCount: this.state.playerCount + 1,
        playerScore: this.state.playerScore + 1,
        player: genEmpty()
      });
      this.genPlayer();
    } else {
      console.log("Wrong");
    }
  }

  onClick = () => {
    if(this.state.isStart){
      this.setState({
        isStart: false
      });
    }
    this.setState({
      isModal: false,
      isGiveUp: false,
      input: ''
    });
  }

  onGiveUp = () => {
    prevPlayerName = playerName;
    this.setState({
      isModal: true,
      isGiveUp: true,
      input: '',
      playerCount: this.state.playerCount + 1,
      player: genEmpty()
    });
    this.genPlayer();
  }


  genPlayer = () => {
    wtf_wikipedia.from_api(this.randomPlayer(playerList), "en", (markup) => {
      let data = wtf_wikipedia.parse(markup);
      this.setState({
        player: this.dataFormat(data.infobox),
      });
    });
  }

  randomPlayer = (playerList) => {
    playerName = playerList[random(playerList.length - 1)];
    playerArr = playerName.split(" ");
    lastName = playerArr[playerArr.length - 1];
    return playerName;
  }

  dataFormat = (obj) => {
    const temp = this.state.player;
    for (var prop in obj){
      if(prop.indexOf('clubs') === 0){
        temp.clubs.push(obj[prop]);
      } else if(prop.indexOf('caps') === 0){
        temp.clubApps.push(obj[prop]);
      } else if(prop.indexOf('goals') === 0){
        temp.clubGoals.push(obj[prop]);
      } else if(prop.indexOf('years') === 0){
        temp.clubYears.push(obj[prop]);
      } else if(prop.indexOf('totalcaps') === 0){
        temp.totalApps.push(obj[prop]);
      } else if(prop.indexOf('totalgoals') === 0){
        temp.totalGoals.push(obj[prop]);
      } else if(prop.indexOf('nationalyears') === 0){
        temp.intYears.push(obj[prop]);
      } else if(prop.indexOf('nationalteam') === 0){
        temp.intTeams.push(obj[prop]);
      } else if(prop.indexOf('nationalcaps') === 0){
        temp.intApps.push(obj[prop]);
      } else if(prop.indexOf('nationalgoals') === 0){
        temp.intGoals.push(obj[prop]);
      }
    }
    return temp;
  }



  render() {
    if(this.state.isModal){
      return (
        <Modal onClick={this.onClick} playerName={playerName} isStart={this.state.isStart} playerScore={this.state.playerScore} playerCount={this.state.playerCount} prevPlayerName={prevPlayerName} isGiveUp={this.state.isGiveUp}/>
      )
    } else if(this.state.player){
        return (
          <div className="App">
            <Table player={this.state.player}/>
            <TextInput input={this.state.input} onChange={this.onChange} onSubmit={this.onSubmit} onGiveUp={this.onGiveUp} />
          </div>
        );
      } else {
        return (
          <h2>Loading</h2>
        )
      }
      <div id="footer">Created by A G Dobbs</div>
  }
}




export default App;
