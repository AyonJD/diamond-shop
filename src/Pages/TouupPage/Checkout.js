import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCopy } from 'react-icons/fa';
import { dataContext } from '../../App';
import bkashImage from '../../Asset/bkash.png';
import nagadImage from '../../Asset/nagad.png';
import rocketImage from '../../Asset/roccket.png';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Checkout = () => {
    const invoiceId = useParams().id;
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { usersOrder, loggedInUser } = useContext(dataContext);
    const { register, formState: { errors }, handleSubmit, trigger, reset } = useForm();
    const willPaymentFor = usersOrder?.result?.find(order => order.invoiceId === invoiceId);
    const selectedService = JSON.parse(localStorage.getItem('selectedService'));
    const localPackage = localStorage.getItem('selectedPackage');
    const playerId = localStorage.getItem('playerId');
    const pack = JSON.parse(localPackage);

    let method = '';
    if (window.location.href.includes('bkash')) {
        method = 'bkash';
    } else if (window.location.href.includes('rocket')) {
        method = 'rocket';
    } else if (window.location.href.includes('nagad')) {
        method = 'nagad';
    }

    const getCurrentTime = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12;
        const hours12String = hours12 ? hours12 : 12;
        const minutesString = minutes < 10 ? '0' + minutes : minutes;
        const currentTime = hours12String + ':' + minutesString + ' ' + ampm;
        return currentTime;
    }

    const handleFormSubmit = async (data) => {
        const user = await loggedInUser?.result?.user;
        const service = await selectedService?.result;
        const gameInfo = {
            playerId,
        }

        if (!user || !service || !pack || !gameInfo || !selectedService) {
            toast.error('Something went wrong, please try again later');
            return;
        }

        const dataToInsert = {
            user,
            gameInfo,
            service,
            pack,
            invoiceId,
            paymentMethod: method,
            paymentStatus: 'Success',
            paymentDate: new Date(),
            paymentTime: getCurrentTime(),
            paymentAmount: pack.price,
            paymentNumber: data.paymentNumber,
            paymentTrxNumber: data.paymentTrxNumber,
            confirmStatus: 'Pending'
        }

        const url = `https://sourav-shop-server.up.railway.app/api/v1/auth/payment/${orderId}`;
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToInsert)
        });
        const result = await res.json();
        if (result.success) {
            reset();
            navigate('/payment/verify');
            toast.success('Payment Successfull');
        } else {
            toast.error('Payment Failed');
        }
    }

    return (
        <div className=''>
            <div className={`w-full border border-slate-300 rounded-sm md:w-1/2 mx-auto my-5 bg-gradient-to-r ${method === 'bkash' ? 'from-[#e44f83] to-[#db2766]' : method === 'rocket' ? 'from-[#9d3fa1] to-[#8d1194]' : method === 'nagad' ? 'from-[#e63b41] to-[#e71017]' : ''}`}>
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
                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className={`pt-4 bg-gradient-to-r ${method === 'bkash' ? 'from-[#e44f83] to-[#db2766]' : method === 'rocket' ? 'from-[#9d3fa1] to-[#8d1194]' : method === 'nagad' ? 'from-[#e63b41] to-[#e71017]' : ''}`}>
                    <h1 className='text-center text-xl font-medium text-white'>Enter {method} Transaction Id</h1>
                    <div className="text-center flex flex-col">
                        <input className='w-1/2 mx-auto py-2 px-3 text-center border border-transparent focus:border focus:border-blue-400 outline-none rounded-sm mt-5' type="number" placeholder='Enter Your Phone'
                            {...register("paymentNumber", {
                                required: 'Phone number is required',
                                minLength: {
                                    value: 11,
                                    message: 'Please enter a valid phone number'
                                }
                            })}
                            onKeyUp={(e) => {
                                trigger('paymentNumber')
                            }}
                        />
                        <small className='text-white mt-1 pl-1 text-[12px]'>{errors?.paymentNumber?.message}</small>

                    </div>
                    <div className="text-center flex flex-col">
                        <input className='w-1/2 mx-auto py-2 px-3 text-center border border-transparent focus:border focus:border-blue-400 outline-none rounded-sm mt-5' type="text" placeholder='Enter Transaction Id'
                            {...register("paymentTrxNumber", {
                                required: true,
                                message: 'Transaction Id is required'
                            })}
                            onKeyUp={(e) => {
                                trigger('paymentTrxNumber')
                            }}
                        />
                        <small className='text-white mt-1 pl-1 text-[12px]'>{errors?.paymentTrxNumber?.message}</small>
                    </div>

                    <ul className='text-white py-4 px-7'>
                        <li className='text-justify'>
                            ১) {method === 'bkash' ? '*247#' : method === 'rocket' ? '*322#' : method === 'nagad' ? '*167#' : ''} ডায়াল করে আপনার বিকাশ মোবাইল মেনুতে যান অথবা {method === 'bkash' ? 'বিকাশ' : method === 'rocket' ? 'রকেট' : method === 'nagad' ? 'নগদ' : ''} অ্যাপে যান।
                        </li>
                        <li className='text-justify'>
                            ২) <span className='text-lg font-semibold text-yellow-300'>"Send Money"</span> - তে ক্লিক করুন।
                        </li>
                        <li className='text-justify flex items-center'>
                            ৩) প্রাপক নম্বর হিসেবে এই নম্বরটি লিখুনঃ <span className='flex ml-2 items-center text-lg font-semibold text-yellow-300'>01920204818 <FaCopy className='ml-2 cursor-pointer' /></span>
                        </li>
                        <li className='text-justify flex items-center'>
                            ৪) টাকার পরিমাণঃ <span className='text-lg font-semibold text-yellow-300 ml-2'>{willPaymentFor?.paymentAmount}</span>
                        </li>
                        <li className='text-justify flex items-center'>
                            ৫) এখন নিশ্চিত করতে আপনার {method === 'bkash' ? 'বিকাশ' : method === 'rocket' ? 'রকেট' : method === 'nagad' ? 'নগদ' : ''} পিন লিখুন।
                        </li>
                        <li className='text-justify flex items-center'>
                            ৬) সবকিছু ঠিক থাকলে, আপনি {method === 'bkash' ? 'বিকাশ' : method === 'rocket' ? 'রকেট' : method === 'nagad' ? 'নগদ' : ''} থেকে একটি নিশ্চিতকরণ বার্তা পাবেন।
                        </li>
                        <li className='text-justify flex items-center'>
                            ৭) এখন উপরের প্রথম বক্সে আপনার ফোন নাম্বার এবং দ্বিতীয় বক্সে "Transaction ID" দিন আর নিচের "VERIFY" বাটনে ক্লিক করুন।
                        </li>
                    </ul>
                    <button className='w-full py-3 text-xl font-bold text-gray-600 bg-white'>VERIFY</button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;