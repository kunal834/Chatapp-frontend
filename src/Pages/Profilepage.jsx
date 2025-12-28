import React from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/Authcontext';

const Profilepage = () => {
  const [selectedimage, setselectedimage] = useState(null)
  const { Authuser , updateprofile } = useContext(AuthContext)
  const navigate = useNavigate();
  const [Name, setName] = useState(Authuser.fullname)
  const [bio, setbio] = useState(Authuser.bio)
  const handlesubmit = async(e) =>{
     e.preventDefault();

     if(!selectedimage){
      await updateprofile({fullname: Name , bio})
     }


     navigate('/')
    const reader = new FileReader();
  
    reader.readAsDataURL(selectedimage);
    reader.onload  = async () =>{
  
      const base64Image = reader.result;
      await updateprofile({profilePic : base64Image , fullname : Name , bio});
  
      
    }
    return;
  }


  return (
    <div className=' min-h-screen bg-cover bg--no-repeat flex items-center justify-center'  >
       <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-400 border-2 border-gray-400 flex items-center justify-between max-sm:flex-col-reverse rounded-lg '>
      
        <form className='flex flex-col gap-5 p-10 flex-1' >

          <h1 className='ml-2'> Profile Details</h1>
 
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'> 
  <input  type="file" id="avatar" accept='.png , .jpg, .jpeg '  onChange={(e) => setselectedimage(e.target.files[0])} hidden/>

          <img src={selectedimage? URL.createObjectURL(selectedimage) : assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedimage && 'rounded-full'}`}/>
          Upload Profile Image 

          </label>
        <input type="text"  placeholder='Your Name' onChange={(e) => setName(e.target.value)}  value={Name} className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' required/>
        <textarea value={bio} id="" onChange={(e) => setbio(e.target.value)} placeholder='Your bi0'  required className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'></textarea>
        <button type='submit' className='py-3 bg-purple-400 rounded-md cursor-pointer text-white' onClick={handlesubmit}>  Save</button>
        </form>
       <img className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedimage && 'rounded-full'}`} src={Authuser?.profilePic || assets.logo_icon} alt="" />
       </div>

    </div>
  )
}

export default Profilepage


