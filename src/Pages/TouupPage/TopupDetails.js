import React, { useContext, useEffect, useState, useId } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { dataContext } from '../../App';
import PackageCard from '../../Components/Shared/PackageCard';
import Popup from '../../Components/Shared/Popup/Popup';

const TopupDetails = () => {
    const { id } = useParams();
    const [service, setService] = useState({});
    const [openPopup, setOpenPopup] = useState(true);
    const inCode = '6385ca463baa4f1535334a07'
    const { setOpenWelcomePopup, selectedPackage, setSelectedService } = useContext(dataContext);
    const [currentIndex, setCurrentIndex] = useState(undefined);
    const [paymentId, setPaymentId] = useState(undefined);
    const navigate = useNavigate();
    const [playerId, setPlayerId] = useState('');
    const [selection, setSelection] = useState('');
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [backupCode, setBackupCode] = useState('');

    const getService = async () => {
        try {
            const url = `https://firm-shoshanna-ayonjd.koyeb.app/api/v1/auth/service/${id}`
            const res = await fetch(url);
            const parseData = await res.json();
            setService(parseData);
            setSelectedService(parseData);
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getService();
        setOpenWelcomePopup(false);
    }, [])

    //check selectedPackage is {} or not
    const checkSelectedPackage = () => {
        if (Object.keys(selectedPackage).length === 0) {
            return false;
        }
        return true;
    }

    const generatePaymentId = async () => {
        if (id === inCode && !playerId) {
            toast.error('Please enter your player id');
            return;
        }
        if (id !== inCode && (!account || !password || !backupCode || !selection)) {
            toast.error('Please fill up all the fields');
            return;
        }

        let gameInfo = {};
        if (id === inCode) {
            gameInfo = {
                playerId,
            }
        } else {
            gameInfo = {
                account,
                password,
                backupCode,
                selection,
            }
        }

        const randomString = Math.random().toString(36).substring(2, 4);
        const paymentId = randomString + Date.now();
        setPaymentId(paymentId);
        localStorage.setItem('gameInfo', JSON.stringify(gameInfo));
        navigate(`/add-wallet/${id}/${paymentId}`);
    }

    console.log(selection)

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
                                    <input onChange={(e) => setPlayerId(e.target.value)} className='border-[#37BC96] outline-0 border rounded-md px-2 py-2 mt-1' type="text" placeholder='Player ID' />
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
                            <h1 className='my-2 px-4 font-medium'>You will need BDT {!checkSelectedPackage() ? '0' : selectedPackage?.price} to parse the package</h1>
                            <button
                                disabled={!checkSelectedPackage()}
                                onClick={generatePaymentId}
                                className={`ml-4  text-white border border-transparent font-semibold px-10 py-2 rounded-md  ${!checkSelectedPackage() ? 'bg-slate-300' : 'bg-[#37BC96] hover:bg-transparent hover:border-[#37BC96] hover:border hover:text-[#37BC96] delay-100 transition-all ease-out'}`}>Buy Now</button>
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
                            <form>
                                <div className='md:flex justify-between'>
                                    <div className="flex flex-col px-4 flex-1">
                                        <label className='mt-4'>Account Type</label>
                                        <select
                                            onChange={(e) => setSelection(e.target.value)}
                                            className='border-[#37BC96] outline-0 border rounded-md px-2 py-2 mt-1'>
                                            <option value=''>Select an option</option>
                                            <option value="Facebook Number">Facebook</option>
                                            <option value="Your Gmail">Gmail</option>
                                            <option value="Twitter Number">Twitter</option>
                                            <option value="VK Number">VK</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col px-4 flex-1">
                                        <label className='mt-4'>{selection ? selection : 'Account Number'}</label>
                                        <input
                                            onChange={(e) => setAccount(e.target.value)}
                                            className='border-[#37BC96] outline-0 border rounded-md px-2 py-2 mt-1' type="text" placeholder='Enter Number' />
                                    </div>
                                    <div className="flex flex-col px-4 flex-1">
                                        <label className='mt-4'>Password</label>
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            className='border-[#37BC96] outline-0 border rounded-md px-2 py-2 mt-1' type="text" placeholder='Player ID' />
                                    </div>
                                </div>
                                <div className="flex flex-col px-4 flex-1">
                                    <label className='mt-4'>Account Back Up</label>
                                    <input
                                        onChange={(e) => setBackupCode(e.target.value)}
                                        className='border-[#37BC96] outline-0 border rounded-md px-2 py-2 mt-1' type="text" placeholder='Backup code' />
                                </div>
                            </form>
                            {selection === 'Facebook Number' && <a className='px-4 inline-block mt-3 text-blue-800 font-semibold' target='_blank' href='https://www.youtube.com/watch?v=bAVswJf9N4o'>কিভাবে ফেসবুক অ্যাকাউন্ট এর ব্যাকআপ কোড বের করবেন?</a>}
                            {selection === 'Your Gmail' && <a className='px-4 inline-block mt-3 text-blue-800 font-semibold' target='_blank' href='https://www.youtube.com/watch?v=1DfT46iBRqA&feature=youtu.be'>কিভাবে জিমেইল অ্যাকাউন্ট এর ব্যাকআপ কোড বের করবেন?</a>}
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
                            <h1 className='my-2 px-4 font-medium'>You will need BDT {!checkSelectedPackage() ? '0' : selectedPackage?.price} to parse the package</h1>
                            <button
                                disabled={!checkSelectedPackage()}
                                onClick={generatePaymentId}
                                className={`ml-4  text-white border border-transparent font-semibold px-10 py-2 rounded-md  ${!checkSelectedPackage() ? 'bg-slate-300' : 'bg-[#37BC96] hover:bg-transparent hover:border-[#37BC96] hover:border hover:text-[#37BC96] delay-100 transition-all ease-out'}`}>Buy Now</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default TopupDetails;