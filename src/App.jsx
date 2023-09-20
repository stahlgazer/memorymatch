import { useState, useEffect } from 'react';
import './App.css';

const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'black', 'gray'];

function App() {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [message, setMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [inSequence, setInSequence] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      playSequence();
    }
  }, [isPlaying, level]);

  const generateSequence = (level) => {
    const newSequence = [];

    for (let i = 0; i < level; i++) {
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      newSequence.push(randomColor);
    }
    setSequence(newSequence);

  };


  const playSequence = async () => {
    setInSequence(true);
    for (const color of sequence) {
      await lightUpSquare(color);
      await sleep(500); // Adjust the delay as needed
      await resetSquare(color);
      await sleep(500);
    }
    setMessage('Your turn!');
    setInSequence(false);
  };

  const lightUpSquare = (color) => {
    return new Promise((resolve) => {
      setMessage(`Watch carefully: ${color}`);
      setTimeout(() => {
        document.getElementById(color).style.backgroundColor = 'white';
        setTimeout(() => {
          resolve();
        }, 500);
      }, 500);
    });
  };

  const resetSquare = (color) => {
    return new Promise((resolve) => {
      document.getElementById(color).style.backgroundColor = color;
      setTimeout(() => {
        resolve();
      }, 300);
    });
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSquareClick = (color) => {
    if (!isPlaying) return; // Ignore clicks when not playing

    setUserInput([...userInput, color]);

    if (color === sequence[userInput.length]) {
      if (userInput.length === sequence.length - 1) {
        // User completed the level
        setUserInput([]);
        setLevel(level + 1);
        setMessage('Good job! Next level.');
        setIsPlaying(false);

      }
    } else {
      // User made a mistake, end the game
      setIsPlaying(false);
      setMessage('Oops! You lost.');
      setTimeout(() => {
        setUserInput([]);
        setLevel(1);
      }, 1000);
    }
  };

  const startGame = () => {
    setUserInput([]);
    setMessage('Watch carefully...');
    generateSequence(level); // Generate the sequence here
    setIsPlaying(true);
  };

  const renderSquares = () => {
    return COLORS.map((color) => (
      <div
        key={color}
        id={color}
        className={`square ${inSequence ? 'disabled' : ''}`}
        style={{ backgroundColor: `${color}` }}
        onClick={() => handleSquareClick(color)}
      ></div>
    ));
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={startGame} disabled={isPlaying}>
        Start
      </button>
      <p>Level: {level}</p>
      <div className="board">{renderSquares()}</div>
      <p>{message}</p>
    </div>
  );
}

export default App;

