import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
  return (
    <div className='relative mt-24'>
      <img src={assets.bottom_banner_image} alt=""  className='w-full hidden md:block '/>
      <img src={assets.bottom_banner_image_sm} alt="" className='md:hidden w-full ' />
      <div className='absolute inset-0 flex flex-col  items-center md:items-end px-2 md:justify-center pt-16 md:pt-10 md:pr-24'>
        <div className='md:bg-[#def3e9]  md:px-10 md:py-8  rounded-2xl py-2'>
            <h1 className='text-2xl md:text-3xl font-semibold text-[#4FBF8B] mb-7 '>Why We Are the Best?</h1>
            {features.map((items,index)=>
            <div className=' flex gap-4 items-center py-1 '>
                <img src={items.icon} alt= {items.title} className='md:w-11 w-8'/>
              <div>  <h3 className='text-lg md:text-xl font-semibold text-gray-600'>{items.title}</h3>
                <p className='text-gray-500/70 text-xs md:text-sm'>{items.description}</p> </div>
            </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default BottomBanner
