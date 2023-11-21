import React from 'react'

function Tranding({children, srcImg}) {
return (
    <div className='flex gap-4'>
    <img src={srcImg} alt="" className='w-24 h-24 object-cover'/>
    <div className='flex flex-col w-56 justify-center'>
        {children}
    </div>
    </div>
)
}

function Judul({children}) {
    return(
        <a href="" className='hover:underline flex gap-1 items-center'>{children}</a>
    )
}

function Isi({children}) {
    return (
        <a href="" className='hover:underline'>{children}</a>
    )
}

Tranding.Judul = Judul;
Tranding.Isi = Isi;

export default Tranding;