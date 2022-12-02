import React, { useContext, useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { dataContext } from '../../App';
import { FaPhoneAlt } from 'react-icons/fa';
import { RiErrorWarningFill } from 'react-icons/ri';
import { MdPayment } from 'react-icons/md';
import bkashImage from '../../Asset/bkash.png';
import nagadImage from '../../Asset/nagad.png';
import rocketImage from '../../Asset/roccket.png';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SelectPaymentMethodPopup = () => {
    const { setOpenWelcomePopup } = useContext(dataContext);
    const [openPaymentMethod, setOpenPaymentMethod] = useState(true);
    const [openInvoice, setOpenInvoice] = useState(false);
    const [openSupport, setOpenSupport] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        setOpenWelcomePopup(false);
    }, [])

    const handleSupport = () => {
        setOpenSupport(true);
        setOpenPaymentMethod(false);
        setOpenInvoice(false);
    }

    const handlePaymentMethod = () => {
        setOpenPaymentMethod(true);
        setOpenSupport(false);
        setOpenInvoice(false);
    }

    const handleInvoice = () => {
        setOpenInvoice(true);
        setOpenPaymentMethod(false);
        setOpenSupport(false);
    }

    return (
        <div className='popup_wrapper'>
            <div className="popup_content relative">
                <ImCross className='absolute right-0 top-0 mr-4 mt-4 h-4 w-4 cursor-pointer'
                onClick={() => {
                    navigate('/')
                    toast.error('Payment failed')
                }}
                />
                <div>
                    <div className=''>
                        <h1 className='text-center font-semibold text-2xl'>SS Shop</h1>
                        <div className='flex mt-6 justify-evenly items-center border-b border-slate-600 pb-3'>
                            <div
                                onClick={handleSupport}
                                className={`flex items-center cursor-pointer hover:text-[#37BC96] delay-100 transition-all ease-in-out ${openSupport ? 'text-[#37BC96]' : ''}`}>
                                <FaPhoneAlt className='h-5 w-5' />
                                <span className='ml-2 font-medium'>Support</span>
                            </div>
                            <div
                                onClick={handlePaymentMethod}
                                className={`flex items-center cursor-pointer hover:text-[#37BC96] delay-100 transition-all ease-in-out ${openPaymentMethod ? 'text-[#37BC96]' : ''}`}>
                                <MdPayment className='h-5 w-5' />
                                <span className='ml-2 font-medium'>Payment Method</span>
                            </div>
                            <div
                                onClick={handleInvoice}
                                className={`flex items-center cursor-pointer hover:text-[#37BC96] delay-100 transition-all ease-in-out ${openInvoice ? 'text-[#37BC96]' : ''}`}>
                                <RiErrorWarningFill className='h-5 w-5' />
                                <span className='ml-2 font-medium'>Invoice</span>
                            </div>
                        </div>
                        {
                            openPaymentMethod && (
                                <div className="flex w-full items-center justify-between">
                                    <img className='w-1/4 h-auto cursor-pointer' src={bkashImage} alt="" />
                                    <img className='w-1/4 h-auto cursor-pointer' src={rocketImage} alt="" />
                                    <img className='w-1/4 h-auto cursor-pointer' src={nagadImage} alt="" />
                                </div>
                            )
                        }
                        {
                            openInvoice && (
                                <div>
                                    <h1 className='text-center text-2xl font-medium mt-4 mb-3'>Transaction Details</h1>
                                    <div>
                                        <div className='flex px-16 justify-between items-center'>
                                            <p className='font-medium'>Invoice To:</p>
                                            <p className='font-medium'>123456789</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectPaymentMethodPopup;