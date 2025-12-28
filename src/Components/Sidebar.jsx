import React, { useEffect } from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/Authcontext'
import { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { useState } from 'react'

const Sidebar = ({  }) => {

  const {Messages,
    Users,
    Getuser,
    Getmessagesofuser,
    setSelectedUser,
    unseenMessage,
    setunseenMessage,
    SelectedUser,
    SendMessages} = useContext(ChatContext);


const {logout , OnlineUsers, }  = useContext(AuthContext)
const navigate = useNavigate();
console.log(SelectedUser)
console.log("online user" ,OnlineUsers)
const handlelogout = async() =>{
  logout();
  
}

useEffect(() =>{
   Getuser();
} , [OnlineUsers])

const [input, setinput] = useState("")

const filteredUsers = input? Users.filter((user) => user.fullname.toLowerCase().includes(input.toLowerCase())) : Users;
console.log("filtered users" , filteredUsers)
  return (
    <div className={` h-full p-5 rounded-xl oveflow-y-scroll text-white ${SelectedUser ? "max-md:hidden" : ""} `}>
      <div className='pb-5 '>
        <div className='flex justify-between items-center'> 


          <img src={assets.logo} alt="logo" className='max-w-40' />
          <button  onClick={handlelogout} >  logout </button>
          <div className='relative py-2 group'>
           <img src={assets.menu_icon} alt="" className='max-h-5 cursor pointer' />
           <div className='absolute top-full right-0 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
            <p onClick={() => navigate('/profile')}>Edit Profile</p>
            <hr className="my-1 border-t border-gray-500" />
            <button onClick={handlelogout} className='cursor-pointer text-sm '> logout</button>
           </div>
          </div>
        
        </div>

        <div className='flex items-center gap-2 bg-[#1E1A2B] rounded-md px-3 py-2 mt-6'>
          <img src={assets.search_icon} alt="serach" className='w-3' />
          <input type="text" onChange={(e) =>setinput(e.target.value)} className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8c8] flex-1 ' placeholder='Search user' />
        </div>


        <div className='flex flex-col'>

          {filteredUsers.map((user, index) => {
         const  isOnline = OnlineUsers.includes(String(user._id));
     return (
<div key={index} className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${SelectedUser?._id === user._id && 'bg-[#282142]/50'}`} onClick={() => {setSelectedUser(user) }} >
        <img src={user?.profilePic || assets.avatar_icon} alt="" className='w-[35px] aspect-squarerounded-full'/>
        <div className='flex flex-col leading-5'>
          <p>{user?.fullname|| "username"}</p>
          { 
        isOnline?
            <span className='text-green-300 text-xs'> online </span> : <span className='text-gray-400 text-xs'>offline</span>
          }

        </div>

        {
          unseenMessage[user._id] > 0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center rounded-full bg-violet-600'> 
          {unseenMessage[user._id] }
          </p>
        }

        </div>
          
     )
      
          
})
          
          }


        </div>

      </div>
    </div>
  )
}

export default Sidebar
