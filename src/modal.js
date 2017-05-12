import React from 'react';

const Modal = ({onClick, playerName, playerImage, isStart, playerScore, playerCount, isGiveUp, prevPlayerName}) => {
  if(isStart){
    return (
      <div className="modal">
        <img className="modal-image" src={require('./blue-player.png')} alt="player silhouette" />
        <h1 className="game-title">WikiPlayer Game</h1>
        <h5 className="game-desc">Use your football knowledge to guess the name of the mystery player using just their stats</h5>
        <button type="button" className="submit" onClick={onClick}>Start</button>
      </div>
    );
  } else if(isGiveUp){
    return (
      <div className="modal">
        <img className="modal-image" src={require('./x.png')} alt="red cross" />
        <h1 className="correct-player">{prevPlayerName}</h1>
        <h2 className="current-score">Current score: {playerScore} / {playerCount}</h2>
         <button type="button" className="submit" onClick={onClick}>Next</button>
      </div>
    );
  } else {
    return (
      <div className="modal">
        <img className="modal-image" src={require('./tick.png')} alt="green tick" />
        <h1 className="correct">Correct!</h1>
        <h2 className="current-score">Current score: {playerScore} / {playerCount}</h2>
         <button type="button" className="submit" onClick={onClick}>Next</button>
      </div>
    );
  }
}

export default Modal;
