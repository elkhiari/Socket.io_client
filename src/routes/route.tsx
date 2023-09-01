import React , {useContext} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/login'
import Messages from '../pages/messages'
import {authContext} from '../contexts/AuthContxt'

function Routing() {
    const {username} = useContext(authContext);
    // const Navigate = useNavigate();
  return (
    <div>
        <Routes>
            <Route path="/login" element={!username?<Login />:<Navigate to={"/"} />} />
            <Route path="/" element={username?<Messages />:<Navigate to={"/login"} />} />
        </Routes>
    </div>
  )
}

export default Routing