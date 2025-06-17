"use client";

import React from "react";
import { Logout } from "../app/lib/actions/auth";
import { LogOut } from "lucide-react";

const SignOut = () => {
  return (
    <div>
      <button className="cursor-pointer" onClick={() => Logout()}>
        <span className="max-sm:hidden">Log out</span>
           <LogOut className='size-6 sm:hidden text-red-500'/>
      </button>
    </div>
  );
};

export default SignOut;
