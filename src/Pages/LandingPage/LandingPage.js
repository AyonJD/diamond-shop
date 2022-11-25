import React from 'react';
import AutoPlay from '../../Components/AutoPlay';
import GameCard from '../../Components/Shared/GameCard';
import './LandingPage.css';
import imageOne from "../../Asset/four.jpg";
import imageTwo from "../../Asset/three.png";
import imageThree from "../../Asset/one.png";
import imageFour from "../../Asset/pubg.png";

const LandingPage = () => {
    return (
        <div className='slider_width'>
            <AutoPlay />

            <div className="mid-container">
                <div className='grid max-w-[100vw] mt-5 justify-items-center grid-cols-1 sm:grid-cols-2 mb-20 gap-y-24 gap-x-10 md:grid-cols-4 gap-0'>
                    <GameCard image={imageOne} rank="1" title="ID CODE" server="Bangladesh Server" time="2-5 Minutes" review="15.8K"/>
                    <GameCard image={imageTwo} rank="2" title="IN-GAME" server="Only Bangladesh Server" time="15 min - 2 hr" review="10.2K"/>
                    <GameCard image={imageThree} rank="3" title="IN-GAME" server="Other Server" time="5 Minutes" review="03.5K"/>
                    <GameCard image={imageFour} rank="4" coming="Coming Soon"/>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;