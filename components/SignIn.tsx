'use client';

import React from 'react'
import { Login } from '../app/lib/actions/auth'
const SignIn = () => {
  return (
    <div>
        <button className='cursor-pointer' onClick={()=> Login()}><span >login</span></button>
    </div>
  )
}

export default SignIn
