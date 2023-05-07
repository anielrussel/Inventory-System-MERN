import React from 'react'
import { FiLogOut } from "react-icons/fi"
import logo from "../assets/logo.png"

const Navbar: React.FC = () => {
  return (
    <nav className='fixed top-0 w-full flex justify-between items-center px-4 lg:px-16 bg-slate-100 shadow-lg'>
        <div className='flex items-center'>
            <img src={logo} alt='logo' className='w-20'/>
            <h1 className='font-Lobster'>Mini Inventory</h1>
        </div>
        <div>
            <FiLogOut size={30}/>
        </div>
    </nav>
  )
}

export default Navbar