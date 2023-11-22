import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import NavbarRight from '../layouts/navbarRight'

export default function chat() {
    const url = import.meta.env.VITE_REACT_APP_BASE_URL
    const [expire, setExpire] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        refreshToken()
    }, [])

    const refreshToken = async () => {
        try {
            const response = await axios.get(`${url}/token`)
            const decoded = jwtDecode(response.data.accessToken)
            setExpire(decoded.exp)
        } catch(err) {
            navigate('/explore')
        }
    }

    const axiosJWT = axios.create()
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date()
        if(expire * 1000 < currentDate.getTime()){
            const response = await axios.get(`${url}/token`)
            config.headers.Authorization = `Bearer ${response.data.accessToken}`
            const decoded = jwtDecode(response.data.accessToken)
            setExpire(decoded.exp)
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    })

    return (
        <div>
            <nav>
                <NavbarRight/>
            </nav>
            <main className='w-full py-10 pl-[350px] pr-[239px]'>
                <p>new chat</p>
            </main>
        </div>
    )
}
