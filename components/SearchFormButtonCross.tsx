'use client'
import React from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'


const SearchFormButtonCross = () => {
    const reset = () => {
        const form = document.querySelector('#search_form') as HTMLFormElement;
        if(form) form.reset()
    }
  return (
    <div>
         <button type='reset' onClick={reset}>
            <Link href='/' className='size-[50px] rounded-full bg-black flex justify-center items-center text-white'> <X className='size-5'/> </Link>
         </button>
    </div>
  )
}

export default SearchFormButtonCross
