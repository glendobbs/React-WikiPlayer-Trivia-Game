import React, { Component } from 'react';

class TextInput extends Component {
  render(){
  return (
    <form onSubmit={this.handleSubmit}>
      <input type="text" onChange={this.props.onChange}
        value={this.props.input} ref="playerGuess" placeholder="Type player name and press enter..." />
      <button type="button" className="give-up" onClick={this.props.onGiveUp}>Give up?</button>
    </form>
  );
}

handleSubmit = (event) => {
  event.preventDefault();
  this.props.onSubmit(this.refs.playerGuess.value);
}

}

export default TextInput;
