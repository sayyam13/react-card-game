
import React, { useState } from 'react';
import './Card.css';

const Card = ({ id, image, handleClick, isFlipped, isMatched }) => {
  const cardClass = isFlipped ? 'card flipped' : 'card';

  const handleClickInternal = () => {
    if (!isFlipped && !isMatched) {
      handleClick(id);
    }
  };

  return (
    <div className={cardClass} onClick={handleClickInternal}>
      {isFlipped || isMatched ? (
        <img src={image} alt={`Card ${id}`} />
      ) : (
        <div className="card-back"></div>
      )}
    </div>
  );
};

export default Card;

