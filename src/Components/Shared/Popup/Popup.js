import React from 'react';
import { ImCross } from 'react-icons/im';
import './Popup.css';
import welcomeGift from '../../../Asset/welcome.gif';

const Popup = ({ popupData, setOpenPopup }) => {
    return (
        <div className='popup_wrapper'>
            <div className="popup_content relative">
                <ImCross onClick={() => setOpenPopup(false)} className='absolute right-0 top-0 mr-4 mt-4 h-4 w-4 cursor-pointer' />
                <div>
                    <div className='w-1/2 mt-[-50px] mx-auto'>
                        <img className='w-full' src={welcomeGift} alt="" />
                    </div>
                    <p>{popupData}</p>
                </div>
            </div>
        </div>
    );
};

export default Popup;