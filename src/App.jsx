import { useState, useEffect } from 'react';
import './App.css';

const COLORS = ['cyan', 'blue', 'green', 'yellow', 'purple', 'orange', 'red', 'teal', 'magenta'];

function App() {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [message, setMessage] = useState('Press Start For New Game');
  const [isPlaying, setIsPlaying] = useState(false);
  const [inSequence, setInSequence] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      playSequence();
    }
  }, [isPlaying, level]);

  const startGame = () => {
    setUserInput([]);
    setMessage('Watch carefully...');
    generateSequence(level); // Generate the sequence here
    setIsPlaying(true);
  };

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

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
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



  const handleSquareClick = (color) => {
    if (!isPlaying) return; // Ignore clicks when not playing

    setUserInput([...userInput, color]);

    if (color === sequence[userInput.length]) {
      if (userInput.length === sequence.length - 1) {
        // User completed the level
        setUserInput([]);
        setLevel(level + 1);
        setMessage('Good job! Next level');
        setIsPlaying(false);

      }
    } else {
      // User made a mistake, end the game
      setUserInput([]);
      setLevel(1);
      setMessage('Press Start For New Game');
      alert('You lost! Please Try Again.')
      setIsPlaying(false);
    }
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
      <h1>Memory Match</h1>
      <p>Level: {level}</p>
      <button onClick={startGame} disabled={isPlaying}>
        Start
      </button>
      <p>{message}</p>
      <div className="board">{renderSquares()}
      </div>
      <div style={{ width: '100%', textAlign: 'left' }}>
        <p>Welcome to Memory Match, a challenging and fun memory game that will put your skills to the test! Can you rise through the levels and become the ultimate Memory Master?

          <h2>How to Play</h2>
          Click the &quot;Start&quot; button to begin the game.
          Pay close attention to the sequence of colored squares that light up.
          Your challenge is to remember and click on the squares in the exact same order once the sequence ends.
          As you progress through the levels, the sequences will become longer and more challenging.
          Complete each level to unlock the next, and see how far you can go!
          If you make a mistake, don&apos;t worry; you can always start over and try to beat your best score.

          <h2>Tips</h2>
          Focus and stay sharp! The sequences get trickier as you advance.
          Take your time. There&apos;s no rush, so make sure you get it right!
          Challenge your friends to see who can achieve the highest level and become the true Memory Master.

          Are you ready to test your memory and become the Memory Master? Click &quot;Start&quot; and find out!</p>
      </div>

    </div>
  );
}

export default App;

