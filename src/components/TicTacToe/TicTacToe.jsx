import React, {useState, useEffect} from 'react'
import './TicTacToe.css'
import Cell from '../Cell'
const TicTacToe = () => {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [go, setGo] = useState("circle");
  const [winMsg, setwinMsg] = useState(null);


  const [message, setMessage] = useState("It's " + go + " turn.");
const [scores, setScores] = useState({ circle: 0, cross: 0 });
const [history, setHistory] = useState([]);
  


  useEffect(() => {
    checkScore();
  }, [cells]);

  useEffect(() => {
    if(winMsg) {
      
    }
  }, [winMsg])

  const handleRestartGame = () => {
    setCells(["", "", "", "", "", "", "", "", ""]);
    setGo("circle");
    setMessage("It's " + go + " turn.");
    setwinMsg(null);

    
  };

  const checkScore = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let winnerFound = false;

    winningCombos.forEach((array) => {
      let circleWins = array.every(
        (cell) => cells[cell] === "circle"
      );
      if (circleWins) {
        setwinMsg("Circle Wins!");
        setScores((scores) => ({ ...scores, circle: scores.circle + 1 }));
        setHistory((history) => [...history, "Circle Win"]);
        winnerFound = true;
        return;
      }
    });

    winningCombos.forEach((array) => {
      let crosswWins = array.every((cell) => cells[cell] === "cross");
      if (crosswWins) {
        setwinMsg("Cross Wins!");
        setScores((scores) => ({ ...scores, cross: scores.cross + 1 }));
        setHistory((history) => [...history, "Cross Win"]);
        winnerFound = true;
        return;
      }
    });

    if (!winnerFound && cells.every((cell) => cell !== "")) {
      setwinMsg("It's a Draw!");
      setHistory((history) => [...history, "Draw"]);
    }
  };
  return (
    <div className="container">
      <div className='game'>
      <h1 className='title'>
        Tic Tac Toe
      </h1>
      <div className="gameboard">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            id={index}
            cell={cell}
            go={go}
            setGo={setGo}
            cells={cells}
            setCells={setCells}
            winMsg={winMsg}
            setMessage={setMessage}
          />
        ))}
      </div>
      <p className="message">
        {winMsg || message}
      </p>
      {winMsg != null ? (
        <button className="restart" onClick={handleRestartGame} >
          Restart
        </button>
        ) 
      :
       " "
      }
      </div>
     <div className='scoreboard'>
      <h2 className='title'>
        History
      </h2>
      <div className="history">
    {history.map((result, index) => (
      <p key={index} className={index === history.length - 1 ? "latest-game" : ""}>{result}</p>
    ))}
    <hr />
    <div className="score">
    <p className='circle-player'>Circle: {scores.circle}</p>
    <h4>VS</h4>
    <p className='cross-player'>Cross: {scores.cross}</p>
    </div>
   
  </div>
     </div>
    </div>
  );
}

export default TicTacToe
