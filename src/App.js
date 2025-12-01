import { useState } from "react";

export default function App() {
  const initialBoard = Array(9).fill("");
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState("X");

  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [draws, setDraws] = useState(0);

  const handleClick = (index) => {
    if (board[index] !== "") return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    checkWinner(newBoard);
    setTurn(turn === "X" ? "O" : "X");
  };

  const checkWinner = (b) => {
    const patterns = [
      [0,1,2], [3,4,5], [6,7,8],  
      [0,3,6], [1,4,7], [2,5,8],  
      [0,4,8], [2,4,6],            
    ];

    for (let p of patterns) {
      const [a, b1, c] = p;
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        if (b[a] === "X") setScoreX(scoreX + 1);
        else setScoreO(scoreO + 1);
        restartRound();
        return;
      }
    }

    if (!b.includes("")) {
      setDraws(draws + 1);
      restartRound();
    }
  };

  const restartRound = () => {
    setBoard(initialBoard);
    setTurn("X");
  };

  const resetAll = () => {
    setScoreX(0);
    setScoreO(0);
    setDraws(0);
    restartRound();
  };

  return (
    <div className="game-container">
       
      <style>{`
        .game-container {
          width: 360px;
          margin: 40px auto;
          text-align: center;
          font-family: Arial, sans-serif;
        }

        h1 { margin-bottom: 10px; }

        .scores {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          font-size: 18px;
        }

        .board {
          display: grid;
          grid-template-columns: repeat(3, 100px);
          gap: 5px;
          justify-content: center;
          margin-bottom: 20px;
        }

        .cell {
          width: 100px;
          height: 100px;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          cursor: pointer;
          border-radius: 6px;
        }

        button {
          padding: 10px 16px;
          margin: 5px;
          cursor: pointer;
          border: none;
          background: #333;
          color: white;
          border-radius: 5px;
        }

        button:hover { opacity: 0.8; }
      `}</style>

      <h1>Tic-Tac-Toe</h1>

       
      <div className="scores">
        <span>X: {scoreX}</span>
        <span>Draws: {draws}</span>
        <span>O: {scoreO}</span>
      </div>

      
      <div className="board">
        {board.map((val, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {val}
          </div>
        ))}
      </div>

      
      <button onClick={restartRound}>Restart Round</button>
      <button onClick={resetAll}>Reset All</button>
    </div>
  );
}
