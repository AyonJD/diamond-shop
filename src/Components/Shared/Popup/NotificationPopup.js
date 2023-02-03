import React, { useEffect, useMemo, useState } from 'react';
import { ImCross } from 'react-icons/im';

const NotificationPopup = ({ setOpenPopup }) => {
    const [notification, setNotification] = useState([]);
    const getNotification = async () => {
        try {
            const res = await fetch("https://firm-shoshanna-ayonjd.koyeb.app/api/v1/auth/notification");
            const data = await res.json();
            setNotification(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getNotification();
    }, []);

    return (
        <div className='popup_wrapper'>
            <div className="popup_content relative">
                <ImCross onClick={() => setOpenPopup(false)} className='absolute right-0 top-0 mr-4 mt-4 h-4 w-4 cursor-pointer' />
                <div>
                    {
                        notification.result?.length > 0 ? (
                            <>
                                {
                                    notification?.result?.slice(0, 5)?.map((item, index) => {
                                        return (
                                            <div className='py-2 border-b border-[#37BC96] flex items-center' key={index}>
                                                <p className='mr-2'>{index + 1})</p>
                                                <p>{item.details}</p>
                                            </div>
                                        )
                                    })
                                }
                            </>
                        ) : (
                            <p className='flex items-center justify-center'>No Notification</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default NotificationPopup;