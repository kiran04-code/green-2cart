import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const { user, setUser, setshoUserLogin ,setsearchQuery,searchQuery,cartItems,getCartCount,logout} = useAppContext()

    const navigate = useNavigate()
    const logouts = async () => {
        await logout()
        navigate("/")
    }
   useEffect(()=>{
     if(searchQuery.length>0){
        navigate("/products")
     }
   },[navigate,searchQuery])
    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to="/"  onClick={()=>setOpen(false)}>
                <img className="h-9" src={assets.logo} alt="LOGO" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8 l">
                <div className=' hidden  border-2 border-gray-400 rounded-full  text-[12px] md:flex md:items-center md:justify-between gap-2 md:px-3 md:py-1.5  '>
                   <NavLink to ="/seller" > <p >Seller Dashbord</p></NavLink>
                   <img src={assets.primum} alt="" className='w-4 h-4' />
                </div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">All Products</NavLink>
                {
                    user && <NavLink to="/My-orders" onClick={() => setOpen(false)}>My orders</NavLink>
                }
                <NavLink to="/contact" >Contact</NavLink>
                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" onChange={(e)=>setsearchQuery(e.target.value)} value = {searchQuery} />
                    <img src={assets.search_icon} alt="search_icon" className='w-4 h-4' />
                </div>

                <div onClick={()=>navigate("/cart")} className="relative cursor-pointer">
                    <img src={assets.cart_icon} alt="cart_icon" className='w-5 h-5' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-[#4FBF8B] w-[18px] h-[18px] rounded-full">{getCartCount()} </button>
                </div>

                {
                    !user ? (<button onClick={() => setshoUserLogin(true)} className="cursor-pointer px-6 py-2  bg-[#4FBF8B] hover:bg-[#44ae7c] transition text-white rounded-full text-sm">
                        Login
                    </button>) : (<div className='ralative group'>
                        <img src={assets.profile_icon} alt="" className='w-10' />
                        <ul className="hidden group-hover:block absolute top-14 right-24 bg-white shadow border border-gray-200 py-2.5 w-32 rounded-md text-sm z-40">
                            <li onClick={()=>navigate("/My-orders")} className="px-4 py-2 hover:bg-[#44ae7c] cursor-pointer hover:text-white">My orders</li>
                            <li onClick={logout} className="px-4 py-2 hover:bg-[#44ae7c] cursor-pointer text-red-500">Logout</li>
                        </ul>

                    </div>)
                }

            </div>
           <div className='md:hidden  flex items-center gap-6'>
             <div onClick={()=>navigate("/cart")} className="relative cursor-pointer">
                    <img src={assets.cart_icon} alt="cart_icon" className='w-5 h-5' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-[#4FBF8B] w-[18px] h-[18px] rounded-full">{getCartCount()} </button>
                </div>
           </div>
            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <img src={assets.menu_icon} alt="" className='h-5 w-5' />
            </button>

            {/* Mobile Menu */}
            {
                open && (
                    <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-10`}>
                        <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                        <NavLink to="/products" onClick={() => setOpen(false)} >All Products</NavLink>
                        {
                            user && <NavLink to="/contact" onClick={() => setOpen(false)}>My orders</NavLink>
                        }
                        <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
                        {
                            !user ? <button onClick={() => { setOpen(false); setshoUserLogin(true) }} className="cursor-pointer px-6 py-2  bg-[#4FBF8B] hover:bg-[#44ae7c] transition text-white rounded-full text-sm">
                                Login
                            </button> : <button onClick={() => { setOpen(false); logouts() }} className="cursor-pointer px-6 py-2  bg-[#4FBF8B] hover:bg-[#44ae7c] transition text-white rounded-full text-sm">
                                Logout
                            </button>
                        }

                    </div>
                )
            }

        </nav>
    )
}

export default Navbar
