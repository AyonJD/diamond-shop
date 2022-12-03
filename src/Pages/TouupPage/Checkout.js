import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { dataContext } from '../../App';
import bkashImage from '../../Asset/bkash.png';
import nagadImage from '../../Asset/nagad.png';
import rocketImage from '../../Asset/roccket.png';

const Checkout = () => {
    const invoiceId = useParams().id;
    const { usersOrder } = useContext(dataContext)
    const willPaymentFor = usersOrder?.result?.find(order => order.invoiceId === invoiceId);
    console.log(willPaymentFor);

    let method = '';
    if (window.location.href.includes('bkash')) {
        method = 'bkash';
    } else if (window.location.href.includes('rocket')) {
        method = 'rocket';
    } else if (window.location.href.includes('nagad')) {
        method = 'nagad';
    }

    return (
        <div>
            <div className={`w-full md:w-1/2 mx-auto my-5 bg-gradient-to-r ${method === 'bkash' ? 'from-[#e44f83] to-[#db2766]' : method === 'rocket' ? 'from-[#9d3fa1] to-[#8d1194]' : method === 'nagad' ? 'from-[#e63b41] to-[#e71017]' : ''}`}>
                <div className={`bg-white mb-1 ${method === 'rocket' ? 'py-5' : ''}`}>
                    <img
                        className={`w-1/6 mx-auto min-h-[80px]`}
                        src={method === 'bkash' ? bkashImage : method === 'nagad' ? nagadImage : method === 'rocket' ? rocketImage : ''} alt=""
                    />
                </div>
                <div className='bg-white flex justify-between items-center py-3 px-7'>
                    <div>
                        <h1 className='text-2xl font-semibold'>SS Shop</h1>
                        <div className="flex mt-1">
                            <h1 className='text-md font-semibold mr-2'>Invoice Id:</h1>
                            <h1 className='text-md font-semibold'>{invoiceId}</h1>
                        </div>
                    </div>
                    <div className='flex'>
                        <h1 className='text-[1.5rem] font-[800]'>৳</h1>
                        <h1 className='text-[1.5rem] font-bold ml-1'>{willPaymentFor?.paymentAmount}</h1>
                    </div>
                </div>
                <div className={` bg-gradient-to-r ${method === 'bkash' ? 'from-[#e44f83] to-[#db2766]' : method === 'rocket' ? 'from-[#9d3fa1] to-[#8d1194]' : method === 'nagad' ? 'from-[#e63b41] to-[#e71017]' : ''}`}>
                    <h1 className='text-center text-xl font-medium py-3 text-white'>Enter {method} Transaction Id</h1>
                    
                </div>
            </div>
        </div>
    );
};

export default Checkout;