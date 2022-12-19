import { useContext, useState } from "react";
import { MdGraphicEq } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { HiOutlinePhoneIncoming } from "react-icons/hi"
import controller from '../../../Asset/control.png'
import { dataContext } from "../../../App";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const AdminDash = () => {
    const [open, setOpen] = useState(false);
    const [renderItem, setRenderItem] = useState(1);
    const { loggedInUser } = useContext(dataContext)

    const Menus = [
        { title: "My Account", src: <HiOutlineUserCircle className="h-6 w-6" />, id: 1 },
        { title: "All User ", src: <AiOutlineUsergroupAdd className="h-6 w-6" />, id: 2 },
        { title: "Manage Order", src: <RiSecurePaymentFill className="h-6 w-6" />, id: 3 },
        { title: "Create Notification", src: <VscGitPullRequestCreate className="h-6 w-6" />, id: 4 },
        { title: "Update Phone", src: <HiOutlinePhoneIncoming className="h-6 w-6" />, id: 5 },
    ];

    return (
        <>
            <div className="flex sidebar_height">
                <div
                    className={` ${open ? "w-72" : "w-20 "
                        } bg-[#000D50] h-full p-5  pt-8 relative duration-300`}
                >
                    <img
                        src={controller}
                        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
                        onClick={() => setOpen(!open)}
                    />
                    <div className="flex gap-x-4 items-center">
                        {/* <img
                        src="./src/assets/logo.png"
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                            }`}
                    /> */}
                        <MdGraphicEq className={`cursor-pointer duration-500 text-white ${open && "rotate-[360deg]"
                            }`} />
                        <h1
                            className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                                }`}
                        >
                            <p className="logo">
                                <span style={{ fontWeight: "bold" }}>
                                    SS
                                </span>
                                <span
                                    style={{
                                        fontStyle: "italic",
                                        fontFamily: "PlayFair Display, sans-serif",
                                        color: "#37BC96"
                                    }}
                                >
                                    Shop
                                </span>
                            </p>
                        </h1>
                    </div>
                    <ul className="pt-6">
                        {Menus.map((Menu, index) => (
                            <li
                                onClick={() => setRenderItem(Menu.id)}
                                key={index}
                                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                                    } `}
                            >
                                {Menu.src}
                                <span className={`${!open && "hidden"} origin-left duration-200`}>
                                    {Menu.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`px-4 pt-4 overflow-auto ${open ? "small_width" : "large_width"}`}>
                    {renderItem === 1 && <MyAccount loggedInUser={loggedInUser} />}
                    {renderItem === 2 && <AllUser loggedInUser={loggedInUser} />}
                    {renderItem === 3 && <ManageOrder loggedInUser={loggedInUser} />}
                    {renderItem === 4 && <CreateNotification loggedInUser={loggedInUser} />}
                    {renderItem === 5 && <UpdatePhone loggedInUser={loggedInUser} />}
                </div>
            </div>
        </>
    );
};

const MyAccount = ({ loggedInUser }) => {
    return (
        <div>
            <div className="w-full bg-white py-5 mt-2 rounded-sm md:w-1/2 mx-auto flex justify-center">
                <div className="">
                    <h1 className="text-2xl text-center font-medium">My Account</h1>
                    <div>
                        <h1 className="mt-3 text-lg font-medium text-center">Name: {loggedInUser?.result?.user?.userName}</h1>
                        <h1 className="text-center mt-1 font-medium">Email: {loggedInUser?.result?.user?.email}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};


const AllUser = () => {
    const { allUsers } = useContext(dataContext)

    const updateUser = async (userId, role) => {
        try {
            const response = await fetch(`https://sourav-shop-server.up.railway.app/api/v1/auth/user/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ role })
            })
            const data = await response.json()
            if (data.success) {
                toast.success('User role updated successfully.')
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-medium mb-4">Manage User</h1>
            {
                allUsers?.result?.length === 0 ? <h1 className="text-center text-2xl my-10 font-medium">No user found.</h1> : (
                    <div className="w-full handle_table_height overflow-y-auto">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra table-compact w-full">
                                <thead className="">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Joining Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allUsers?.result?.map((user, index) => {
                                            return (
                                                <tr className="hover" key={index}>
                                                    <td className="font-medium">{index + 1}</td>
                                                    <td className="font-medium">{user?.userName}</td>
                                                    <td className="font-medium">{user?.email}</td>
                                                    <td className="font-medium">{user?.role}</td>
                                                    <td className="font-medium">{user?.createdAt?.split("T")[0]}</td>
                                                    <td>
                                                        {
                                                            user?.role === "admin" ? (
                                                                <button
                                                                    onClick={() => {
                                                                        updateUser(user?._id, "user")
                                                                    }}
                                                                    className="text-white bg-[#37BC96] px-4 py-1 rounded-sm hover:bg-transparent border border-transparent hover:border-[#37BC96] hover:border hover:text-[#37BC96] w-[130px] font-semibold">Remove Admin</button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => {
                                                                        updateUser(user?._id, "admin")
                                                                    }}
                                                                    className="text-white bg-[#37BC96] px-4 py-1 rounded-sm hover:bg-transparent border border-transparent hover:border-[#37BC96] hover:border hover:text-[#37BC96] w-[130px] font-semibold">Make Admin</button>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }


        </div>
    );
};

const ManageOrder = () => {
    const { usersOrder, loggedInUser } = useContext(dataContext)
    const [allOrder, setAllOrder] = useState([])
    const navigate = useNavigate();

    const getAllOrder = async () => {
        const response = await fetch(`https://sourav-shop-server.up.railway.app/api/v1/auth/payment`);
        const data = await response.json();
        setAllOrder(data?.result)
    }

    useEffect(() => {
        getAllOrder()
    }, [])

    // Success Order shipment
    const updateOrderStatus = async (order, status, newPaymentStatus) => {
        const { pack, user, gameInfo, service, paymentAmount, paymentNumber, paymentTrxNumber, invoiceId, paymentMethod, paymentStatus, paymentDate, paymentTime, confirmStatus } = order;
        const dataToInsert = {
            user,
            gameInfo,
            service,
            pack,
            invoiceId,
            paymentMethod,
            paymentStatus: newPaymentStatus,
            paymentDate,
            paymentTime,
            paymentAmount,
            paymentNumber,
            paymentTrxNumber,
            confirmStatus: status
        };

        try {
            const response = await fetch(`https://sourav-shop-server.up.railway.app/api/v1/auth/payment/${order?._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToInsert)
            })
            const data = await response.json()
            if (data.success) {
                toast.success('Order status updated successfully.')
                // setTimeout(() => {
                //     window.location.reload()
                // }, 1000)
            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <h1 className="text-2xl font-medium mb-4">{allOrder?.length} total order</h1>
            {
                allOrder?.length === 0 ? <h1 className="text-center text-2xl my-10 font-medium">No Order Found</h1> : (
                    <div className="w-full handle_table_height overflow-y-auto pb-5">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra table-compact w-full">
                                <thead className="">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Amount</th>
                                        <th>Payment Method</th>
                                        <th>Payment Number</th>
                                        <th>Payment Date</th>
                                        <th>Transaction Number</th>
                                        <th>User Payment</th>
                                        <th>Shipment</th>
                                        <th>Details</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allOrder?.map((order, index) => {
                                            return (
                                                <tr className="hover" key={index}>
                                                    <td className="font-medium">{index + 1}</td>
                                                    <td className="font-medium">{order?.user?.userName}</td>
                                                    <td className="font-medium">
                                                        {order?.paymentAmount}
                                                        <sup className='text-red-600 font-bold ml-1'>BDT</sup>
                                                    </td>
                                                    <td className="font-medium">{order?.paymentMethod}</td>
                                                    <td className="font-medium">{order?.paymentNumber}</td>
                                                    <td className="font-medium">{order?.paymentDate?.split("T")[0]}</td>
                                                    <td className="font-medium">{order?.paymentTrxNumber}</td>
                                                    <td className="font-medium">{order?.paymentStatus}</td>
                                                    <td className="font-medium">{order?.confirmStatus}</td>
                                                    <td className="font-medium">
                                                        <button className=' btn-xs bg-white border border-[#37BC96] rounded-sm font-bold text-[#37BC96] hover:bg-[#37BC96] hover:text-white transition-all delay-75 ease-in-out'>See Details</button>
                                                    </td>
                                                    <td>
                                                        <Popup className="popup_content" trigger={<button className=' btn-xs bg-[#37BC96] rounded-sm font-bold text-white'>Take Action</button>} position="left center">
                                                            <button
                                                                onClick={() => updateOrderStatus(order, order.confirmStatus, 'Success')}
                                                                className=' btn-outline bg-[#37BC96] text-white font-semibold btn-sm w-[150px] mb-2 mt-2 ml-2'>Confirm Payment</button>
                                                            <button
                                                                onClick={() => updateOrderStatus(order, order.confirmStatus, 'Failed')}
                                                                className=' btn-outline bg-[#dd0a5b] text-white font-semibold btn-sm w-[150px]  ml-2'>Failed Payment</button>
                                                            <button
                                                                onClick={() => updateOrderStatus(order, 'Success', order.paymentStatus)}
                                                                className=' btn-outline bg-[#37BC96] text-white font-semibold btn-sm mt-5 w-[150px] mb-2 ml-2'>Confirm Order</button>
                                                            <button
                                                                onClick={() => updateOrderStatus(order, 'Failed', order.paymentStatus)}
                                                                className=' btn-outline bg-[#dd0a5b] text-white font-semibold btn-sm w-[150px] mb-2 ml-2'>Failed Order</button>
                                                        </Popup>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }


        </div>
    );
};

const CreateNotification = () => {
    const [notification, setNotification] = useState('');
    const handleNotificationSubmit = async (e) => {
        e.preventDefault();
        if (notification === '') {
            toast.error('Please type something.')
            return;
        }
        if (notification.length < 20) {
            toast.error('Notification must be minimum 20 characters.')
            return;
        }

        const res = await fetch('https://sourav-shop-server.up.railway.app/api/v1/auth/notification', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                details: notification
            })
        })
        const data = await res.json();


        if (data.success) {
            toast.success('Notification created successfully.')
            setNotification('');
        } else {
            toast.error('Something went wrong.')
            console.log(data)
        }
    }
    return (
        <div>
            <h1 className="text-2xl text-center font-medium mb-4">Create Notification</h1>
            <form onSubmit={handleNotificationSubmit} className="w-full sm:w-2/3 mx-auto">
                <textarea onChange={(e) => setNotification(e.target.value)} className="w-full p-5 border-2 border-slate-300 focus:border-[#37BC96] focus:outline-none rounded-sm" name="" id="" cols="20" rows="6" placeholder="Type here..."></textarea>
                <button type="submit" className=' px-5 py-2 rounded-sm mt-2 bg-[#37BC96] text-white font-semibold'>Create Notification</button>
            </form>
        </div>
    )
}

const UpdatePhone = () => {
    const [number, setNumber] = useState([])
    const [bkashNumber, setBkashNumber] = useState('')
    const [rocketNumber, setRocketNumber] = useState('')
    const [nagadNumber, setNagadNumber] = useState('')

    const getAllNumber = async () => {
        const res = await fetch(`https://sourav-shop-server.up.railway.app/api/v1/auth/number`)
        const data = await res.json()
        setNumber(data?.result)
    };

    useEffect(() => {
        getAllNumber()
    }, [])


    const handleBkashNumber = async (id) => {
        const res = await fetch(`https://sourav-shop-server.up.railway.app/api/v1/auth/number/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number: bkashNumber
            })
        })
        const data = await res.json()
        if (data.success) {
            toast.success('Bkash Number Updated Successfully')
        }
    };

    const handleRocketNumber = async (id) => {
        const res = await fetch(`https://sourav-shop-server.up.railway.app/api/v1/auth/number/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number: rocketNumber
            })
        })
        const data = await res.json()
        if (data.success) {
            toast.success('Rocket Number Updated Successfully')
        }
    };

    const handleNagadNumber = async (id) => {
        const res = await fetch(`https://sourav-shop-server.up.railway.app/api/v1/auth/number/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number: nagadNumber
            })
        })
        const data = await res.json()
        if (data.success) {
            toast.success('Nagad Number Updated Successfully')
        }
    }
    return (
        <div>
            <div>
                <h1 className="text-xl font-medium mb-4">Update Bkash Number</h1>
                <div className="flex flex-col sm:flex-row sm:items-center">
                    <input onChange={e => setBkashNumber(e.target.value)} className="p-2 border-[1px] rounded-md sm:rounded-none left_radius focus:border-[#37BC96] focus:outline-none" type="text" />
                    <button onClick={() => handleBkashNumber('639cbac7ed88a659e6f56746')} className="bg-[#37BC96] w-1/2 rounded-md sm:rounded-none sm:w-auto right_radius text-white font-semibold py-2 px-4 mt-3 sm:mt-0 border-[#37BC96] border-[1px]">Update Bkash Number</button>
                </div>
            </div>
            <div className="my-8">
                <h1 className="text-xl font-medium mb-4">Update Rocket Number</h1>
                <div className="flex flex-col sm:flex-row sm:items-center">
                    <input onChange={e => setRocketNumber(e.target.value)} className="p-2 border-[1px] rounded-md sm:rounded-none left_radius focus:border-[#37BC96] focus:outline-none" type="text" />
                    <button onClick={() => handleRocketNumber('639cbb49ed88a659e6f56749')} className="bg-[#37BC96] w-1/2 rounded-md sm:rounded-none sm:w-auto right_radius text-white font-semibold py-2 px-4 mt-3 sm:mt-0 border-[#37BC96] border-[1px]">Update Rocket Number</button>
                </div>
            </div>
            <div>
                <h1 className="text-xl font-medium mb-4">Update Nagad Number</h1>
                <div className="flex flex-col sm:flex-row sm:items-center">
                    <input onChange={e => setNagadNumber(e.target.value)} className="p-2 border-[1px] rounded-md sm:rounded-none left_radius focus:border-[#37BC96] focus:outline-none" type="text" />
                    <button onClick={() => handleNagadNumber('639cbb57ed88a659e6f5674b')} className="bg-[#37BC96] w-1/2 rounded-md sm:rounded-none sm:w-auto right_radius text-white font-semibold py-2 px-4 mt-3 sm:mt-0 border-[#37BC96] border-[1px]">Update Nagad Number</button>
                </div>
            </div>
        </div>
    )
}

export default AdminDash;