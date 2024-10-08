import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { dataContext } from '../../App';
import paymentImage from '../../Asset/payment.png';

const PaymentMethod = () => {
    const { register, formState: { errors }, handleSubmit, trigger, reset } = useForm();
    const navigate = useNavigate();
    const paymentId = useParams().id;
    const { serviceId } = useParams();
    const { loggedInUser, selectedService, setSelectedService } = useContext(dataContext);
    const localPackage = localStorage.getItem('selectedPackage');
    const gameInfo = localStorage.getItem('gameInfo');
    const gameInfoObj = JSON.parse(gameInfo);
    const pack = JSON.parse(localPackage);



    const getService = async () => {
        try {
            const url = `https://firm-shoshanna-ayonjd.koyeb.app/api/v1/auth/service/${serviceId}`
            const res = await fetch(url);
            const parseData = await res.json();
            // setService(parseData);
            setSelectedService(parseData);
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getService();
    }, [])

    //get current time in 12 hours format
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
        localStorage.setItem('selectedService', JSON.stringify(selectedService));
        const user = await loggedInUser.result.user;
        const service = await selectedService.result;
        const pack = await JSON.parse(localPackage);

        const dataToInsert = {
            user,
            gameInfo: gameInfoObj,
            service,
            pack,
            invoiceId: paymentId,
            paymentMethod: 'Bkash',
            paymentStatus: 'Not Paied',
            paymentDate: new Date(),
            paymentTime: getCurrentTime(),
            paymentAmount: pack.price,
            paymentNumber: "Not set yet",
            paymentTrxNumber: "Not set",
            confirmStatus: 'Pending'
        }

        const url = 'https://firm-shoshanna-ayonjd.koyeb.app/api/v1/auth/payment'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToInsert)
        });
        const result = await response.json();
        console.log(result);
        if (result.success) {
            const orderId = result.result._id;
            navigate(`/payment/${orderId}/${paymentId}`);
        } else {

        }
    }

    return (
        <div className='mid-container'>
            <div className='mx-auto'>
                <img className='mx-auto' src={paymentImage} alt="" />
                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className='flex flex-col w-full md:w-1/2 md:mx-auto mt-10'>
                    <input className='border-[#37BC96] outline-0 border rounded-md px-2 py-2 mt-1' type="number" placeholder={`BDT ${pack?.price}`} disabled readOnly
                    // {...register("amount", {
                    //     required: 'Amount is required',
                    //     minLength: {
                    //         value: 2,
                    //         message: 'Minimum 2 character required'
                    //     }
                    // })}
                    // onKeyUp={(e) => {
                    //     trigger('amount')
                    // }}
                    />
                    {/* <small className='text-[#FF4B2B] pl-1 text-[12px]'>{errors?.amount?.message}</small> */}

                    <input className='text-white border border-transparent font-semibold px-10 py-2 rounded-md bg-[#37BC96] hover:bg-transparent hover:border-[#37BC96] hover:border hover:text-[#37BC96] delay-100 transition-all ease-out mt-4 cursor-pointer w-1/2 mx-auto' type="submit" value="Add Money" />
                </form>
            </div>
        </div>
    );
};

export default PaymentMethod;