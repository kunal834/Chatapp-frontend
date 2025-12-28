import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import axios from "axios"
import { LogOut } from "lucide-react";
import { useContext } from 'react';
import { AuthContext } from '../../context/Authcontext';

const Rightsidebar = ({ selectedUser}) => {
const { logout } = useContext(AuthContext)
  const handlelogout = async() =>{
     
    logout()

  }

  return selectedUser && (
    <div className={`bg-[#342a3f] text-white w-full relative overflow-y-scroll ${selectedUser ? "max-md:hidden" : " "}`}>
      <div className='pt-16 flex flex-col items-center gap-2  tex-xs font-light '>
        <img src={selectedUser?.profilePic || assets.avatar_icon} className="w-20 aspect-square rounded-full" alt="" />
        <h1 className='px-10 text-white text-xl font-medium mx-auto flex items-center gap-2'> 
          <p className='w-2 bg-green-500 h-2 rounded-full'></p>
          {selectedUser.fullName}
           
        </h1>
        <p className='px-10 mx-auto text-white'> {selectedUser.bio}</p>
      </div>
      <hr className='border-[#ffffff50] my-4' />

<div className='px-5 text-xl'>
  <p className='text-center'> Media</p>

      <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80 p-4'>
        {imagesDummyData.map((url,index) => (
          <div key={index} onClick={() => window.open(url)} className='cursor-pointer rounded'> 
          <img src={url} alt="" className='h-full rounded-md'/>
          </div>  
        ))
        }

      </div>

</div>
<button className="
    absolute bottom-5 left-1/2 transform -translate-x-1/2 
    flex items-center gap-2
    bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 
    text-white font-semibold py-3 px-8 rounded-full 
    shadow-lg shadow-purple-500/50 
    hover:shadow-purple-500/80 hover:scale-105 
    transition-all duration-300 ease-in-out
    cursor-pointer z-50
"   onClick={handlelogout}>
    <LogOut size={18} />
    
    Logout
</button>
    </div>
  )
}

export default Rightsidebar
