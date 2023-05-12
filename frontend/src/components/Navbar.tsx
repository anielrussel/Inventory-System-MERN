import React from 'react'
import { FiLogOut } from "react-icons/fi"
import logo from "../assets/logo.png"
import useLogout from '../hooks/useLogout'
import useAuthContext from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar: React.FC = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const handleClick = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className='fixed top-0 w-full flex justify-between items-center px-4 lg:px-16 bg-slate-100 shadow-lg'>
      <div className='flex items-center'>
        <img src={logo} alt='logo' className='w-20' />
        <h1 className='font-Lobster'>Mini Inventory</h1>
      </div>
      <div>
        {user && (
          <div className='flex items-center gap-10'>
            <h1 className='font-Rubik font-bold text-gray-700'>{user.email}</h1>
            <span onClick={handleClick} className='p-2 bg-gray-300 rounded-md cursor-pointer hover:scale-110 ease-in-out duration-300'><FiLogOut size={30} /></span>
          </div>
        )
        }
      </div>
    </nav>
  )
}

export default Navbar