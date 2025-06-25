import React from 'react'
import Navbar from '../components/navbar'
import ManinBanner from '../components/ManinBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import Deals from '../components/Deals'
import Fotter from '../components/Fotter'

const Homepage = () => {
  return (
    <div>
      <ManinBanner/>
      <Categories/>
      <BestSeller/>
      <BottomBanner/>
      <Deals/>
    </div>
  )
}

export default Homepage
