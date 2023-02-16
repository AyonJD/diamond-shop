import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ImCross } from 'react-icons/im';
import { constant_password } from '../../../Utils/Constant';
import './Popup.css';

const NagadAlert = ({ setNagadNumber, handleNagadNumber, setOpenPopup }) => {
    const [password, setPassword] = useState('');

    const handleSendPassword = () => {
        if (password !== constant_password) {
            toast.error('Password is not correct');
            return;
        } else {
            handleNagadNumber('639cbb57ed88a659e6f5674b')
            setNagadNumber('')
            setOpenPopup(false);
        }
    }

    return (
        <div className='popup_wrapper'>
            <div className="popup_content relative">
                <ImCross onClick={() => setOpenPopup(false)} className='absolute right-0 top-0 mr-4 mt-4 h-4 w-4 cursor-pointer' />
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                        <label
                            className="block text-gray-600 text-sm font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Enter Password to Change Phone Number
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="customInputClass border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder='********'
                        />
                    </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                        <button
                            onClick={handleSendPassword}
                            className="bg-[#37BC96] text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-10 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NagadAlert;