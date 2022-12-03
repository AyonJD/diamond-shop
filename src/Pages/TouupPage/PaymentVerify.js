import React, { useContext } from 'react';
import { dataContext } from '../../App';

const PaymentVerify = () => {
    const { loggedInUser } = useContext(dataContext);
    return (
        <div className='h-screen flex justify-center'>
            <div className=" mt-10 w-[90vw] md:w-1/2 text-center">
                <h1 className='text-3xl font-medium text-[#37BC96]'>Thank you {loggedInUser?.result?.user?.userName} for the payment 😇</h1>
                <h1 className='text-lg font-medium mt-5'>Let us verify your payment</h1>
                <h1 className='text-md font-medium'>This can take some time, please be patient. If you have any question please directly get connected with us via <a className='text-blue-800 underline' target='_blank' href="https://www.facebook.com/profile.php?id=100088264449444">facebook</a></h1>
            </div>
        </div>
    );
};

export default PaymentVerify;