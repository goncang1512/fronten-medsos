import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'

export default function Login() {
    const navigate = useNavigate()
    const [seePassword, setSeePassword] = useState(false)
    const [message, setMessage] = useState('')
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:3000/login", data)
            navigate('/profil')
        } catch(err) {
            if(err.response) {
                console.log(err.response.data.message)
                setMessage(err.response.data.message)
            }
        }
    }

    return (
        <div className='flex justify-center items-center w-screen h-screen bg-'>
            <form onSubmit={handleLogin} className="glass border p-8 shadow-xl rounded-lg w-1/4 flex flex-col gap-4">
                <p className='text-red-500 text-center'>{message}</p>
                <label  className="gap-2 flex flex-col">
                    Email :
                    <input type="email" id="email" placeholder="Email" name="email" className="input input-bordered w-full w-full" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} required/>
                </label>
                <label className="gap-2 flex flex-col relative">
                    Password :
                    <input type={seePassword ? "text" : "password"} id="password" placeholder="Password" name="password" className="input input-bordered w-full w-full " value={data.password} onChange={(e) => setData({...data, password: e.target.value})} required/>
                    <a onClick={() => setSeePassword(!seePassword)} className='absolute right-3 top-12 cursor-pointer'>
                        {seePassword ? <AiOutlineEye size='20'/>  : <AiOutlineEyeInvisible size='20'/> }
                    </a>
                </label>
                <div className="flex gap-3 w-full justify-center">
                    <button type="submit" className="hover:bg-[#f5d252] py-2 bg-[#ffc800] rounded-lg w-1/3">Login</button>
                    <a href='/register' type="submit" className=" text-center hover:bg-slate-300 py-2 bg-slate-200 rounded-lg px-3">Register</a>
                </div>
            </form>
        </div>
    )
}
