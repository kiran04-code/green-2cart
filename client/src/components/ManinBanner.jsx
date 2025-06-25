import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const ManinBanner = () => {
  return (
    <div className='relative '>
      <img src={assets.main_banner_bg} alt="banner" className='w-full hidden md:block' />
      <img src={assets.main_banner_bg_sm} alt="banner" className='w-full  md:hidden' />
      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-24'>
        <h1 className="text-3xl md:text-5xl lg:text-[52px] font-bold text-center md:text-left max-w-[18rem] md:max-w-[20rem] lg:max-w-[26rem] leading-tight lg:leading-[3.5rem]">
          Freshness You Can Trust, <span className="text-[#4FBF8B]">Savings</span> You will Love!
        </h1>


        <div className='flex items-center mt-6 font-medium'>
          <Link to={"/products"} className='group flex items-center gap-2 px-9  md:px-9 py-3 bg-[#4FBF8B] hover:bg-[#44ae7c] transition rounded text-white cursor-pointer'>
            Shop Now
            <img className='md:hidden  transition group-focus:translate-x-1:' src={assets.white_arrow_icon} alt="arrow" />
          </Link>

          <Link to={"/products"} className='group hidden  items-center md:flex md:px-9 gap-2  py-3  cursor-pointer'>
            Explore deals
            <img className=' transition group-focus:translate-x-1:' src={assets.black_arrow_icon} alt="arrow" />
          </Link>
        </div>
      </div >
    </div>
  )
}

export default ManinBanner
