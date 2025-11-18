import { Link, usePage } from '@inertiajs/react'
import React from 'react'

const HomePage = () => {
  const { auth } = usePage().props
  console.log(!auth.user);
  
  return (
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
  )
}

export default HomePage