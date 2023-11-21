import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function EditContent() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [message, setMessage] = useState('')
    const [preview, setPreview] = useState('')
    const [ception, setCeption] = useState('')
    const [imageContent, setImageContent] = useState('')

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageContent(file);
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleUpdateContent = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('imageContent', imageContent)
        formData.append('ception', ception)
        try {
            const confirmation = window.confirm("Anda yakin ingin edit content?");
            if(confirmation) {
                await axios.patch(`http://localhost:3000/content/${id}`, formData, {
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
        const getContentById = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/content/${id}`)
                console.log(response.data)
                const contentData = response.data
                setCeption(contentData.ception)
                setPreview(contentData.url)
            } catch (err) {
                console.log(err.message)
            }
        }
        getContentById()
    },[id])

    return (
        <div className='flex justify-center items-center h-screen w-screen gap-7'>
            <div className='w-[309px]'>
                <img src={ preview } />
                <p>{ception}</p>
            </div>

            <form onSubmit={handleUpdateContent} className="border p-8 shadow-xl rounded-lg w-1/4 flex flex-col gap-4" encType="multipart/form-data">
                <p className='text-red-500 text-center'>{message}</p>
                <label  className="gap-2 flex flex-col">
                    Ception:
                    <textarea name="ception" id="ception" cols="30" rows="10" className='border rounded-lg p-2' onChange={(e) => setCeption(e.target.value)} value={ception} required></textarea>
                </label>
                <label className="gap-2 flex flex-col">
                    Content :
                    <input type="file" id="imageContent" placeholder="Masukkan foto profil anda" name="imageContent" className="file-input input-bordered w-full w-full" onChange={handleImageChange}/>
                </label>
                <div className="flex w-full justify-center">
                    <button type="submit" className="hover:bg-[#f5d252] py-2 bg-[#ffc800] rounded-lg w-1/3">Upload</button>
                </div>
            </form>
        </div>
    )
}
