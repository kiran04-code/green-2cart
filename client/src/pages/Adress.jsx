import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
// inputField components
const InputFeild = ({type,placeholder,handlechnage,adress,name})=>{
    return(
        <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outlin-none text-gray-500 focus:border-[#4FBF8B] transition' type={type} placeholder={placeholder} onChange={handlechnage} name={name} value = {adress[name]}/>
    )
}


const Adress = () => {
  const naviagte = useNavigate()
  const {axios,user} = useAppContext()
    const [adress ,setadress] = useState({
 firstName:"",
 lastName:"",
 email:"",
 street:"",
 city:"",
 state:"",
 pincode:"",
 country:"",
 phone:""
})
const handlechnage = (e)=>{
    const {name, value } = e.target
    setadress((prevadress)=>({...prevadress,[name]:value}))
}
const handlsubmit = async(e)=>{
e.preventDefault()
 try {
  const {data} = await axios.post("/api/Address/add",{adress},{withCredentials:true})
  if(data.success){
    toast.success(data.message)
    naviagte("/cart")
  }
  else{
    toast.error(data.message)
  }
 } catch (error) {
  console.log(error)
  toast.error(error.message)
 }
}
useEffect(()=>{
  if(!user){
    naviagte("/cart")
    // toast.error("Login to buy Product")
  }
},[])
  return (
    <div className='mt-12 pb-12'>
      <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-[#4FBF8B]'>Adress</span> </p>
      <div className='w-15 mt-1 h-0.5 bg-[#4FBF8B]'></div>
      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
      <form action="" onSubmit={handlsubmit} className='space-y-3 mt-6 text-sm'>

       <div className='grid grid-cols-2 gap-4'>
        <InputFeild placeholder="First Name" type="text" name="firstName"  adress={adress}  handlechnage={handlechnage}/>
        <InputFeild placeholder="Last Name" type="text" name="lastName" adress={adress} handlechnage={handlechnage}/>
       </div>
        <InputFeild placeholder="Email Adress" type="email" name="email"  adress={adress}  handlechnage={handlechnage}/>
        <InputFeild placeholder="street" type="text" name="street"  adress={adress}  handlechnage={handlechnage}/>
        <div className='grid grid-cols-2 gap-4'>
        <InputFeild placeholder="City" type="text" name="city"  adress={adress}  handlechnage={handlechnage}/>
        <InputFeild placeholder="state" type="text" name="state" adress={adress} handlechnage={handlechnage}/>
       </div>
       <div className='grid grid-cols-2 gap-4'>
        <InputFeild placeholder="pincode" type="text" name="pincode"  adress={adress}  handlechnage={handlechnage}/>
        <InputFeild placeholder="country" type="tel" name="country" adress={adress} handlechnage={handlechnage}/>
       </div>
       <InputFeild placeholder="phone" type="tel" name="phone"  adress={adress}  handlechnage={handlechnage}/>
        <button type='submit' className='w-full mt-6 bg-[#4FBF8B] text-white py-3 hover:bg-[4FBF8B] cursor-pointer uppercase '>Save Adrees</button>
      </form>
        </div>
        <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="" />
      </div>
     
    </div>
  )
}

export default Adress
