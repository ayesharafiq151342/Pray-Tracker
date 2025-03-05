'use client'
import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import PrayerTrackerProfile from './PrayerTrackerProfile'

function page() {
  return (
   <><div className=' bg-darkGreen'>

   <Navbar/>
   <section
      className="w-full lg:h-[600] h-96 flex flex-col items-center justify-center bg-cover bg-center text-center px-4"
      style={{ backgroundImage: `linear-gradient(rgba(4, 50, 50, 0.75) , rgba(4, 50, 50, 0.75)), url('/masjid.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <h1 className="lg:text-3xl sm:text-4xl  mt-20  lg:mt-0 md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
        Welcome to Siratul Salah
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl mb-6">
        Manage your prayers with us
      </p>
      {/* <Link href='/' >
        <Button text="Show more" variant="primary" className="shadow-lg" />
      </Link> */}


    </section>
<PrayerTrackerProfile/>
   <Footer/>

   </div>

   </>
  )
}

export default page
