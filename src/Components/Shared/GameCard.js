import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './GameCard.css';

const GameCard = ({ service, serial }) => {
  const { title, image, serverName, time, _id } = service;
  const navigate = useNavigate()
  const coming = null;
  return (
    <div onClick={()=>navigate(`/topup/${_id}`)} className="game">
      <div className="rank">{serial + 1}</div>
      <div className="game_fromt">
        <img className="game_image" src={image} alt="Free Fire" />
        <h3 className="game_title">{title}</h3>
        {
          coming ?
            <div className="game_stats">
              <p className="viewers">{coming}</p>
            </div>
            :
            <>
              <div className="game_stats">
                <p className="viewers">{serverName === 'facebook'? '' : serverName}</p>
              </div>
              <div className="game_stats">
                <p className="viewers">{time}</p>
              </div>
            </>
        }
      </div>
      <div className="game_back">
        {
          coming ?
            <p classNameName='font-semibold text-xl text-center mt-[-100px]'>{coming}</p>
            :
            <>
              <div className="streaming-info">
                <p className="game-stat">
                  ★★★★★
                  <span>Rating</span></p>
                <p className="game-stat">{'10K'}<span>Reviews</span></p>
              </div>
              <button className=" text-white border-[#37BC96] border px-4 py-1 rounded-md bg-[#37BC96] delay-100 transition-all ease-in-out hover:bg-[#01996D]">Get It Now</button>
            </>
        }
      </div>
      <div className="game_background"></div>
    </div>
  );
};

export default GameCard;