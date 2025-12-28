import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import Homepage from './Pages/Homepage.jsx'
import Loginpage from './Pages/Loginpage.jsx'
import Profilepage from './Pages/Profilepage.jsx'
import { useContext } from 'react'
import { Loader } from  "lucide-react"
import { AuthContext } from '../context/Authcontext.jsx'


const App = () => {
  const{ Authuser , isCheckAuth }  = useContext(AuthContext)
  console.log(Authuser)
  // console.log(isCheckAuth)    
  
  if(isCheckAuth ){
    return (
   <div className="flex items-center justify-center h-screen bg-black">
            <Loader className="size-10 animate-spin text-white" />
        </div>
    )
  }
  return (
     
    <div className="bg-[url('/bgImage.svg')] bg-contain">
      <Toaster/>
   
      <Routes>


        <Route path='/' element={Authuser ? <Homepage /> : <Navigate to="/login"/> } />

        <Route path='/login' element={!Authuser?<Loginpage /> : <Navigate to="/"/> } />
        <Route path='/profile' element={Authuser ? <Profilepage /> : <Navigate to="/login"/>} /> 
        
      </Routes> 
    </div>
  )
}

export default App
