import { createContext, useContext, useEffect } from "react";
import { AuthContext } from "./Authcontext";
import toast from "react-hot-toast";
import { useState } from "react";
export const ChatContext = createContext();



export const ChatProvider = ({children}) =>{
const [Messages, setMessages] = useState([]);// list of messages that will be seen 
const [Users, setUsers] = useState([])  // list of users for left sidebar 
const [SelectedUser, setSelectedUser] = useState(null) // here we wil store the userId of that Particular user we have to talk
const [unseenMessage, setunseenMessage] = useState({})// we will store userId and no. of unseen messages
const {Socket , axios }  = useContext(AuthContext);


// functio to get all user for sidebar 

const Getuser = async() =>{
    try{
        const { data } = await axios.get("/api/message/users");
        
        if(data.success){
            setUsers(data.users);
            setunseenMessage(data.unseenMessage)
        }
        

    }catch(error){

        toast.error(error.message)
        console.log(error.message)

    }
}


// Function to get messages for selected user 
const Getmessagesofuser = async(SelectedUserId) =>{
if (!SelectedUserId) {
        toast.error("No User ID provided, skipping fetch.");
        return; 
    }
    try{    
       
   const {data} = await axios.get(`/api/message/${SelectedUserId}`);
   console.log({data})
   if(data.success){
    setMessages(data.messages)
   }

    }catch(error){
        toast.error(error.message);

    }

}

// function to send messages to selected users
const SendMessages = async(messageData) =>{
    try{
 const { data } = await axios.post(`/api/message/send/${SelectedUser._id}` , messageData)
 if(data.success){
    setMessages((prevMessages) => [...(prevMessages||[]) , data.newmessage] )  // prevmessages showing the present stage of message array tell that add new element at last


 }
 else{
    toast.error(data.message);
 }
    }catch(error){

        toast.error(error.message)

    }
   
}

// function to subcribe to messages for selected user 
// means realtime chatting
const SubcribetoMessage = async() =>{
    if(!Socket)  return;
    Socket.on("newMessage" , (newmessage) =>{
        if(SelectedUser && newmessage.SenderId === SelectedUser._id){
            newmessage.seen =  true;
            setMessages((prevMessages) => [...prevMessages  ,newmessage ]);
          axios.put(`/api/message/mark/${newmessage._id}`);
        }else{
            setunseenMessage((prevUnseenMessages)=>(
                {
                    ...prevUnseenMessages ,[newmessage.SenderId] : prevUnseenMessages[newmessage.SenderId]?
                    prevUnseenMessages[newmessage.SenderId] + 1 : 1

                }
            ))

        }

    })
}

// function unsubcribr from messages
const unsubcribefromMessage = () =>{
    if(Socket) Socket.off("newMessage")
}

useEffect(() =>{
    SubcribetoMessage();

    return (() =>{
        unsubcribefromMessage();
    })

} , [Socket , SelectedUser])
const value = {
    Messages,
    Users,
    Getuser,
    Getmessagesofuser,
    setSelectedUser,
    unseenMessage,
    setunseenMessage,
    SendMessages ,
    SelectedUser

    }
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )

}
