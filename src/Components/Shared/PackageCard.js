import React, { useState } from 'react';
import { GiCheckMark } from 'react-icons/gi';

const PackageCard = ({ item, setSelectedPackage, index, currentIndex, setCurrentIndex }) => {
    return (
        <div className='border rounded-md px-4 py-2 cursor-pointer relative' onClick={() => {
            setSelectedPackage(item);
            setCurrentIndex(index)
        }}>
            <div className={`inline-flex absolute -top-2 -left-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-[#37BC96] rounded-full border-2 border-white dark:border-gray-900 ${(currentIndex === index) ? '' : "hidden"}`}>
                <GiCheckMark className=' check_icon text-white' />
            </div>
            <h1 className='inline-block font-semibold'>{item?.title}</h1>
            <sup className='text-red-600 font-bold ml-1'>{`BDT ${item?.price}`}</sup>
        </div>
    );
};

export default PackageCard;