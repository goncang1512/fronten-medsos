import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GoHome } from "react-icons/go"
import { MdOutlineExplore } from "react-icons/md"
import { IoChatbubbleOutline } from "react-icons/io5"
import { FaRegUser } from "react-icons/fa"


export default function NavbarRight() {
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        refreshToken()
    }, [])

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:3000/token')
            if (response.status !== 401) {
                setAuth(true)
            } else {
                setAuth(false)
            }
        } catch(err) {
            console.log(err)
            setAuth(false)
        }
    }

    return (
        <div className='fixed border-r md:flex hidden flex-col flex-2 w-56 h-screen bg-white'>
            <div className='pt-10 pl-10 text-2xl font-bold'>Goncang Medsos</div>
            <ul className='w-full flex flex-col items-start h-full justify-evenly font-medium pl-10'>
                <li><a href="/" className='flex items-center gap-2'> <GoHome size={"25"}/> Home</a></li>
                <li><a href="/explore" className='flex items-center gap-2'> <MdOutlineExplore size={"25"}/>Jelajahi</a></li>
                {auth ? (
                    <>
                        <li><a href="/chat" className='flex items-center gap-2'> <IoChatbubbleOutline size={"25"}/> Chat</a></li>
                        <li><a href="/profil" className='flex items-center gap-2'> <FaRegUser size={"25"}/>Profil</a></li>
                    </>) : (
                    <div className='flex gap-3'>
                        <li><a href="/login" className='bg-green-400 py-2 px-3 rounded-lg'>login</a></li>
                        <li><a href="/register" className='bg-blue-400 py-2 px-3 rounded-lg'>register</a></li>
                    </div>
                    )
                }
            </ul>
        </div>
    )
}
