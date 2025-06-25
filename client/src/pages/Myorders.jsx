import React, { useEffect, useState } from 'react'
import { dummyOrders } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
const Myorders = () => {
 const {axios,user} = useAppContext()
    const [Myorders, setMyOrders] = useState([])
  const navigate = useNavigate()
    const fetchmyOrders = async () => {
        try {
            const {data} = await axios.get("/api/getorder/user",{withCredentials:true})
            if(data.success){
                setMyOrders(data.orderdata)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(() => {
      if(user){
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
                        {orders.items.map((order,index)=>(
                         <div className={` relative bg-white text-gray-500/70 ${orders.items.length!== index+1 && "border-b"} border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 nd:gap-16 w-full max-w-4xl`}>
                            <div className='flex items-center mb-4 md:mb-0'>
                                <div className='bg-[#ddebe4] p-4 rounded-lg mt-5 ' onClick={()=>{navigate(`/products/${order.product.category.toLowerCase()}/${order.product._id}`);scrollTo(0,0)}}>
                                <img src={order.product.image[0]} alt="" className='w-16 h-16' />
                            </div>
                            <div className='ml-5'>
                                <h2 className='text-xl font-medium text-gray-800 '>Name:{order.product.name}</h2>
                                <p>Categeory:{order.product.category}</p>
                                </div>
                            </div>
                            <div className=' text-[#4FBF8B] text-lg font-medium'>
                                <p>quantity:{order.quantity }</p>
                                <p>Status:{orders.status }</p>
                                <p>Date:{new Date (orders.createdAt).toDateString() }</p>
                            </div>
                            <p className='text-[#4FBF8B] text-lg font-medium'>
                                    Amount:₹{order.product.offerPrice *order.quantity}
                            </p>

                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}

export default Myorders
