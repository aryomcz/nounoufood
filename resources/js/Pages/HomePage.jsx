import GuestLayout from '@/Layouts/GuestLayout';
import { Head} from '@inertiajs/react'
import React from 'react'
import HeroCarousel from './HomePage/Carousel';
import Produk from './HomePage/Produk';
import Toko from './HomePage/Toko';
import FAQ from './HomePage/FAQ';
import Testimoni from './HomePage/Testimoni';
import Company from './HomePage/Company';
import PromoModal from './HomePage/PromoModal';
import Saran from './HomePage/Saran';

export default function HomePage(props) {

  return (
    <GuestLayout>
      <Head title={"Home"} />
      <PromoModal promos={props?.promo}/>
      <div className='bg-tertiary-80 w-full'>
      <HeroCarousel />
      <div className='w-full px-4 sm:px-6 xl:px-24'>
      <Produk produk={props?.produk}/>
      <Company company={props?.company} />
      <Toko toko={props?.toko}/>
      <Testimoni testi={props?.testi}/>
      <Saran canGiveAdvice={props?.canGiveAdvice} currentSaran={props?.currentSaran} maxSaran={props?.maxSaran} />
      <FAQ faq={props?.faq}/>
      </div>
    </div>
    </GuestLayout>
  )
}
