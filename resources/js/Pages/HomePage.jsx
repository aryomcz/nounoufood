import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, usePage } from '@inertiajs/react'
import React from 'react'
import HeroCarousel from './HomePage/Carousel';
import Produk from './HomePage/Produk';

export default function HomePage(props) {
  const { auth } = usePage().props
  console.log(props);
  
  return (
    <GuestLayout>
      <Head title={"Home"} />
    <div className='flex justify-between'>
      HomePage
      {!auth.user ?
       <Link href={route('login')} className='text-orange-500'>
          Login
        </Link>
      :
       <Link href={route('logout')} method="post" as="button" className='text-orange-500'>
          Logout
        </Link>
      }
    </div>
    <div className='bg-primary-60 w-full'>
      <HeroCarousel />
      <Produk />
    </div>
    </GuestLayout>
  )
}
