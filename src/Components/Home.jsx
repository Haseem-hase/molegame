
import React, { useState, useEffect } from 'react';
import './Home.css'

// Constants
const GAME_DURATION = 30000; // 30 seconds
const MOLE_APPEAR_TIME = 1000; // 1 second
const GRID_SIZE = 3; // 3x3 grid
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;

function Home() {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION / 1000);
    const [moles, setMoles] = useState(Array(TOTAL_TILES).fill(false));
    const [gameActive, setGameActive] = useState(false);
  
    // Start the game
    const startGame = () => {
      setScore(0);
      setTimeLeft(GAME_DURATION / 1000);
      setGameActive(true);
    };
  
    // End the game
    const endGame = () => {
      setGameActive(false);
      setMoles(Array(TOTAL_TILES).fill(false));
    };
  
    // Whack a mole (increase score and hide mole)
    const whackMole = (index) => {
      if (moles[index] && gameActive) {
        setScore(prevScore => prevScore + 1);
        setMoles(prevMoles => {
          const newMoles = [...prevMoles];
          newMoles[index] = false; // Hide the mole after it's whacked
          return newMoles;
        });
      }
    };
  
    // Handle the game time and mole appearance
    useEffect(() => {
      let timer, moleTimer;
  
      if (gameActive) {
        // Timer for game duration
        timer = setInterval(() => {
          setTimeLeft(prevTime => {
            if (prevTime <= 1) {
              clearInterval(timer);
              endGame();
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
  
        // Timer for mole appearance
        moleTimer = setInterval(() => {
          setMoles(prevMoles => {
            const newMoles = [...prevMoles];
            const randomIndex = Math.floor(Math.random() * newMoles.length);
            newMoles[randomIndex] = true;
  
            // After MOLE_APPEAR_TIME milliseconds, hide the mole
            setTimeout(() => {
              setMoles(prevMoles => {
                const newMoles = [...prevMoles];
                newMoles[randomIndex] = false;
                return newMoles;
              });
            }, MOLE_APPEAR_TIME);
  
            return newMoles;
          });
        }, 1000);
      }
  
      return () => {
        clearInterval(timer);
        clearInterval(moleTimer);
      };
    }, [gameActive]);

  return (
    <div>
<div className="game-container">
      <h2>Whack-a-Mole Game</h2>
      <div className="game-info">
        <p>Score: {score}</p>
        <p>Time Left: {timeLeft}s</p>
      </div>

     <center>
     <div className="row p-5 w-50 mb-5 bg-dark" style={{border:'black 2px solid', borderRadius:'20px'}}>
      <div className="game-board">
        {moles.map((mole, index) => (
          <div
            key={index}
            className={`game-tile ${mole ? 'mole' : ''}`}
            onClick={() => whackMole(index)}
          >
            {mole && '🐭'}
          </div>
        ))}
      </div>
      </div>
     </center>

      <div className="game-controls">
        <button onClick={startGame} disabled={gameActive}>Start Game</button>
        {gameActive && <p>Game in Progress...</p>}
      </div>
    </div>
    </div>
  )
}

export default Home