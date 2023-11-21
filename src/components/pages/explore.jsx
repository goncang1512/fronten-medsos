import React, { useEffect, useState } from 'react'
import NavbarRight from '../layouts/navbarRight'
import axios from 'axios'
import ReadMoreAndLess from 'react-read-more-less'
import '../../style/nationalggp.css'

export default function Explore() {

    const [explore, setExplore] = useState('')

    useEffect(() => {
        const jelajahi = async () => {
            try {
                const response = await axios.get('http://localhost:3000/content')
                setExplore(response.data)
            } catch(err) {
                console.log(err)
            }
        }
        jelajahi()
    },[])

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
                                <a href={`/userprofil/${content.user.id}`}>
                                    <img src={`http://localhost:3000/public/profil/${content.user.fotoProfil}`} alt="" className='w-14 h-14 rounded-full object-cover border cursor-pointer'/>
                                </a>
                                <a href={`/userprofil/${content.user.id}`}>
                                    <p className='cursor-pointer'>{content.user.username}</p>
                                </a>
                            </div>
                            <div className={`hover-profil absolute bg-white border w-[80%] top-[90px] p-2 items-center gap-3 left-[50px] rounded-md shadow-xl`}>
                                <a href={`/userprofil/${content.user.id}`}>
                                    <img src={`http://localhost:3000/public/profil/${content.user.fotoProfil}`} alt="" className='w-14 h-14 rounded-full object-cover border cursor-pointer'/>
                                </a>
                                <div>
                                    <a href={`/userprofil/${content.user.id}`}>
                                        <p className='cursor-pointer'>{content.user.username}</p>
                                    </a>
                                    <p className='text-sm'>{content.user.email}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <figure>
                                <img src={`http://localhost:3000/public/content/${content.imageContent}`} alt="" className='w-full max-h-[585px] rounded object-cover border' />
                            </figure>
                            <div className='py-5 px-2'>
                            <ReadMoreAndLess
                                className="read-more-content"
                                charLimit={100}
                                readMoreText="Lihat lainnya"
                                readLessText=" Sembunyikan"
                            >
                                {content.ception}
                            </ReadMoreAndLess>
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    )
}

