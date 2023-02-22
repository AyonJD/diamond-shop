import React from 'react';
import { ImCross } from 'react-icons/im';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const UpdateServicePopup = ({ setOpenPopup, service }) => {
    const { register, formState: { errors }, handleSubmit, trigger, reset } = useForm();

    const onSubmit = (data) => {

        const packageToInsert = [
            { title: data.serviceOneName || service.package[0].title, price: data.serviceOnePrice || service.package[0].price },
            { title: data.serviceTwoName || service.package[1].title, price: data.serviceTwoPrice || service.package[1].price },
            { title: data.serviceThreeName || service.package[2].title, price: data.serviceThreePrice || service.package[2].price },
            { title: data.serviceFourName || service.package[3].title, price: data.serviceFourPrice || service.package[3].price }
        ];

        const serviceToInsert = { ...service, package: packageToInsert };

        const url = `https://firm-shoshanna-ayonjd.koyeb.app/api/v1/auth/service/${service._id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(serviceToInsert)
        })

            .then(res => res.json())
            .then(data => {
                if (data) {
                    setOpenPopup(false)
                    toast.success('Service Updated Successfully')
                    reset()
                }
            }).catch(err => {
                toast.error('Something went wrong')
            })


    }

    return (
        <div className='popup_wrapper'>
            <div className="popup_content relative">
                <ImCross onClick={() => setOpenPopup(false)} className='absolute right-0 top-0 mr-4 mt-4 h-4 w-4 cursor-pointer' />
                <div>
                    <h1 className='text-xl font-semibold text-center my-4 border-b pb-4 border-green-600'>Update {service.title} Service</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full  mb-3">
                                    <label
                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Service Name : {service.package[0].title}
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 customInputClass placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder='Update Service Name'

                                        {...register("serviceOneName", {
                                            required: false,
                                        })}

                                        onKeyUp={() => {
                                            trigger('serviceOneName')
                                        }}
                                    />

                                    <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.serviceOneName?.message}</small>


                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Service Name : {service.package[0].title}
                                    </label>
                                    <input
                                        type="number"
                                        className="border-0 px-3 py-3 customInputClass placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder={`Update ${service.package[0].title} Price`}

                                        {...register("serviceOnePrice", {
                                            required: false,
                                        })}

                                        onKeyUp={() => {
                                            trigger('serviceOnePrice')
                                        }}
                                    />

                                    <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.serviceOnePrice?.message}</small>
                                </div>
                            </div>

                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full  mb-3">
                                    <label
                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Service Name : {service.package[1].title}
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 customInputClass placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder='Update Service Name'

                                        {...register("serviceTwoName", {
                                            required: false,
                                        })}

                                        onKeyUp={() => {
                                            trigger('serviceTwoName')
                                        }}
                                    />

                                    <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.serviceTwoName?.message}</small>


                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Service Name : {service.package[1].title}
                                    </label>
                                    <input
                                        type="number"
                                        className="border-0 px-3 py-3 customInputClass placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder={`Update ${service.package[1].title} Price`}

                                        {...register("serviceTwoPrice", {
                                            required: false,
                                        })}

                                        onKeyUp={() => {
                                            trigger('serviceTwoPrice')
                                        }}
                                    />

                                    <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.serviceTwoPrice?.message}</small>
                                </div>
                            </div>

                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full  mb-3">
                                    <label
                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Service Name : {service.package[2].title}
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 customInputClass placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder='Update Service Name'

                                        {...register("serviceThreeName", {
                                            required: false,
                                        })}

                                        onKeyUp={() => {
                                            trigger('serviceThreeName')
                                        }}
                                    />

                                    <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.serviceThreeName?.message}</small>


                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Service Name : {service.package[2].title}
                                    </label>
                                    <input
                                        type="number"
                                        className="border-0 px-3 py-3 customInputClass placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder={`Update ${service.package[2].title} Price`}

                                        {...register("serviceThreePrice", {
                                            required: false,
                                        })}

                                        onKeyUp={() => {
                                            trigger('serviceThreePrice')
                                        }}
                                    />

                                    <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.serviceThreePrice?.message}</small>
                                </div>
                            </div>

                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full  mb-3">
                                    <label
                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Service Name : {service.package[3].title}
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 customInputClass placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder='Update Service Name'

                                        {...register("serviceFourName", {
                                            required: false,
                                        })}

                                        onKeyUp={() => {
                                            trigger('serviceFourName')
                                        }}
                                    />

                                    <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.serviceFourName?.message}</small>


                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Service Name : {service.package[3].title}
                                    </label>
                                    <input
                                        type="number"
                                        className="border-0 px-3 py-3 customInputClass placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder={`Update ${service.package[3].title} Price`}

                                        {...register("serviceFourPrice", {
                                            required: false,
                                        })}

                                        onKeyUp={() => {
                                            trigger('serviceFourPrice')
                                        }}
                                    />

                                    <small className='text-[#FF4B2B] custom_font custom_font_size'>{errors?.serviceFourPrice?.message}</small>
                                </div>
                            </div>

                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <button
                                        className="bg-green-600 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Update Service
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateServicePopup;