import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'

export default function Register() {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confPassword: '',
        fotoProfil: null
    })

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setData({
            ...data,
            fotoProfil: selectedImage
        })
    }

    const [message, setMessage] = useState('')
    const [seeConfPassword, setConfSeePassword] = useState(false)
    const [seePassword, setSeePassword] = useState(false)

    const navigate = useNavigate()
    const handleRegister = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('username', data.username)
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('confPassword', data.confPassword)
        formData.append('fotoProfil', data.fotoProfil)
        try {
            await axios.post("http://localhost:3000/user", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            navigate('/login')
        } catch(err) {
            if(err.response) {
                console.log(err.response.data.message)
                setMessage(err.response.data.message)
            }
        }
    }

    return (
        <div className='flex justify-center items-center w-screen h-screen '>
            <form onSubmit={handleRegister} className="border p-8 shadow-xl rounded-lg w-1/4 flex flex-col gap-4" encType="multipart/form-data">
                <p className='text-red-500 text-center'>{message}</p>
                <label  className="gap-2 flex flex-col">
                    Username :
                    <input type="text" id="username" placeholder="Username" name="username" className="input input-bordered w-full w-full" value={data.username} onChange={(e) => setData({...data, username: e.target.value})} required/>
                </label>
                <label  className="gap-2 flex flex-col">
                    Email :
                    <input type="email" id="email" placeholder="Email" name="email" className="input input-bordered w-full w-full" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} required/>
                </label>
                <label className="gap-2 flex flex-col relative">
                    Password :
                    <input type={seePassword ?  "text" : "password"} id="password" placeholder="Password" name="password" className="input input-bordered w-full w-full" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} required/>
                    <a onClick={() => setSeePassword(!seePassword)} className='absolute right-3 top-12 cursor-pointer'>
                        {seePassword ? <AiOutlineEye size='20'/>  : <AiOutlineEyeInvisible size='20'/> }
                    </a>
                </label>
                <label className="gap-2 flex flex-col relative">
                    Confrim Password :
                    <input type={seeConfPassword ?  "text" : "password"} id="confPassword" placeholder="Confirm Password" name="confPassword" className="input input-bordered w-full w-full" value={data.confPassword} onChange={(e) => setData({...data, confPassword: e.target.value})} required/>
                    <a onClick={() => setConfSeePassword(!seeConfPassword)} className='absolute right-3 top-12 cursor-pointer'>
                        {seeConfPassword ? <AiOutlineEye size='20'/>  : <AiOutlineEyeInvisible size='20'/> }
                    </a>
                </label>
                <label className="gap-2 flex flex-col">
                    Foto Profil :
                    <input type="file" id="fotoProfil" placeholder="Masukkan foto profil anda" name="fotoProfil" className="file-input input-bordered w-full w-full" onChange={handleImageChange}/>
                </label>
                <div className="flex w-full justify-center gap-3">
                    <button type="submit" className="hover:bg-[#f5d252] py-2 bg-[#ffc800] rounded-lg w-1/3">Registrasi</button>
                    <a href='/login' type="submit" className=" text-center hover:bg-slate-300 py-2 bg-slate-200 rounded-lg px-3">Login</a>
                </div>
            </form>
        </div>
    )
}
