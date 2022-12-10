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
const AdminDash = () => {
    const [open, setOpen] = useState(false);
    const [renderItem, setRenderItem] = useState(1);
    const { loggedInUser } = useContext(dataContext)

    const Menus = [
        { title: "My Account", src: <HiOutlineUserCircle className="h-6 w-6" />, id: 1 },
        { title: "All User ", src: <AiOutlineUsergroupAdd className="h-6 w-6" />, id: 2 },
        { title: "Manage Order", src: <RiSecurePaymentFill className="h-6 w-6" />, id: 3 },
        { title: "Create Notification", src: <VscGitPullRequestCreate className="h-6 w-6" />, id: 4 },
        { title: "Update Phone", src: <HiOutlinePhoneIncoming className="h-6 w-6" />, id: 4 },
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
    const { usersOrder, loggedInUser } = useContext(dataContext)
    const completedTransaction = usersOrder?.result?.filter(order => order?.paymentTrxNumber !== "Not set");

    return (
        <div>
            <h1 className="text-2xl font-medium mb-4">My Transaction</h1>
            {
                usersOrder?.result?.length === 0 ? <h1 className="text-center text-2xl my-10 font-medium">You have no transaction.</h1> : (
                    <div className="w-full handle_table_height overflow-y-auto">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra table-compact w-full">
                                <thead className="">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Package</th>
                                        <th>Amount</th>
                                        <th>Transaction Number</th>
                                        <th>Number</th>
                                        <th>Payment Method</th>
                                        <th>Confirm Status</th>
                                        <th>Delivery Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        completedTransaction?.map((order, index) => {
                                            return (
                                                <tr className="hover" key={index}>
                                                    <td className="font-medium">{index + 1}</td>
                                                    <td className="font-medium">{loggedInUser?.result?.user?.userName}</td>
                                                    <td className="font-medium">{order?.pack?.title}</td>
                                                    <td className="font-medium">
                                                        {order?.paymentAmount}
                                                        <sup className='text-red-600 font-bold ml-1'>BDT</sup>
                                                    </td>
                                                    <td className="font-medium">{order?.invoiceId}</td>
                                                    <td className="font-medium">{order?.paymentNumber}</td>
                                                    <td className="font-medium">{order?.paymentMethod}</td>
                                                    <td className="font-medium">{order?.confirmStatus}</td>
                                                    <td>
                                                        {order?.updatedAt?.split("T")[0]}
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
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="text-2xl font-medium mb-4">My Order</h1>
            {
                usersOrder?.result?.length === 0 ? <h1 className="text-center text-2xl my-10 font-medium">No Order Found</h1> : (
                    <div className="w-full handle_table_height overflow-y-auto pb-5">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra table-compact w-full">
                                <thead className="">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Amount</th>
                                        <th>Order ID</th>
                                        <th>Order Status</th>
                                        <th>Order Time</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        usersOrder?.result?.map((order, index) => {
                                            return (
                                                <tr className="hover" key={index}>
                                                    <td className="font-medium">{index + 1}</td>
                                                    <td className="font-medium">{loggedInUser?.result?.user?.userName}</td>
                                                    <td className="font-medium">
                                                        {order?.pack?.price}
                                                        <sup className='text-red-600 font-bold ml-1'>BDT</sup>
                                                    </td>
                                                    <td className="font-medium">{order?.invoiceId}</td>
                                                    <td className="font-medium">{order?.paymentStatus}</td>
                                                    <td className="font-medium">{order?.paymentTime}</td>
                                                    <td>
                                                        {
                                                            order?.paymentStatus === "Pending" ? (
                                                                <button
                                                                    onClick={() => navigate(`/payment/${order._id}/${order?.invoiceId}`)} className="text-white bg-[#37BC96] px-4 py-1 rounded-sm hover:bg-transparent border border-transparent hover:border-[#37BC96] hover:border hover:text-[#37BC96] w-[90px] font-semibold">Pay Now</button>
                                                            ) : (
                                                                <button
                                                                    disabled={true}
                                                                    onClick={() => navigate(`/payment/${order?.invoiceId}`)} className="text-white bg-slate-300 px-4 py-1 rounded-sm border border-transparent font-semibold w-[90px]">Paied</button>
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

const CreateNotification = () => {
    return (
        <div>
            <h1 className="text-2xl font-medium mb-4">Create Notification</h1>
        </div>
    )
}

export default AdminDash;