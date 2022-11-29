import React, { useContext } from 'react';
import AutoPlay from '../../Components/AutoPlay';
import GameCard from '../../Components/Shared/GameCard';
import './LandingPage.css';
import imageOne from "../../Asset/four.jpg";
import imageTwo from "../../Asset/three.png";
import imageThree from "../../Asset/one.png";
import imageFour from "../../Asset/pubg.png";
import { dataContext } from '../../App';

const LandingPage = () => {
    const { services } = useContext(dataContext);
    return (
        <div className='slider_width'>
            <AutoPlay />

            <div className="mid-container">
                <div className='grid max-w-[100vw] mt-5 justify-items-center grid-cols-1 sm:grid-cols-2 mb-20 gap-y-24 gap-x-10 md:grid-cols-4 gap-0'>
                    {
                        services?.result?.map((service, index) => (<GameCard key={service._id} serial={index} service={service} />))
                    }
                </div>
            </div>
        </div>
    );
};

export default LandingPage;