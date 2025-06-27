import React, { useEffect, useState, useCallback } from "react";
import { assets } from "../assets/assets"
import { useAppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"
import { dummyAddress } from "../assets/assets"

import toast from "react-hot-toast";
const Cart = () => {

    const [showAddress, setShowAddress] = React.useState(false)
    const navigate = useNavigate()
    const { axios, currancy, cartItems, user, setCartItems, removeFromCrt, updateCardItems, addTocart, product, getCartCount, getCartTotalAmmount } = useAppContext();
    const [cartArrays, setCartArrays] = useState([])
    const [Adress, setAdress] = useState([])
    const [seltectedAdress, setSelectedAdress] = useState(null)
    const [PayMentOption, setPymentOption] = useState("COD")
    const getCart = useCallback(() => {
        let tempArry = [];
        for (const key in cartItems) {
            const products = product.find((item) => item._id === key);
            if (products) {
                products.quantity = cartItems[key];
                tempArry.push(products);
            }
        }
        setCartArrays(tempArry);
    }, [cartItems, product]);

    useEffect(() => {
        if (product.length > 0 && cartItems) {
            getCart()
        }
    }, [getCart, cartItems, product])

const amount = getCartTotalAmmount() + getCartTotalAmmount() * 2 / 100
    const handlegetAdress = async () => {
        try {
            const { data } = await axios.get("/api/Address/get", { withCredentials: true })
            if (data.success) {
                setAdress(data.address)
                if (data.address.length > 0) {
                    setSelectedAdress(data.address[0])
                }
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const placeorder = async () => {
        try {
            if (!seltectedAdress) {
                toast.error("Please Slecte the  Address")
            }
            // place order with COD 
            if (PayMentOption === "COD") {
                try {
                    const { data } = await axios.post("/api/placeorders", {
                        address: seltectedAdress._id,
                        items: cartArrays.map(item => ({ product: item._id, quantity: item.quantity }))
                    }, { withCredentials: true })
                    if (data.success) {
                        setCartItems([])
                        toast.success(data.message)
                        navigate("/My-orders")
                    }
                } catch (error) {
                    toast.error(error.message)
                    console.log(error)
                }
            }
            else {
                try {
                    const { data: key } = await axios("/api/getkey")
                    const { data: { order } } = await axios.post("/api/paymentonline",{amount})
                    const options = {
                        key: key.key, // Replace with your Razorpay key_id
                        amount: order.amount, // Amount is in paise
                        currency: 'INR',
                        name: 'kiran rathod',
                        description: 'Test Transaction',
                        order_id: order.id,
                        handler: async function (response) {
                            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                            const payload = {
                                razorpay_payment_id,
                                razorpay_order_id,
                                razorpay_signature,
                                 userId:user._id,
                                address: seltectedAdress._id,
                                items: cartArrays.map(item => ({ product: item._id, quantity: item.quantity }))
                            };
                         const {data} =   await axios.post("https://bakend02.onrender.com/api/payment-success", payload);
                         if(data.success){
                            toast.success(data.message)
                            navigate("/My-orders")
                         }
                        },
                        prefill: {
                            name: user.firstName,
                            email: user.email,
                            contact: '7774025744'
                        },
                        theme: {
                            color: '#4FBF8B'
                        }
                    };
                    const rzp = new window.Razorpay(options);
                    rzp.open();
                    ;
                } catch (error) {
                   console.log(error)
                }
            }


        } catch (error) {
        console.log(error)
        }
    }
    useEffect(() => {
        if (user) {
            handlegetAdress()
        }
    }, [user])
    return (
        product.length > 0 && Object.keys(cartItems).length > 0 ? (
            <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
                <div className='flex-1 max-w-4xl'>
                    <h1 className="text-3xl font-medium mb-6">
                        Shopping Cart <span className="text-sm text-[#4FBF8B]">{getCartCount()} Items</span>
                    </h1>

                    <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                        <p className="text-left">Product Details</p>
                        <p className="text-center">Subtotal</p>
                        <p className="text-center">Action</p>
                    </div>

                    {cartArrays.map((product, index) => (
                        <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                            <div className="flex items-center md:gap-6 gap-3">
                                <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded" onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0) }}>
                                    <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                                </div>
                                <div>
                                    <p className="hidden md:block font-semibold">{product.name}</p>
                                    <div className="font-normal text-gray-500/70">
                                        <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                        <div className='flex items-center'>
                                            <p>Qty:</p>
                                            <select onChange={(e) => updateCardItems(product._id, Number(e.target.value))} className='outline-none' value={cartItems[product._id]}>
                                                {Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9).fill('').map((_, index) => (
                                                    <option key={index} value={index + 1}>{index + 1}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center">₹{product.offerPrice * product.quantity}</p>
                            <button className="cursor-pointer mx-auto" onClick={() => removeFromCrt(product._id)}>
                                <img src={assets.remove_icon} alt="" className="inline-block h-6 w-6" />
                            </button>
                        </div>)
                    )}

                    <button className="group cursor-pointer flex items-center mt-8 gap-2 text-[#4FBF8B] font-medium" onClick={() => navigate("/products")}>

                        <img src={assets.arrow_right_icon_colored} alt="" />
                        Continue Shopping
                    </button>

                </div>

                <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                    <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                    <hr className="border-gray-300 my-5" />

                    <div className="mb-6">
                        <p className="text-sm font-medium uppercase">Delivery Address</p>
                        <div className="relative flex justify-between items-start mt-2">
                            <p className="text-gray-500">{seltectedAdress ? `${seltectedAdress.street},${seltectedAdress.country},${seltectedAdress.state} ${seltectedAdress.city}` : `No  adress Found`}  </p>
                            <button onClick={() => setShowAddress(!showAddress)} className="text-[#4FBF8B] hover:underline cursor-pointer">
                                Change
                            </button>
                            {showAddress && (
                                <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                    {Adress.map((adress, index) => (<div className="flex gap-1">

                                        <p onClick={() => { setSelectedAdress(adress); setShowAddress(false) }} className="text-gray-500 p-2 hover:bg-gray-100 ">

                                            <div className="flex  gap-1">
                                                <p><strong>Street:</strong> {adress.street}</p>
                                                <p><strong>Country:</strong> {adress.country}</p>
                                                <p><strong>State:</strong> {adress.state}</p>
                                                <p><strong>Pincode:</strong> {adress.pincode}</p>
                                            </div>
                                        </p>
                                    </div>
                                    ))}
                                    <p onClick={() => navigate("/Add-Adress")} className="text-[#4FBF8B] text-center cursor-pointer p-2 hover:bg-[#4FBF8B]/10">
                                        Add address
                                    </p>
                                </div>
                            )}
                        </div>

                        <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                        <select onChange={(e) => setPymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                            <option value="COD">Cash On Delivery</option>
                            <option value="Online">Online Payment</option>
                        </select>
                    </div>

                    <hr className="border-gray-300" />

                    <div className="text-gray-500 mt-4 space-y-2">
                        <p className="flex justify-between">
                            <span>Price</span><span>₹{getCartTotalAmmount()}</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Shipping Fee</span><span className="text-green-600">Free</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Tax (2%)</span><span>₹{getCartTotalAmmount() * 2 / 100}</span>
                        </p>
                        <p className="flex justify-between text-lg font-medium mt-3">
                        
                            <span>Total Amount:</span><span>₹{getCartTotalAmmount() + getCartTotalAmmount() * 2 / 100}</span>
                        </p>
                    </div>

                    <button onClick={placeorder} className="w-full py-3 mt-6 cursor-pointer bg-[#4FBF8B] text-white font-medium transition">
                        {
                            PayMentOption === "COD" ? "Place Order" : "process to CheckOut"
                        }
                    </button>
                </div>
            </div>
        ) : (
            <p className="text-center text-gray-600  text-2xl mt-35">No Items in cart</p>
        )
    );
}
export default Cart