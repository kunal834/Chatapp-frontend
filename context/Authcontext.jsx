import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import axios from "axios";


const backendUrl = 'http://localhost:5000';


axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true; 

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
 
    const [Authuser, setAuthuser] = useState(null);
    const [OnlineUsers, setOnlineUsers] = useState([]);
    const [Socket, setSocket] = useState(null);
    const [isCheckAuth, setisCheckAuth] = useState(true)


    
useEffect(() => {
        console.log("Online Users Updated:", OnlineUsers);
    }, [OnlineUsers]);

    const checkAuth = async () => {
        try {
      
            const { data } = await axios.get("/api/users/check");
            console.log("Auth data" , data)
            
            if (data.success) {
                setAuthuser(data.user);
                connectSocket(data.user);
            }
        } catch (error) {
            console.log("User is not authenticated (Normal for first load)");
            setAuthuser(null);
        }finally{
            setisCheckAuth(false);
        }
    }

    const login = async (state, credentials) => {
        try {
           
            const { data } = await axios.post(`/api/users/${state}`, credentials);
            
            if(state == "register"){
          if (data.success) {
                setAuthuser(data.newuser);
                 toast.success(data.message); 
             
            } else {
                toast.error(data.message);
            }   connectSocket(data.newuser);
            
            }else{
                if (data.success) {
                setAuthuser(data.newuser);
                 toast.success(data.message); 
             
            } else {
                toast.error(data.newuser);
            }   connectSocket(data.newuser);
            
            }
           
        } catch (error) {
           
            toast.error(error.response?.data?.message || error.message);
        }
    }

    const logout = async () => {
        try {
            const result = await axios.get('/api/users/logout');
            if (result.data.success) {
                toast.success("Logout Successfully");
                setAuthuser(null);
                setOnlineUsers([]);
                if (Socket) {
                    Socket.disconnect();
                    setSocket(null); // Important to clear the socket state
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const updateprofile = async (body) => {
        try {
            const { data } = await axios.put('/api/users/update', body);
            if (data.success) {
                setAuthuser(data.user);
                toast.success("Profile updated successfully");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const connectSocket = (userData) => {
      if (!userData || (Socket && Socket.connected)) return;
        console.log("user Data" , userData)
        const newSocket = io(backendUrl, {
            query: {
                userId: userData._id
            }
        });

        newSocket.connect();
        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (userIds) => {
            setOnlineUsers(userIds);
            console.log("online users" , OnlineUsers)
        });
    }

    useEffect(() => {
        checkAuth();
    
        return () => {
            if(Socket) Socket.disconnect();
        }
    }, []);

const value = {
        axios,
        Authuser,
        OnlineUsers,
        Socket,
        isCheckAuth,
        login,
        logout,
        updateprofile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

