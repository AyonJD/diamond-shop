import React, { useContext } from 'react';
import { dataContext } from '../../App';
import GameCard from '../../Components/Shared/GameCard';
import './TopupPage.css';

const TopupPage = () => {
    const { services } = useContext(dataContext);
    return (
        <div className="mid-container">
            {/* <h1 className='text-center uppercase text-2xl font-bold mt-5'>Games top up</h1> */}
            <div class="content mt-5">
                <div class="content__container text-center w-fit mx-auto">
                    <p class="content__container__text">
                        Games top up <span>-</span>
                    </p>

                    <ul class="content__container__list">
                        <li class="content__container__list__item">Easy</li>
                        <li class="content__container__list__item">Super fast</li>
                        <li class="content__container__list__item">Secure</li>
                        <li class="content__container__list__item">Trusted</li>
                    </ul>
                </div>
            </div>
            <div className='grid max-w-[100vw] mt-20 justify-items-center grid-cols-1 sm:grid-cols-2 mb-20 gap-y-24 gap-x-10 md:grid-cols-4 gap-0'>
                {
                    services?.result?.map((service, index) => (<GameCard key={service._id} serial={index} service={service} />))
                }
            </div>
        </div>
    );
};

export default TopupPage;