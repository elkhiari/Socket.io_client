import React ,{ useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authContext } from '../contexts/AuthContxt'

function Login() {
    const [error, setError] = React.useState<string>("");
    const { login } = useContext(authContext);
    const Navigate = useNavigate();
    const loginForm = async(e : any)=> {
        e.preventDefault();
        const username = e.target.username.value;
        try {
            await axios.get(`${process.env.REACT_APP_API}/users/${username}`);
            login(username);
            Navigate("/");
        }
        catch (err) {
            console.log(err);
        }
    }

  return (
    <div className='container max-w-2xl mx-auto '>
        <div className='mx-auto'>
            <div className='flex justify-center items-center h-screen'>
                <div className='w-full max-w-md'>
                    <form className='bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4' onSubmit={loginForm}>
                        <div className='text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4'>
                            Chat App
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                                Username
                            </label>
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='username' type='text' placeholder='Username' />
                        </div>
                        {/* <div className='mb-6'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'> 
                                Password
                            </label>
                            <input className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' id='password' type='password' placeholder='******************' />
                            <p className='text-red-500 text-xs italic'>Please choose a password.</p>
                        </div> */}
                        <div className='flex items-center justify-between'>
                            <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                                Connection
                            </button>
                        </div>
                    </form>
                    <p className='text-center text-gray-500 text-xs'>
                        &copy;2023 Elkhiari. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login