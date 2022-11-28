import React, { useContext, useState } from 'react';
import { dataContext } from '../../App';

const NavigationDropdown = ({ handleScreen }) => {
    const { loggedInUser } = useContext(dataContext);
    const [isOpen, setOpen] = useState(false);

    const handleDropDown = () => {
        setOpen(!isOpen);
    };

    return (
        <div className={`dropdown ${handleScreen === "include_sm_show" ? 'hidden sm:block' : handleScreen === "exclude_sm_show" ? 'sm:hidden' : ''}`}>
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                onClick={handleDropDown}
            >
                {loggedInUser?.result?.user?.userName}
                <svg
                    className="ml-2 w-4 h-4"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>

            <div
                id="dropdown"
                className={`z-10 w-44 bg-white rounded divide-y absolute right-4 top-[5rem] divide-gray-100 shadow ${isOpen ? "block" : "hidden"
                    }`}
            >
                <ul className=" z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow ">
                    <li
                    >
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                            Dashboard
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavigationDropdown;