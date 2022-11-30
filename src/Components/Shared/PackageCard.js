import React from 'react';

const PackageCard = ({ item }) => {
    return (
        <div className='border rounded-md px-4 py-2 cursor-pointer'>
            <h1 className='inline-block font-semibold'>{item?.title}</h1>
            <sup className='text-red-600 font-bold ml-1'>{`BDT ${item?.price}`}</sup>
        </div>
    );
};

export default PackageCard;