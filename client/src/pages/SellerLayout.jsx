import React from 'react'
import { assets } from '../assets/assets';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
const SellerLayouts = () => {

  const {setIsSeller,sellerLogout} = useAppContext()
const hnadleLogout = async()=>{
   await sellerLogout()
};

    const sidebarLinks = [
        { name: "Add-Product", path: "/seller", icon: assets.add_icon },
        { name: "product list", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "orders", path: "/seller/orders", icon: assets.order_icon },
        { name: "Messages", path: "/seller/chats", icon: assets.chat },
    ];

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                <Link to={"/"}>
                    <img src={assets.logo} alt="" />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button className='border rounded-full text-sm px-4 py-1' onClick={() => hnadleLogout()} >Logout</button>
                </div>
            </div>
           <div className='flex'>
             <div className="md:w-64 w-16 border-r h-[95wh] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                {sidebarLinks.map((item, index) => (
                    <NavLink to={item.path} key={item.name} end ={item.path = "/seller"}
                        className={({isActive})=>`flex items-center py-3 px-4 gap-3 
                            ${isActive ? "border-r-4 md:border-r-[6px] bg-[#4FBF8B]/10 border-[#4FBF8B] text-[#4FBF8B]"
                                : "hover:bg-gray-100/90 border-white"
                            }`
                        }
                    >
                        <img src={item.icon} alt="" className='w-7 h-7' />
                        <p className="md:block hidden text-center">{item.name}</p>
                    </NavLink>
                ))}
            </div>
            <Outlet/>
           </div>
        </>
    );
};

export default SellerLayouts
