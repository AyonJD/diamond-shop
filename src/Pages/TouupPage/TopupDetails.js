import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dataContext } from '../../App';
import PackageCard from '../../Components/Shared/PackageCard';
import Popup from '../../Components/Shared/Popup/Popup';

const TopupDetails = () => {
    const { id } = useParams();
    const [service, setService] = useState({});
    const [openPopup, setOpenPopup] = useState(true);
    const inCode = '6385ca463baa4f1535334a07'
    const { setOpenWelcomePopup } = useContext(dataContext);
    const [selectedPackage, setSelectedPackage] = useState({});
    const [currentIndex, setCurrentIndex] = useState(undefined);

    const getService = async () => {
        try {
            const url = `https://sourav-shop-server.up.railway.app/api/v1/auth/service/${id}`
            const res = await fetch(url);
            const parseData = await res.json();
            setService(parseData);
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getService();
        setOpenWelcomePopup(false);
    }, [])

    return (
        <div>
            {openPopup && <Popup setOpenPopup={setOpenPopup} popupData={service?.result?.popupData} />}
            {
                id === inCode ? (
                    <div className='mid-container'>
                        <h1 className='text-2xl font-bold text-center my-5'>In Code</h1>
                        <div className="border py-4 rounded-md bg-white">
                            <div className="border-b pb-3 px-4">
                                <h1 className='inline-block text-2xl font-bold text-white bg-[#37BC96] px-[10px] align-middle rounded-full'>1</h1>
                                <h1 className='inline-block ml-2 font-semibold'>ENTER ACCOUNT INFO</h1>
                            </div>
                            <form>
                                <div className="flex flex-col px-4">
                                    <label className='mt-4'>Player ID</label>
                                    <input className='border-[#37BC96] outline-0 border rounded-md px-2 py-2 mt-1' type="text" placeholder='Player ID' />
                                </div>
                            </form>
                        </div>
                        <div className="border mt-10 py-4 rounded-md bg-white">
                            <div className="border-b pb-3 px-4">
                                <h1 className='inline-block text-2xl font-bold text-white bg-[#37BC96] px-[10px] align-middle rounded-full'>2</h1>
                                <h1 className='inline-block ml-2 font-semibold'>SELECT RECHARGE</h1>
                            </div>
                            <div className='flex flex-wrap gap-5 mt-4 mx-2'>
                                {
                                    service?.result?.package?.map((item, index) => {
                                        return (
                                            <PackageCard
                                                key={index}
                                                index={index}
                                                item={item}
                                                setSelectedPackage={setSelectedPackage}
                                                setCurrentIndex={setCurrentIndex}
                                                currentIndex={currentIndex}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="border mt-10 py-4 rounded-md bg-white">
                            <div className="border-b pb-3 px-4">
                                <h1 className='inline-block text-2xl font-bold text-white bg-[#37BC96] px-[10px] align-middle rounded-full'>3</h1>
                                <h1 className='inline-block ml-2 font-semibold'>PAYMENT</h1>
                            </div>
                            <h1>You will need { } to parse the package</h1>
                        </div>
                    </div>
                ) : (
                    <div className='mid-container'>
                        <h1 className='text-2xl font-bold text-center my-5'>{service?.result?.title}</h1>
                        <div className="border py-4 rounded-md bg-white">
                            <div className="border-b pb-3 px-4">
                                <h1 className='inline-block text-2xl font-bold text-white bg-[#37BC96] px-[10px] align-middle rounded-full'>1</h1>
                                <h1 className='inline-block ml-2 font-semibold'>ENTER ACCOUNT INFO</h1>
                            </div>
                            {/* <form>
                                <div className="flex flex-col px-4">
                                    <label className='mt-4'>Player ID</label>
                                    <input className='border-[#37BC96] outline-0 border rounded-md px-2 py-2 mt-1' type="text" placeholder='Player ID' />
                                </div>
                            </form> */}
                            <h1 className='text-center my-5 text-3xl text-red-500'>Constructing...</h1>
                        </div>
                        <div className="border mt-10 py-4 rounded-md bg-white">
                            <div className="border-b pb-3 px-4">
                                <h1 className='inline-block text-2xl font-bold text-white bg-[#37BC96] px-[10px] align-middle rounded-full'>2</h1>
                                <h1 className='inline-block ml-2 font-semibold'>SELECT RECHARGE</h1>
                            </div>
                            <div className='flex flex-wrap gap-5 mt-4 mx-2'>
                                {
                                    service?.result?.package?.map((item, index) => {
                                        return (
                                            <PackageCard key={index} item={item} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default TopupDetails;