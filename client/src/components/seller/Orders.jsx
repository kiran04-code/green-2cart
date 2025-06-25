import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import { assets, dummyOrders } from '../../assets/assets';
import toast from 'react-hot-toast';
const Orderss = () => {
    const {currancy,axios} = useAppContext()
    const [orders,setOrders] = useState([])

const fetchOrders = async()=>{
     try {
            const {data} = await axios.get("/api/getorder/admin/seller",{withCredentials:true})
            if(data.success){
                setOrders(data.orderdata)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
}
useEffect(()=>{
  fetchOrders()
},[])
console.log(orders)
    return (
        <div className="md:p-10 p-4 space-y-4">
            <h2 className="text-lg font-medium">Orders List</h2>
            {orders.map((order, index) => (
                <div key={index} className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800">
                    <div className="flex gap-5">
                        <img className="w-12 h-12 object-cover opacity-60" src={assets.box_icon} alt="boxIcon" />
                        <>
                            {order.items.map((item, index) => (
                                <div key={index} className="flex flex-col justify-center">
                                    <p className="font-medium">
                                        {item.product.name} <span className={`text-indigo-500 ${item.quantity < 2 && "hidden"}`}>x{item.quantity}</span>
                                    </p>
                                </div>
                            ))}
                        </>
                    </div>

                    <div className="text-sm">
                        <p className='font-medium mb-1'>{order.address.firstName} {order.address.lastName}</p>
                        <p>{order.address.street}, {order.address.city}, {order.address.state},{order.address.zipcode}, {order.address.country}</p>
                    </div>

                    <p className="font-medium text-base my-auto text-black/70">{currancy}{order.amount}</p>

                    <div className="flex flex-col text-sm">
                        <p>Method: {order.paymentType}</p>
                        <p>Date: {new Date(order.createdAt).toDateString() }</p>
                        <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                        <input type="checkbox" className="sr-only peer" />
                        
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Orderss
//Cannot populate path `items.Product` because it is not in your schema. 
// Set the `strictPopulate` option to false to override.