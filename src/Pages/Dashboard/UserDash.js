import { useContext, useState } from "react";
import { MdGraphicEq } from "react-icons/md";
import { MdAccountBox } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { AiOutlineTransaction } from "react-icons/ai";
import controller from '../../Asset/control.png'
import { dataContext } from "../../App";
const UserDash = () => {
    const [open, setOpen] = useState(false);
    const [renderItem, setRenderItem] = useState(1);
    const { loggedInUser } = useContext(dataContext)
    console.log(loggedInUser);
    const Menus = [
        { title: "My Account", src: <MdAccountBox className="h-6 w-6" />, id: 1 },
        { title: "My Order", src: <RiSecurePaymentFill className="h-6 w-6" />, id: 2 },
        { title: "My Transaction ", src: <AiOutlineTransaction className="h-6 w-6" />, id: 3 },
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
                    {renderItem === 2 && <MyOrder loggedInUser={loggedInUser} />}
                    {renderItem === 3 && <MyTransaction loggedInUser={loggedInUser} />}
                </div>
            </div>
        </>
    );
};

const MyAccount = ({ loggedInUser }) => {
    return (
        <div>
            <marquee className="text-[#000D50] font-semibold text-[16px]">NOTICE : কোন সমস্যা হলে মেসেঞ্জারে এসএমএস করবেন... আমাদের সেন্ড মানি নাম্বারে যদি কেউ ফোন করে থাকে তাহলে তার টাকা এড করে দেওয়া হবে না এমনকি অর্ডারও কমপ্লিট করে দেওয়া হবে না |</marquee>
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

const MyOrder = () => {
    return (
        <div>
            <marquee className="text-[#000D50] font-semibold text-[14px]">NOTICE : কোন সমস্যা হলে মেসেঞ্জারে এসএমএস করবেন... আমাদের সেন্ড মানি নাম্বারে যদি কেউ ফোন করে থাকে তাহলে তার টাকা এড করে দেওয়া হবে না এমনকি অর্ডারও কমপ্লিট করে দেওয়া হবে না |</marquee>
            <h1 className="text-2xl font-medium mb-4">My Order</h1>
            <div className="w-full handle_table_height overflow-y-auto">
                <div className="overflow-x-auto">
                    <table className="table table-zebra table-compact w-full">
                        <thead className="">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Order ID</th>
                                <th>Order Status</th>
                                <th>Order Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td>Littel, Schaden and Vandervort</td>
                                <td>Canada</td>
                                <td>12/16/2020</td>
                                <td>Blue</td>
                            </tr>
                            <tr>
                                <th>2</th>
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                                <td>Zemlak, Daniel and Leannon</td>
                                <td>United States</td>
                                <td>12/5/2020</td>
                                <td>Purple</td>
                            </tr>
                            <tr>
                                <th>3</th>
                                <td>Brice Swyre</td>
                                <td>Tax Accountant</td>
                                <td>Carroll Group</td>
                                <td>China</td>
                                <td>8/15/2020</td>
                                <td>Red</td>
                            </tr>
                            <tr>
                                <th>4</th>
                                <td>Marjy Ferencz</td>
                                <td>Office Assistant I</td>
                                <td>Rowe-Schoen</td>
                                <td>Russia</td>
                                <td>3/25/2021</td>
                                <td>Crimson</td>
                            </tr>
                            <tr>
                                <th>5</th>
                                <td>Yancy Tear</td>
                                <td>Community Outreach Specialist</td>
                                <td>Wyman-Ledner</td>
                                <td>Brazil</td>
                                <td>5/22/2020</td>
                                <td>Indigo</td>
                            </tr>
                            <tr>
                                <th>6</th>
                                <td>Irma Vasilik</td>
                                <td>Editor</td>
                                <td>Wiza, Bins and Emard</td>
                                <td>Venezuela</td>
                                <td>12/8/2020</td>
                                <td>Purple</td>
                            </tr>
                            <tr>
                                <th>7</th>
                                <td>Meghann Durtnal</td>
                                <td>Staff Accountant IV</td>
                                <td>Schuster-Schimmel</td>
                                <td>Philippines</td>
                                <td>2/17/2021</td>
                                <td>Yellow</td>
                            </tr>
                            <tr>
                                <th>8</th>
                                <td>Sammy Seston</td>
                                <td>Accountant I</td>
                                <td>O'Hara, Welch and Keebler</td>
                                <td>Indonesia</td>
                                <td>5/23/2020</td>
                                <td>Crimson</td>
                            </tr>
                            <tr>
                                <th>9</th>
                                <td>Lesya Tinham</td>
                                <td>Safety Technician IV</td>
                                <td>Turner-Kuhlman</td>
                                <td>Philippines</td>
                                <td>2/21/2021</td>
                                <td>Maroon</td>
                            </tr>
                            <tr>
                                <th>10</th>
                                <td>Zaneta Tewkesbury</td>
                                <td>VP Marketing</td>
                                <td>Sauer LLC</td>
                                <td>Chad</td>
                                <td>6/23/2020</td>
                                <td>Green</td>
                            </tr>
                            <tr>
                                <th>11</th>
                                <td>Andy Tipple</td>
                                <td>Librarian</td>
                                <td>Hilpert Group</td>
                                <td>Poland</td>
                                <td>7/9/2020</td>
                                <td>Indigo</td>
                            </tr>
                            <tr>
                                <th>12</th>
                                <td>Sophi Biles</td>
                                <td>Recruiting Manager</td>
                                <td>Gutmann Inc</td>
                                <td>Indonesia</td>
                                <td>2/12/2021</td>
                                <td>Maroon</td>
                            </tr>
                            <tr>
                                <th>13</th>
                                <td>Florida Garces</td>
                                <td>Web Developer IV</td>
                                <td>Gaylord, Pacocha and Baumbach</td>
                                <td>Poland</td>
                                <td>5/31/2020</td>
                                <td>Purple</td>
                            </tr>
                            <tr>
                                <th>14</th>
                                <td>Maribeth Popping</td>
                                <td>Analyst Programmer</td>
                                <td>Deckow-Pouros</td>
                                <td>Portugal</td>
                                <td>4/27/2021</td>
                                <td>Aquamarine</td>
                            </tr>
                            <tr>
                                <th>15</th>
                                <td>Moritz Dryburgh</td>
                                <td>Dental Hygienist</td>
                                <td>Schiller, Cole and Hackett</td>
                                <td>Sri Lanka</td>
                                <td>8/8/2020</td>
                                <td>Crimson</td>
                            </tr>
                            <tr>
                                <th>16</th>
                                <td>Reid Semiras</td>
                                <td>Teacher</td>
                                <td>Sporer, Sipes and Rogahn</td>
                                <td>Poland</td>
                                <td>7/30/2020</td>
                                <td>Green</td>
                            </tr>
                            <tr>
                                <th>17</th>
                                <td>Alec Lethby</td>
                                <td>Teacher</td>
                                <td>Reichel, Glover and Hamill</td>
                                <td>China</td>
                                <td>2/28/2021</td>
                                <td>Khaki</td>
                            </tr>
                            <tr>
                                <th>18</th>
                                <td>Aland Wilber</td>
                                <td>Quality Control Specialist</td>
                                <td>Kshlerin, Rogahn and Swaniawski</td>
                                <td>Czech Republic</td>
                                <td>9/29/2020</td>
                                <td>Purple</td>
                            </tr>
                            <tr>
                                <th>19</th>
                                <td>Teddie Duerden</td>
                                <td>Staff Accountant III</td>
                                <td>Pouros, Ullrich and Windler</td>
                                <td>France</td>
                                <td>10/27/2020</td>
                                <td>Aquamarine</td>
                            </tr>
                            <tr>
                                <th>20</th>
                                <td>Lorelei Blackstone</td>
                                <td>Data Coordiator</td>
                                <td>Witting, Kutch and Greenfelder</td>
                                <td>Kazakhstan</td>
                                <td>6/3/2020</td>
                                <td>Red</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

const MyTransaction = () => {
    return (
        <div>
            <marquee className="text-[#000D50] font-semibold text-[14px]">NOTICE : কোন সমস্যা হলে মেসেঞ্জারে এসএমএস করবেন... আমাদের সেন্ড মানি নাম্বারে যদি কেউ ফোন করে থাকে তাহলে তার টাকা এড করে দেওয়া হবে না এমনকি অর্ডারও কমপ্লিট করে দেওয়া হবে না |</marquee>
            <h1 className="text-2xl font-medium">My Transaction</h1>
        </div>
    );
};

export default UserDash;