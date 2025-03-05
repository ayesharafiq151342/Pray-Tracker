'use client'
import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import PrayerTracker from './pray'

function page() {
  return (
   <><div className='bg-darkGreen'>
   
   <Navbar/>
<PrayerTracker/>
 <Footer/>

   </div>

   </>
  )
}

export default page
