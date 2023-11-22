import React, { useEffect, useState } from 'react'
import NavbarRight from '../layouts/navbarRight'
import axios from 'axios'
import { jwtDecode } from "jwt-decode"
import { ReadMoreReadLess } from "react-readmore-and-readless"
import { useNavigate } from 'react-router-dom'
import { FaRegComment, FaRegHeart  } from "react-icons/fa"
import '../../style/nationalggp.css'

export default function Explore() {
    const url = import.meta.env.VITE_REACT_APP_BASE_URL
    const [explore, setExplore] = useState('')
    const [contentCountByUserId, setContentCountByUserId] = useState({})
    const [hrefId, setHrefId] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const jelajahi = async () => {
            try {
                const response = await axios.get(`${url}/content`)
                setExplore(response.data)
            } catch(err) {
                console.log(err)
            }
        }
        jelajahi()
    },[])

    useEffect(() => {
        const countContentByUser = () => {
            const countByUser = {}
            explore &&
                explore.map(content => {
                    const userId = content.user.id
                    countByUser[userId] = (countByUser[userId] || 0) + 1
                })
            setContentCountByUserId(countByUser)
        }
        countContentByUser()
    }, [explore])

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const response = await axios.get(`${url}/token`)
                const decoded = jwtDecode(response.data.accessToken)
                setHrefId(decoded)
            } catch(err) {
                console.log({Error: 'Gagal untuk refresh token'})
            }
        }
        refreshToken()
    },[])

    const handleHref = (userId) => {
        if (hrefId.id === userId) {
            navigate(`/profil`);
        } else {
            navigate(`/userprofil/${userId}`);
        }
    }
    
    return (
        <div>
            <nav>
                <NavbarRight/>
            </nav>
            <main className='w-full pb-5 md:pl-[350px] md:pr-[239px] flex flex-col items-center'>
                {explore && explore.map((content) => (
                    <div className='w-[470px] border-b pb-3 relative' key={content.id}>
                        <div className='flex items-center gap-3 py-3 px-4'>
                            <div className='flex items-center gap-3 py-3 px4 profil-user'>
                                <a onClick={() => handleHref(content.user.id)}>
                                    <img src={`http://localhost:3000/public/profil/${content.user.fotoProfil}`} alt="" className='w-14 h-14 rounded-full object-cover border cursor-pointer'/>
                                </a>
                                <a onClick={() => handleHref(content.user.id)}>
                                    <p className='cursor-pointer'>{content.user.username}</p>
                                </a>
                            </div>
                            <div className={`hover-profil absolute bg-white border w-[80%] top-[90px] p-2 items-start gap-4 left-[50px] rounded-md shadow-xl flex-col`}>
                                <div className='flex items-center gap-3'>
                                    <a onClick={() => handleHref(content.user.id)}>
                                        <img src={`http://localhost:3000/public/profil/${content.user.fotoProfil}`} alt="" className='w-14 h-14 rounded-full object-cover border cursor-pointer'/>
                                    </a>
                                    <div>
                                        <div>
                                            <a onClick={() => handleHref(content.user.id)}>
                                                <p className='cursor-pointer'>{content.user.username}</p>
                                            </a>
                                            <p className='text-sm'>{content.user.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='pl-10 text-center'>
                                    <p className='text-sm'>{contentCountByUserId[content.user.id]} </p>
                                    <p className='text-[13px]'>postingan</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <figure>
                                <img src={`http://localhost:3000/public/content/${content.imageContent}`} alt="" className='w-full max-h-[585px] rounded object-cover border' />
                            </figure>
                            <div className='pt-2 flex gap-3'>
                                <button>
                                    <FaRegHeart size={25}/>
                                </button>
                                <button>
                                    <FaRegComment size={25}/>
                                </button>
                            </div>
                            <div className='py-2 px-2'>
                            <ReadMoreReadLess
                                text={content.ception}
                                readMoreText="lihat lainnya"
                                readLessText="sembunyikan"
                                charLimit={100}
                                readMoreStyle={{
                                    color: "#9ca3af",
                                }}
                                readLessStyle={{
                                    color: "#9ca3af",
                                }}
                            />
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    )
}

