import React , {useEffect, useState, useRef} from 'react'
import { io } from 'socket.io-client';
import { useContext } from 'react';
import { authContext } from '../contexts/AuthContxt';
import { BiLogOutCircle } from 'react-icons/bi';
import { IoSendSharp } from 'react-icons/io5';
import MessagesData from '../components/messages';
import UsersLogin from '../components/users';
import Audio from '../components/audio';

const socket = io("http://localhost:3001");

function Messages() {
    const {username} = useContext(authContext);
    const [text,setText] = useState<string>("")
    const [messages,setMessages] = useState<any[]>([])
    const [users,setUsers] = useState<any[]>([])
    const audRef = useRef<any>(null);
    
    useEffect(() => {
        socket.emit("join", {username});
        return () => {
            socket.off("join");
        }
    }, [])

    useEffect(() => {
        socket.on("users", (data) => {
            setUsers(data);
        });

        return () => {
            socket.off("users");
        }
    },[])


    useEffect(() => {
        socket.on("message", (data) => {
            setMessages((messages) => [...messages, data]);
            // audRef.current.play();
        });

        return () => {
            socket.off("message");
        }
    }, [])

    useEffect(() => {
        socket.on("messages", (data) => {
            setMessages(data);
        });

        return () => {
            socket.off("messages");
        }
    }, [])

    const handleClick = () => {
            socket.emit("send_message", {username, text });
            setText("");
            setMessages((messages) => [...messages, { username, text }]);
    }

    const handleEnter = (e : any) => {
        if (e.key === "Enter" && text) {
            handleClick();
        }
    }
    useEffect(() => {
        document.addEventListener("keydown", handleEnter);
        return () => {
            document.removeEventListener("keydown", handleEnter);
        }
    }, [text])
  return (
    <div className='flex p-10 justify-center h-screen  relative space-x-2'>
        <div className="w-1/4 bg-slate-100 rounded-l-lg relative">
            <div className='w-full py-4 px-2 h-14  bg-slate-300 font-black text-xl rounded-tl-lg'>
                Users <span className="text-green-600">online</span> List
            </div>
            <div className="relative  h-[calc(100%-3.5rem)] mb-0">
            <div className="  h-[90%] relative">
                {
                    users && <UsersLogin username={username} users={users} /> 
                }
            </div>
            <button className="w-full h-14 absolute bottom-0 rounded-bl-lg px-6 space-x-4 bg-slate-300 hover:bg-slate-400 duration-150 flex place-items-center" >
                    <div className=' text-2xl font-black rounded-full text-green-600  flex place-items-center place-content-center'>
                        <BiLogOutCircle />
                    </div> <span className="font-black">Logout</span>
                </button>
        </div>
        </div>
        <div className="w-3/4 bg-gray-200 h-full rounded-r-lg relative border-l-4 border-green-600">
            <div className='w-full h-14 px-6 space-x-4 bg-slate-300  rounded-tr-lg flex place-items-center'>
                    <div className='w-8 h-8  p-2 font-black rounded-full text-white bg-green-600 flex place-items-center place-content-center'>
                        G
                    </div> <span className="text-green-600 font-black">Global Chat</span>
            </div>
            <div className='relative  h-[calc(100%-3.5rem)] mb-0 '>
                <div className='h-full relative'>
                    {
                        messages && <MessagesData username={username} messages={messages} />

                    }
                </div>
                <div className='w-full h-14 absolute bottom-0 rounded-br-lg px-6 space-x-4 bg-slate-300  duration-150 flex place-items-center'>
                    <input type="text" value={text} onChange={(e)=>setText(e.target.value)} className="w-full h-full bg-transparent outline-none " placeholder="Type your message here" />
                    <button type='button' onClick={handleClick}  className={`w-8 h-8 duration-200 font-black rounded ${text?"bg-green-600 hover:bg-green-800 cursor-pointer  text-white":"text-gray-400 cursor-not-allowed"}  flex place-items-center place-content-center`}>
                        <IoSendSharp />
                    </button>
                </div>
            </div>
        </div>
        {/* <audio ref={audRef} src={require('../components/audio.wav')} /> */}
    </div>
  )
}

export default Messages