import React, { useState } from 'react'
import NavbarRight from '../layouts/navbarRight'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import '../../style/nationalggp.css'

export default function Setting() {
    const url = import.meta.env.VITE_REACT_APP_BASE_URL
    const {id} = useParams()
    const navigate = useNavigate()

    const handleDeleteAkun = async () => {
        try {
            const confirmation = window.confirm("Anda yakin ingin hapus akun?")
            if (confirmation) {
                await axios.delete(`${url}/user/${id}`)
                navigate('/')
            } else {
                navigate('/profil')
            }
        } catch(err) {
            console.log(err)
        }
    }

    const logout = async () => {
        try {
            const confirmed = window.confirm("Anda yakin ingin hapus akun?");
            if (confirmed) {
                await axios.delete(`${url}/logout`)
                navigate('/explore')
            } else {
                navigate("/profil")
            }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
                <nav>
                    <NavbarRight/>
                </nav>
                <main className='w-full py-10 pl-[350px] pr-[239px] flex gap-5'>
                    <button onClick={handleDeleteAkun} className="cursor-pointer bg-red-500 py-2 px-5 rounded-full text-white font-bold text-center hover:bg-red-700">Delete akun</button>
                    <button className="cursor-pointer bg-red-500 w-32 py-2 px-5 rounded-full text-white font-bold text-center hover:bg-red-700" onClick={logout}>Log Out</button>
                </main>
        </div>
    )
}
