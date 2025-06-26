import React, { useState } from 'react'
import Gogglelogin from './Gogglelogin';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = ({ setshoUserLogin }) => {
    const [state, setState] = React.useState("login");
    const [FromData, setFromData] = useState("")
    const { handleLogin } = useAppContext()

    const handlefromdata = (e) => {
        setFromData({ ...FromData, [e.target.name]: e.target.value })
    }
    const handlesubmitSignin = async (e) => {
        e.preventDefault()
        try {
            await handleLogin(state === "register" ? "Singup" : "Signin", FromData)
            setshoUserLogin(false)
        } catch (error) {
            setshoUserLogin(true)
        }
    }

    return (
        <div onClick={() => setshoUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50 w-full h-screen'>
            <form onClick={(e) => e.stopPropagation()} onSubmit={handlesubmitSignin} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
                <p className="text-2xl font-medium m-auto">
                    <span className="text-[#4FBF8B]">User</span> {state === "login" ? "Login" : "Sign Up"}
                </p>
                {state === "register" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input onChange={handlefromdata} placeholder="type here" name='firstName' className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#4FBF8B]" type="text" required />
                    </div>
                )}
                <div className="w-full ">
                    <p>Email</p>
                    <input onChange={handlefromdata} placeholder="type here" name='email' className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#4FBF8B]" type="email" required />
                </div>
                <div className="w-full ">
                    <p>Password</p>
                    <input onChange={handlefromdata} placeholder="type here" name='password' className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#4FBF8B]" type="password" required />
                </div>
                {state === "register" ? (
                    <p>
                        Already have account? <span onClick={() => setState("login")} className="text-[#4FBF8B] cursor-pointer">click here</span>
                    </p>
                ) : (
                    <p>
                        Create an account? <span onClick={() => setState("register")} className="text-[#4FBF8B] cursor-pointer">click here</span>
                    </p>
                )}
                <button className="bg-[#4FBF8B] transition-all text-white w-full py-2 rounded-md cursor-pointer">
                    {state === "register" ? "Create Account" : "Login"}
                </button>
                <Gogglelogin setshoUserLogin={setshoUserLogin} />
            </form>
        </div>
    )
}

export default Login;
