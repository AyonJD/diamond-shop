import React from 'react';
import './GameCard.css';

const GameCard = ({image, title, server, time, review, rank, coming}) => {
    return (
        <div class="game">
            <div class="rank">{ rank}</div>
  <div class="front">
    <img class="thumbnail" src={image} alt="Free Fire" />
                <h3 class="name">{ title}</h3>
          {
            coming ? 
            <div class="stats">
            <p class="viewers">{coming}</p>
          </div>
              :
              <>
              <div class="stats">
      <p class="viewers">{server}</p>
    </div>
    <div class="stats">
      <p class="viewers">{time}</p>
    </div>
              </>
    }
  </div>
  <div class="back">
          {
            coming ? 
              <p className='font-semibold text-xl text-center mt-[-100px]'>{ coming}</p>
              :
              <>
              <div class="streaming-info">
                    <p class="game-stat">
                        ★★★★★
                        <span>Rating</span></p>
                    <p class="game-stat">{ review}<span>Reviews</span></p>
    </div>
    <button class="btn rounded-md">Get It Now</button>
              </>
    }
  </div>
  <div class="background"></div>
</div>
    );
};

export default GameCard;