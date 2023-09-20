import { useState, useEffect } from 'react';
import Square from './Square';

const GameBoard = () => {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [showingSequence, setShowingSequence] = useState(true); // Initially, show the sequence
  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange']; // Add more colors as needed

  useEffect(() => {
    if (showingSequence) {
      // Generate a new sequence for the current level
      const newSequence = [];
      for (let i = 0; i < level; i++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        newSequence.push(randomColor);
      }

      // Show the sequence with a delay between each color
      let index = 0;
      const sequenceInterval = setInterval(() => {
        setSequenceColor(newSequence[index]);
        index++;
        if (index === newSequence.length) {
          clearInterval(sequenceInterval);
          // After showing the sequence, allow user input
          setTimeout(() => {
            setShowingSequence(false);
          }, 1000); // Adjust this delay as needed
        }
      }, 1000); // Adjust this delay as needed
    }
  }, [level]);

  useEffect(() => {
    if (!showingSequence) {
      // Check if the user's input matches the sequence
      if (userInput.join('') === sequence.join('')) {
        // User's input matches the sequence, move to the next level
        setLevel(level + 1);
        setUserInput([]);
        setShowingSequence(true); // Show the sequence for the next level
      } else {
        // User made a mistake, you can handle this case accordingly
        // For example, reset the game or display a message
        // Reset the game for simplicity in this example
        setLevel(1);
        setUserInput([]);
        setShowingSequence(true); // Show the sequence again
      }
    }
  }, [userInput, sequence, level, showingSequence]);

  const setSequenceColor = (color) => {
    // Set the color in the sequence
    setSequence((prevSequence) => [...prevSequence, color]);
  };

  const handleSquareClick = (color) => {
    // Add the clicked color to the user's input
    if (!showingSequence) {
      setUserInput([...userInput, color]);
    }
  };

  return (
    <div className="game-board">
      <h1>Memory Game</h1>
      <div className="grid w-80 h-80">
        {colors.map((color) => (
          <Square
            key={color}
            color={color}
            isActive={showingSequence && sequence.includes(color)}
            onClick={() => handleSquareClick(color)}
          />
        ))}
      </div>
      <p>Level: {level}</p>
    </div>
  );
};

export default GameBoard;

