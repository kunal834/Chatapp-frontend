import React, { useRef, useEffect, useContext, useState } from 'react';
import assets from '../assets/assets'; 
import { formattime } from '../lib/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/Authcontext';
import toast from 'react-hot-toast';

const ChatContainer = () => {
  const {
    Messages,
    Getmessagesofuser,
    setSelectedUser,
    SelectedUser,
    SendMessages
  } = useContext(ChatContext);

  const { Authuser, OnlineUsers } = useContext(AuthContext);
  const scrollEnd = useRef();
  const [input, setinput] = useState("");

  // Handling sending message
  const handleSendmessage = async (e) => {
    if (e) e.preventDefault(); 
    if (input.trim() === "") return null;

    await SendMessages({ text: input.trim() });
    setinput("");
  };

  // Handling sending a image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await SendMessages({ image: reader.result });
    };

    reader.readAsDataURL(file);
    e.target.value = ""; 
  };

  useEffect(() => {
    if (SelectedUser) {
      Getmessagesofuser(SelectedUser._id);
    }
  }, [SelectedUser]);

  useEffect(() => {
    if (scrollEnd.current && Messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [Messages]);

  if (!SelectedUser) {
    return (
      <div className='w-full h-full flex flex-col justify-center items-center gap-5 text-white'>
        <img src={assets.logo_icon} alt="chat icon" className='max-w-40 opacity-50' />
        <p className='text-gray-400'>Select a user to start chat</p>
      </div>
    );
  }

  return (
    // 1. UPDATED MAIN CONTAINER: 
    // - Changed h-full to h-[100dvh] (Dynamic Viewport Height) for mobile.
    // - Added md:h-full so it fits the layout on desktop.
    <div className='flex flex-col h-dvh md:h-full w-full overflow-hidden relative backdrop-blur-lg'>
      
      {/* 2. HEADER */}
      <div className='flex-none flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={SelectedUser.profilePic || assets.profile_martin} alt="photo" className='w-8 rounded-full' />
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          {SelectedUser.fullname}
          {OnlineUsers.includes(SelectedUser._id) && (
             <span className='w-2 rounded-full bg-green-500 h-2'></span>
          )}
        </p>

        <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className='max-w-7 cursor-pointer' />
        <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5' />
      </div>

      {/* 3. CHAT AREA: 
           - overflow-y-auto enables scrolling.
           - no-scrollbar (optional) hides the bar but keeps functionality.
           - Added touch-action-manipulation for better mobile response.
      */}
      <div className='flex-1 overflow-y-auto p-4 flex flex-col gap-4 w-full'>
        {Messages?.map((msg, index) => (
          <div 
            key={index} 
            className={`flex items-end gap-2 ${msg.SenderId === Authuser._id ? 'justify-end' : 'justify-start'}`}
          >
            {/* Receiver Avatar */}
            {msg.SenderId !== Authuser._id && (
               <div className='flex flex-col items-center gap-1'>
                 <img src={SelectedUser?.profilePic || assets.profile_icon} alt="" className='w-7 h-7 rounded-full object-cover' />
                 <p className='text-[10px] text-gray-400'>{formattime(msg.createdAt)}</p>
               </div>
            )}

            {/* Message Bubble */}
            <div className={`max-w-[70%] ${msg.SenderId === Authuser._id ? 'order-1' : 'order-2'}`}>
              {msg.image ? (
                <img src={msg.image} alt="attachment" className='max-w-[200px] border border-gray-700 rounded-lg' />
              ) : (
                <div
                  className={`p-3 rounded-2xl text-sm font-light wrap-break-words text-white
                    ${msg.SenderId === Authuser._id 
                      ? 'bg-[#898AC4] rounded-br-none' 
                      : 'bg-gray-700 rounded-bl-none'
                    }`}
                >
                  {msg.text}
                </div>
              )}
            </div>

            {/* Sender Avatar */}
            {msg.SenderId === Authuser._id && (
               <div className='flex flex-col items-center gap-1'>
                  <img src={Authuser.profilePic || assets.profile_icon} alt="" className='w-7 h-7 rounded-full object-cover' />
                  <p className='text-[10px] text-gray-400'>{formattime(msg.createdAt)}</p>
               </div>
            )}
          </div>
        ))}
        <div ref={scrollEnd} />
      </div>

      {/* 4. INPUT AREA */}
      <div className='flex-none p-4 w-full mb-1'> {/* Added mb-1 for small safe area */}
        <div className='flex items-center gap-3'>
          <div className='flex-1 flex items-center bg-gray-800/50 px-4 py-3 rounded-full border border-gray-700'>
            <input
              value={input}
              onChange={(e) => setinput(e.target.value)}
              type="text"
              className='flex-1 bg-transparent text-sm outline-none text-white placeholder-gray-400'
              placeholder='Send message...'
              onKeyDown={(e) => e.key === "Enter" ? handleSendmessage(e) : null}
            />
            
            <input 
              onChange={handleSendImage} 
              type="file" 
              id='image' 
              accept='image/png, image/jpg, image/jpeg' 
              hidden 
            />
            <label htmlFor="image">
              <img src={assets.gallery_icon} alt="" className='w-5 hover:scale-110 transition-transform cursor-pointer opacity-80 hover:opacity-100' />
            </label>
          </div>

          <button onClick={handleSendmessage} className='p-3 bg-[#898AC4] rounded-full hover:bg-[#7273a8] transition-colors'>
             <img src={assets.send_button} alt="" className='w-5 invert brightness-0' />
          </button>
        </div>
      </div>

    </div>
  );
};

export default ChatContainer;