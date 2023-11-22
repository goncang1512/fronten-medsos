import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function Upload() {
    const { id } = useParams();
    const [message, setMessage] = useState('')
    const [preview, setPreview] = useState('')
    const [id_user, setId_user] = useState(id)
    const [ception, setCeption] = useState('')
    const [imageContent, setImageContent] = useState('')
    const url = import.meta.env.VITE_REACT_APP_BASE_URL

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageContent(file);
            setPreview(URL.createObjectURL(file))
        }
    }

    const navigate = useNavigate()
    const handleUpload = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('id_user', id_user)
        formData.append('imageContent', imageContent)
        formData.append('ception', ception)
        try {
            await axios.post(`${url}/content`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            navigate('/profil')
        } catch(err) {
            if(err.response) {
                console.log(err.response.data.message)
                setMessage(err.response.data.message)
            }
        }

    }

    return (
        <div className='flex justify-center items-center h-screen w-screen gap-7'>
            <div className='w-[309px]'>
                <img src={imageContent ? preview : "https://media.istockphoto.com/id/1281169103/id/foto/ungkapan-sneak-peek-muncul-di-balik-kertas-cokelat-robek.webp?b=1&s=170667a&w=0&k=20&c=qPKuSuK6Obfdxxn2wo5OxLJR7gzoNWEQ-eFwLN_eBG8="} alt="" className='w-[309px] h-[309px] object-cover border' />
                <p>{ception}</p>
            </div>

            <form onSubmit={handleUpload} className="border p-8 shadow-xl rounded-lg w-1/4 flex flex-col gap-4" encType="multipart/form-data">
                <p className='text-red-500 text-center'>{message}</p>
                <label  className="gap-2 flex flex-col">
                    Ception:
                    <textarea name="ception" id="ception" cols="30" rows="10" className='border rounded-lg p-2 max-h-[400px] min-h-[42px]' onChange={(e) => setCeption(e.target.value)} required></textarea>
                </label>
                <label className="gap-2 flex flex-col">
                    Content :
                    <input type="file" id="imageContent" placeholder="Masukkan foto profil anda" name="imageContent" className="file-input input-bordered w-full w-full" onChange={handleImageChange} required/>
                </label>
                <div className="flex w-full justify-center">
                    <button type="submit" className="hover:bg-[#f5d252] py-2 bg-[#ffc800] rounded-lg w-1/3">Upload</button>
                </div>
            </form>
        </div>
    )
}
