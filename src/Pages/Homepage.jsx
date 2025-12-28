import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import ChatContainer from '../Components/ChatContainer'
import Rightsidebar from '../Components/Rightsidebar'

const Homepage = () => {
  const [selectedUser, setselectedUser] = useState(false)

  return (
    <div className='flex h-screen w-full items-center justify-center p-4 sm:p-10'>
      <div className='bg-gray-900/50 backdrop-blur-xl border border-gray-600 rounded-2xl overflow-hidden w-full h-full flex flex-col md:flex-row'>
        
        {/* Left Sidebar */}
        {/* On mobile: w-full. On Desktop: w-1/4 or w-80 */}
        <div className='w-full md:w-[25%] lg:w-[20%] border-b md:border-b-0 md:border-r border-gray-600'>
          <Sidebar />
        </div>

        {/* Main Chat Area */}
        {/* flex-1 makes it take up all remaining space automatically */}
        <div className='flex-1 bg-transparent'>
          <ChatContainer />
        </div>

        {/* Right Sidebar - Conditionally Rendered */}
        {/* Only shows if selectedUser is true */}
        {selectedUser && (
          <div className='w-full md:w-[25%] lg:w-[20%] border-t md:border-t-0 md:border-l border-gray-600 transition-all duration-300'>
            <Rightsidebar 
              selectedUser={selectedUser} 
              setselectedUser={setselectedUser}
            />
          </div>
        )}

      </div>
    </div>
  )
}

export default Homepage