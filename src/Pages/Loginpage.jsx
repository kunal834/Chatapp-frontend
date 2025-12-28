import React from 'react'
import assets from '../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/Authcontext'


const Loginpage = () => {
  const [currstate, setcurrstate] = useState("Sign Up")
  const [fullname, setfullname] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setbio] = useState("")
  const [isDatasubmittes, setisDatasubmittes] = useState(false)
console.log(isDatasubmittes)

const {login} = useContext(AuthContext);

  const Submithandler = (e) =>{
    e.preventDefault();

    if(currstate === 'Sign Up' && !isDatasubmittes){
      setisDatasubmittes(true);

      return;
    }

    login(currstate==="Sign Up" ?"register" : 'login' , {fullname , email , password , bio});

   


     
    

  }
  return (
   <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl '>
  
  <img src={assets.logo_big} alt="" className='w-60' />

  <form onSubmit={Submithandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
  <h2 className='font-medium text-2xl flex justify-between items-center'> {currstate}
    {isDatasubmittes &&  <img onClick={() => setisDatasubmittes(false)}src={assets.arrow_icon} className="w-5 cursorpointer" alt="" /> }
   
    </h2>

 {currstate === "Sign Up" && !isDatasubmittes && (
   <input type="text" onChange={ (e) => setfullname(e.target.value)} value={fullname} className='p-2 border border-gray-400 rounded-md focus:ring-2 focus:outline-none' placeholder='Full name' required/>
   )}

{
 !isDatasubmittes && (
  <>
    <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className='p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500' placeholder='Email' required/>
  <input  onChange={(e) => setPassword(e.target.value)} value={password} type="password"  className='p-2 border border-gray-400 rounded-md   focus:ring-2 focus:ring-indigo-500' placeholder='Password' required/>
  </>


  
 )
}

{
  currstate === "Sign Up" && isDatasubmittes && (
    <textarea  onChange={(e) => setbio(e.target.value)} value={bio} row={4} className='p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500' placeholder='provide a short bio'></textarea>
  )
}


<button type='submit' className='py-3 bg-purple-400 rounded-md cursor-pointer'>
  {currstate === "Sign Up"? "Create Account" : "Login Now"}

</button>
    
    <div className='flex items-center gap-2 text-gray-500'>
      <input type="checkbox" />
      <p>Agree to terms and conditon</p>
    </div>
    <div className='flex flex-col gap-2'>
     {currstate === "Sign Up" ? (
      <p className='text-sm'> Already have an account ? <span className='font-medium text-violet-500 cursor-pointer' onClick={() => {setcurrstate("login") ; setisDatasubmittes(false)}}> Login here</span></p>
     ) : (
      <p className='text-sm'> Create an account <span onClick={()=> {setcurrstate("Sign Up") ; setisDatasubmittes(false)}}className='font-medium text-violet-500 cursor-pointer'>click here</span></p>
     )}

    </div>
  </form>

   </div>
  )
}

export default Loginpage
