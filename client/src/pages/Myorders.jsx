import React, { useEffect, useState } from 'react'
import { dummyOrders } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
const Myorders = () => {
    const { axios, user } = useAppContext()
    const [Myorders, setMyOrders] = useState([])
    const navigate = useNavigate()
    const fetchmyOrders = async () => {
        try {
            const { data } = await axios.get("/api/getorder/user", { withCredentials: true })
            if (data.success) {
                setMyOrders(data.orderdata)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (user) {
            fetchmyOrders()
        }
    }, [user])
    return (
        <div className='mt-16 pb-16 flex flex-col justify-center '>
            <div>
                <p className='text-2xl md:text-3xl text-gray-500'>My <span className=' text-[#4FBF8B]'>ORDERS</span> </p>
                <div className='w-15 mt-1 h-0.5 bg-[#4FBF8B]'></div>
            </div>
            {
                Myorders.map((orders, index) => (
                    <div key={index} className='border border-gary-300 rounded-lg mb-10 p-4 py-5 max-w-4xl mt-10 justify-center flex flex-col'>
                        <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
                            <span> OrderId: {orders._id} </span>
                            <span>  PayMent: {orders.paymentType} </span>
                            <span>  Total Ammount : ₹{orders.amount} </span>

                        </p>
                        {orders.items.map((order, index) => (
                            <div className={` relative bg-white text-gray-500/70 ${orders.items.length !== index + 1 && "border-b"} border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 nd:gap-16 w-full max-w-4xl`}>
                                <div className='flex items-center mb-4 md:mb-0'>
                                    <div className='bg-[#ddebe4] p-4 rounded-lg mt-5 ' onClick={() => { navigate(`/products/${order.product.category.toLowerCase()}/${order.product._id}`); scrollTo(0, 0) }}>
                                        <img src={order.product.image[0]} alt="" className='w-16 h-16' />
                                    </div>
                                    <div className='ml-5'>
                                        <h2 className='text-xl font-medium text-gray-800 '>Name:{order.product.name}</h2>
                                        <p>Categeory:{order.product.category}</p>
                                    </div>
                                </div>
                                <div className=' text-[#4FBF8B] text-lg font-medium'>
                                    <p>quantity:{order.quantity}</p>
                                    <p>Status:{orders.status}</p>
                                    <p>Date:{new Date(orders.createdAt).toDateString()}</p>
                                </div>
                                <p className='text-[#4FBF8B] text-lg font-medium'>
                                    Amount:₹{order.product.offerPrice * order.quantity}
                                </p>

                            </div>
                        ))}
                        <div class="flex flex-col md:flex-row  md:items-center items-center md:justify-between justify-center space-y-2 md:space-y-0 md:space-x-2.5 border border-[#4FBF8B] rounded-full bg-gray-500/10 p-3 text-sm text-gray-800">


                            <div class="flex items-center space-x-1 bg-white border border-[#4FBF8B] rounded-2xl px-3 py-1">
                                <svg width="16" height="17" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.725 4.8 9 9.008 16.275 4.8M9 17.4V9m7.5 3.333V5.667a1.67 1.67 0 0 0-.833-1.442L9.833.892a1.67 1.67 0 0 0-1.666 0L2.333 4.225A1.67 1.67 0 0 0 1.5 5.667v6.666a1.67 1.67 0 0 0 .833 1.442l5.834 3.333a1.67 1.67 0 0 0 1.666 0l5.834-3.333a1.67 1.67 0 0 0 .833-1.442" stroke="#1F2937" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p>Your Order</p>
                            </div>


                            <p class="text-center md:text-left px-2">Track your order and stay updated!</p>

                            <button onClick={() => navigate("/chat")} class="self-start md:self-auto md:flex md:justify-center md:py-1 md:px-3  px-1 py-2 ml-8 rounded-2xl bg-[#25704d] text-white text-sm">
                                Send Message to Shop
                            </button>
                        </div>

                    </div>
                ))
            }

        </div>
    )
}

export default Myorders
