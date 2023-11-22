import React from 'react'
import NavbarRight from '../layouts/navbarRight'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5"


export default function UserProfil() {
    const url = import.meta.env.VITE_REACT_APP_BASE_URL
    const { id } = useParams()
    const [userData, setUserData] = useState('')

    useEffect(() => {
        userProfil()
    },[])

    const userProfil = async () => {
        try {
            const response = await axios.get(`${url}/user/${id}`)
            setUserData(response.data.getUser)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <nav>
                <NavbarRight/>
            </nav>
            <main>
                <div className='w-full py-10 pl-[350px] pr-[239px]'>
                    <div className='flex items-center pb-[190px] gap-24 justify-start border-b pl-32 relative'>
                        <img src={userData.url} alt="" className='w-48 h-48 rounded-full object-cover border'/>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-5 text-center'>
                                <h1 className='text-xl font-normal'>{userData.username}</h1>
                            </div>
                            <p className='text-md'>{userData.email}</p>
                        </div>
                    </div>
                <UserContent userId={userData.id} url={url}/>
                </div>
            </main>
        </div>
    )
}

const UserContent = ({userId, url}) => {
    const [userConten, setUserContent] = useState('')
    const [selectedContent, setSelectedContent] = useState([])

    useEffect(() => {
        contentUser()
    },[userId])

    const contentUser = async () => {
        try {
            const response = await axios.get(`${url}/content`)
            const filteredContent = response.data.filter(content => content.id_user === userId)
            console.log(filteredContent)
            setUserContent(filteredContent)
        } catch(err) {
            console.log(err)
        }
    }

    const handleModal = (content) => {
        setSelectedContent(content)
        document.getElementById('my_modal_3').showModal()
    }

    return (
        <div className='flex flex-wrap gap-[0.6px] pt-5'>
            {userConten && userConten.map((content) => (
            <div key={content.id}>
                <img src={`${content.url}`} alt={content.user.username} className='w-[309px] h-[309px] object-cover border cursor-pointer' onClick={()=> handleModal(content) }/>
            </div>
            ))}
            <ShowContent selectedContent={selectedContent}/>
        </div>
    )
}


const ShowContent = ({selectedContent}) => {
    const closeModal = () => {
        document.getElementById('my_modal_3').close()
    }

    return (
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
                </div>
            </main>
        </dialog>
    )
}