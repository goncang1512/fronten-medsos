import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'


export default function EditProfil() {
    const url = import.meta.env.VITE_REACT_APP_BASE_URL
    const { id } = useParams()
    const [message, setMessage] = useState('')
    const [seePassword, setSeePassword] = useState(false)
    const [seeConfPassword, setSeeConfPassword] = useState(false)
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [fotoProfil, setFotoProfil] = useState('')

    const [preview, setPreview] = useState('')

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFotoProfil(file)
        setPreview(URL.createObjectURL(file))
    }

    const updateUser = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('username', username)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('confPassword', confPassword)
        formData.append('fotoProfil', fotoProfil)
        try {
            const confirmation = window.confirm("Anda yakin ingin edit akun?")
            if (confirmation) {
                await axios.patch(`${url}/user/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                navigate('/profil')
            } else {
                navigate('/profil')
            }
        } catch(err) {
            if(err.response) {
                console.log(err.response.data.message)
                setMessage(err.response.data.message)
            }
        }
    }

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(`${url}/user/${id}`)
                const resData = response.data.getUser
                setUsername(resData.username)
                setEmail(resData.email)
                setPreview(resData.url)
                console.log(resData)
            } catch(err) {
                console.error(err);
            }
        }
        getUserById()
    },[id])

    return (
        <div className='flex flex-col justify-center items-center h-screen w-screen'>
            <div className='flex justify-center items-center w-screen h-screen gap-5'>
                <img src={preview} alt="" className='w-96 h-96 object-cover border'/>
                <form onSubmit={updateUser} className="border p-8 shadow-xl rounded-lg w-1/4 flex flex-col gap-4" encType="multipart/form-data">
                    <p className='text-red-500 text-center'>{message}</p>
                    <label  className="gap-2 flex flex-col">
                        Username :
                        <input type="text" id="username" placeholder="Username" name="username" className="input input-bordered w-full w-full" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label  className="gap-2 flex flex-col">
                        Email :
                        <input type="email" id="email" placeholder="Email" name="email" className="input input-bordered w-full w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label className="gap-2 flex flex-col relative">
                        New Password :
                        <input type={seePassword ?  "text" : "password"} id="password" placeholder="Password" name="password" className="input input-bordered w-full w-full" onChange={(e) => setPassword(e.target.value)}/>
                        <a onClick={() => setSeePassword(!seePassword)} className='absolute right-3 top-12 cursor-pointer'>
                            {seePassword ? <AiOutlineEye size='20'/>  : <AiOutlineEyeInvisible size='20'/> }
                        </a>
                    </label>
                    <label className="gap-2 flex flex-col relative">
                    Confrim Password :
                    <input type={seeConfPassword ?  "text" : "password"} id="confPassword" placeholder="Confirm Password" name="confPassword" className="input input-bordered w-full w-full" onChange={(e) => setConfPassword( e.target.value)} />
                    <a onClick={() => setSeeConfPassword(!seeConfPassword)} className='absolute right-3 top-12 cursor-pointer'>
                        {seeConfPassword ? <AiOutlineEye size='20'/>  : <AiOutlineEyeInvisible size='20'/> }
                    </a>
                    </label>
                    <label className="gap-2 flex flex-col">
                        Foto Profil :
                        <input type="file" id="fotoProfil" placeholder="Masukkan foto profil anda" name="fotoProfil" className="file-input input-bordered w-full w-full" onChange={handleImageChange}/>
                    </label>
                    <div className="flex w-full justify-center">
                        <button type="submit" className="hover:bg-[#f5d252] py-2 bg-[#ffc800] rounded-lg w-1/3">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
