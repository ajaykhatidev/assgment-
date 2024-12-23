"use client"

import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div>
      <div className='w-full h-20 bg-slate-700 p-2 flex justify-between items-center'>
        <div className='flex gap-12'>
          <h1 className='text-3xl text-white font-bold'>Admin page </h1>

          <Link href="/Add">
            <button className='bg-red-500 w-auto p-2 font-bold rounded-lg'>
              Add to Cart
            </button>
          </Link>

          <Link href="/all">
            <button className='bg-red-500 w-auto p-2 font-bold rounded-lg'>
              Main page
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
