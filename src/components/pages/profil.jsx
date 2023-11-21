import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import NavbarRight from '../layouts/navbarRight'
import { IoCloseSharp } from "react-icons/io5"
import { IoMdSettings } from "react-icons/io"
import { GoPlus } from "react-icons/go"

export default function profil() {
    const [user, setUser] = useState('')
    const [token, setToken] = useState('')
    const [expire, setExpire] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        refreshToken()
    }, [])

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:3000/token')
            setToken(response.data.accessToken)
            const decoded = jwtDecode(response.data.accessToken)
            setUser(decoded)
            setExpire(decoded.exp)
        } catch(err) {
            navigate('/explore')
        }
    }

    const axiosJWT = axios.create()
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date()
        if(expire * 1000 < currentDate.getTime()){
            const response = await axios.get('http://localhost:3000/token')
            config.headers.Authorization = `Bearer ${response.data.accessToken}`
            setToken(response.data.accessToken)
            const decoded = jwtDecode(response.data.accessToken)
            setUser(decoded)
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
            <main>
                <div className='w-full py-10 pl-[350px] pr-[239px]'>
                    <div className='flex items-center pb-[200px] gap-24 justify-start border-b pl-32 relative'>
                        <img src={`${user.url}`} alt="" className='w-48 h-48 rounded-full object-cover border'/>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-5 text-center'>
                                <h1 className='text-xl font-normal'>{user.username}</h1>
                                <div className='flex gap-2 items-center text-center'>
                                    <a href={`/editprofil/${user.id}`} className='bg-gray-200 py-1 px-3 rounded-lg font-medium hover:bg-gray-300'>Edit profil</a>
                                    <a href={`/setting/${user.id}`} className='bg-gray-200 py-1 px-1 rounded-full font-medium hover:bg-gray-300'><IoMdSettings size={"20"}/></a>
                                </div>
                            </div>
                            <p className='text-md'>{user.email}</p>
                        </div>
                        <div className='absolute bottom-5 left-0 text-center flex flex-col gap-2 items-center justify-center'>
                            <a href={`/upload/${user.id}`} className="cursor-pointer bg-gray-100 w-20 h-20 rounded-full font-bold items-center justify-center flex border"><GoPlus size={"70"} style={{ color: '#d1d5db' }}/></a>
                            <p>upload</p>
                        </div>
                    </div>
                    <MyContent userId={user.id} />
                </div>
            </main>
        </div>
    )
}

const MyContent = ({userId}) => {
    const [myContent, setMyContent] = useState([])
    const [selectedContent, setSelectedContent] = useState([])

    const fetchMyContent = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/content`)
            const filteredContent = response.data.filter(content => content.id_user === userId)
            setMyContent(filteredContent)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchMyContent();
    }, [userId])

    const handleModal = (content) => {
        setSelectedContent(content)
        document.getElementById('my_modal_3').showModal()
    }

    return (
        <div className='flex flex-wrap gap-[0.6px] pt-5'>
            {myContent.map((content) => (
            <div key={content.id}>
                <img src={`${content.url}`} alt={content.user.username} className='w-[309px] h-[309px] object-cover border cursor-pointer' onClick={()=> handleModal(content) }/>
            </div>
            ))}
            <ShowContent selectedContent={selectedContent} fetchMyContent={fetchMyContent}/>
        </div>
    )
}

const ShowContent = ({selectedContent, fetchMyContent}) => {

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/content/${selectedContent.id}`)
            fetchMyContent()
            document.getElementById('my_modal_3').close();
        } catch (err) {
            console.log(err);
        }
    }
    
    const closeModal = () => {
        document.getElementById('my_modal_3').close()
    }

    return (
        <>
            <dialog id="my_modal_3" className="modal" style={{backgroundColor: "rgba(0, 0, 0, 0.7)"}}>
                <form>
                    <a className="cursor-pointer text-3xl flex items-center justify-center border-0 absolute right-0 text-2xl m-5 text-white" onClick={closeModal}><IoCloseSharp/></a>
                </form>
                <main className='flex items-center justify-center h-screen w-screen px-[200px] py-[100px]'>
                    <div className='w-full h-full'>
                        <img src={`${selectedContent.url}`} alt="" className='w-full h-full object-cover'/>
                    </div>
                    <div className='w-1/2 bg-white h-full p-5 flex flex-col justify-between'>
                        <p>{selectedContent.ception}</p>
                        <ul className='flex gap-5 w-full justify-end'>
                            <li className='btn btn-error'><a onClick={handleDelete}>Delete</a></li>
                            <li className='btn btn-info'><a href={`/editcontent/${selectedContent.id}`}>Edit</a></li>
                        </ul>
                    </div>
                </main>
            </dialog>
        </>
    )
}