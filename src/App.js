import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card';

function App() {
  const images = [
    'mango.jpg',
    'orange.jpg',
    'grapes.jpg',
    'apple.jpg',
    'banana.jpg',
    'watermelon.jpg',
    'fig.jpg',
    'dragon_fruit.jpg',
  ];

  const shuffledImages = [...images, ...images].sort(() => Math.random() - 0.5);

  const [cards, setCards] = useState(
    shuffledImages.map((image, index) => ({ id: index, image, isFlipped: false, isMatched: false }))
  );
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    if (flippedCount === 2) {
      const [firstIndex, secondIndex] = flippedIndexes;
      if (cards[firstIndex].image === cards[secondIndex].image) {
        const newCards = [...cards];
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setCards(newCards);
        setScore(score + 1);
        setFlippedIndexes([]);
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards(newCards);
          setFlippedIndexes([]);
        }, 1000);
      }
      setFlippedCount(0);
    }
  }, [flippedCount, flippedIndexes, cards, score]);

  useEffect(() => {
    if (score === images.length) {
      setGameOver(true);
    }
  }, [score, images.length]);

  const handleCardClick = (index) => {
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedIndexes([...flippedIndexes, index]);
    setFlippedCount(flippedCount + 1);
  };

  const resetGame = () => {
    setCards(
      shuffledImages.map((image, index) => ({
        id: index,
        image,
        isFlipped: false,
        isMatched: false,
      }))
    );
    setFlippedCount(0);
    setFlippedIndexes([]);
    setGameOver(false);
    setScore(0);
    setIsButtonClicked(true);
    setTimeout(() => {
      setIsButtonClicked(false);
    }, 500);
  };

  return (
    <div className="App">
      <div className="score-left">
        <div className="score-circle">Score : {score}</div>
      </div>
      <div className="head">
        <h1>Memory Card Game</h1>
      </div>
      <div className="score-right">
        <div className="score-circle">Score : {score}</div>
      </div>
      <div className="cards-container">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            id={card.id}
            image={card.image}
            handleClick={handleCardClick}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
          />
        ))}
      </div>

      {gameOver ? (
        <div className="game-over">
          <div className="header">
            <h2>Congratulations!</h2>
          </div>
          <button
            id="play_again"
            onClick={resetGame}
            className={isButtonClicked ? 'clicked' : ''}
          >
            <b>Play Again</b>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
