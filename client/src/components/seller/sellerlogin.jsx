import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Sellerlogin = () => {
  const navigate = useNavigate(); // ✅ FIXED typo
  const { isSeller, setIsSeller,sellerLogin,axios } = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isSeller) {
      navigate('/seller'); // ✅ FIXED typo
    }
  }, [isSeller, navigate]);
const handlesubmitloginseller = async(e)=>{
  try {
      e.preventDefault()
    await sellerLogin({email,password})
    setIsSeller(true)
  } catch (error) {
    console.log(error)
    setIsSeller(false)
  }
}
  return (
    !isSeller && (
     <div className=''>
        <div className='flex justify-center items-center min-h-screen bg-gray-50'>
         <form onSubmit={handlesubmitloginseller} className= "  bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_15px_25px] shadow-black/10">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login as <span className='text-[#4FBF8B]'> Seller</span></h2>
         
        <input
          className="w-full border mt-1 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="w-full border mt-1 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full mb-3 bg-[#4FBF8B] hover:bg-[#63a184] transition-all active:scale-95 py-2.5 rounded text-white font-medium"

        >
          Log In
        </button>

        <p className="text-center mt-4">
          Don't have an account?{' '}
          <a href="#" className="text-blue-500 underline">
            Sign Up
          </a>
        </p>
      </form>
      </div>
     </div>
    )
  );
};

export default Sellerlogin;
