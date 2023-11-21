import React from 'react'
import Navbar from '../layouts/navbar'
import "../../style/nationalggp.css";
import {BiLock, BiMenu} from "react-icons/bi";
import Tranding from '../fragments/tranding';
import Carousel from '../layouts/carousel';

export default function nationalgeographic() {
  return (
    <>
    <div className='bg-white fixed z-50'>
      <Navbar/>
    </div>

    <main className='bg-black h-full w-screen text-white justify-center items-center pb-5 pt-16'>
      <TitleWeb/>
      <div className='mx-[250px] flex gap-5'>
        <ViralNews/>
        <TrendNews/>
      </div>
    </main>
    <section className='w-screen h-screen bg-black text-white px-[250px] pb-10 flex flex-col justify-center'>
      <div className='flex justify-center items-center flex-col gap-3'>
        <h1 className='text-xl font-bold'>ANIMALS UP CLOSE WITH BERTIE GREGORY</h1>
        <p className='text-lg text-center'>Bertie Gregory is back, and this time the adventures are even more epic! Animals Up Close with Bertie Gregory goes behind-the-scenes with Bertie and his team as they adapt to unpredictable wildlife in remote environments – where filming rarely goes as planned.
        </p>
        <div>
          <a href="" className="subscribe-main w-full stream-now relative pr-1 font-bold">STREAM NOW</a>
        </div>
      </div>
      <div className='h-[50vh] flex justify-center items-center'>
        <Carousel/>
      </div>
    </section>
    </>
  )
}

function TitleWeb() {
  return (
    <div className='flex flex-col items-center py-24'>
        <h1 className='text-[52px] font-bold'>LATEST STORIES</h1>
        <p className='teks-judul text-lg relative'><a href='' className='subscribe-main w-full relative  before:content-["Subscribe"]'>Subscribe</a> for full access to read stories from National Geographic.</p>
      </div>
  )
}

function ViralNews() {
  return (

    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-5'>
          <h1 className='title-hits text-[34px] font-bold relative ml-2 pl-5'>TODAY'S PICKS</h1>
          <Tranding srcImg="https://i.natgeofe.com/n/764b3a99-d70f-4d16-8920-847d74d01c1a/CC8DFG.jpg?w=1440&h=2161">
            <Tranding.Judul>TRAVEL</Tranding.Judul>
            <Tranding.Isi>Take a tour of the Maya underworld—if you dare</Tranding.Isi>
          </Tranding>
          <Tranding srcImg="https://i.natgeofe.com/n/f12561d2-60b4-4bc3-99ce-e43341455859/GettyImages-603958296.jpg?w=1440&h=1805">
            <Tranding.Judul><BiLock color="rgb(255, 200, 0)"/> HISTORY & CULTURE</Tranding.Judul>
            <Tranding.Isi>She was an Osage dancer. She was also America’s first prima ballerina.</Tranding.Isi>
          </Tranding>
          <Tranding srcImg="https://i.natgeofe.com/n/12886911-82d7-4254-9cb5-d63a3d6361ec/NationalGeographic_703697.jpg?w=1440&h=1009">
            <Tranding.Judul>ANIMALS <br/> DOMESTICATED</Tranding.Judul>
            <Tranding.Isi>How Siamese cats change their colors</Tranding.Isi>
          </Tranding>
          <Tranding srcImg="https://i.natgeofe.com/n/6185b975-0c6c-4ea8-a05a-11da0bfc4f26/h_11.03016512.jpg?w=1440&h=953">
            <Tranding.Judul><BiLock color="rgb(255, 200, 0)"/> SCIENCE</Tranding.Judul>
            <Tranding.Isi>When should you get screened for breast cancer—and how often?</Tranding.Isi>
          </Tranding>
          <Tranding srcImg="https://i.natgeofe.com/n/768a6ab9-a26c-45e7-a0da-0bb21ee337b3/Woodadd5473image2.jpg?w=1440&h=2161">
            <Tranding.Judul>ANIMALS</Tranding.Judul>
            <Tranding.Isi>Humans are no longer the only primates that go through menopause</Tranding.Isi>
          </Tranding>
          <Tranding srcImg="https://i.natgeofe.com/n/17ae1f91-6c7e-4ae7-8297-e268b3473a06/h_26.2.ME-PI-657014.jpg?w=1440&h=2161">
            <Tranding.Judul>TRAVEL</Tranding.Judul>
            <Tranding.Isi>Traveling to Europe is changing for millions of tourists. Here’s what to know.</Tranding.Isi>
          </Tranding>
      </div>
      <div><a href="" className='subscribe-main see-more relative font-bold'>SEE MORE</a></div>
    </div>
  )
}

function TrendNews() {
  return (
    <>
    <div className='flex flex-col gap-5'>
          <div className='overflow-x-hidden overflow-y-hidden'>
            <img src="https://images.unsplash.com/photo-1455156218388-5e61b526818b?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vdW50YWluJTIwaWNlfGVufDB8fDB8fHww" alt="" className='w-[679px] h-[399px] object-cover relative hover:scale-110 transition-all duration-150'/>
            <div className='flex flex-col absolute w-[679px] bottom-0 flex text-white font-bold px-4 py-3 judul-gambar'>
            <h1 className='text-xl flex items-center gap-2'><BiLock color="rgb(255, 200, 0)"/> ADVENTURE</h1>
              <p className='text-3xl'>The world's lonelist volcano may hold something truly rare</p>
              <a href="" className='flex gap-2 items-center'><BiMenu/> READ</a>
            </div>
          </div>

          <div className='flex justify-between'>
            <div className='w-80 bg-white overflow-hidden'>
              <img src="https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGF1bnRlZCUyMGZvcmVzdHxlbnwwfHwwfHx8MA%3D%3D" alt="" className='w-80 h-56 object-cover hover:scale-110 transition-all'/>
              <div className='text-black p-4 font-bold flex flex-col justify-between'>
                <div>
                  <h1 className='text-sm text-stone-600'>ENVIRONMENT</h1>
                  <p>Haunted Appalachia? These ancient mountains witnessed the birth of man and monster</p>
                </div>
                <a href="" className='flex gap-2 items-center pt-5'><BiMenu/> READ</a>
              </div>
            </div>
            <div className='w-80 bg-white overflow-hidden'>
              <img src="https://media.istockphoto.com/id/1558549846/id/foto/kabin-batu-di-valley-of-fire-state-park-di-nevada-as.jpg?s=612x612&w=0&k=20&c=-RS5oemniUdzorKA7FYRmSF6hOQGncAB6atPiK95AuU=" alt="" className='w-80 h-56 object-cover hover:scale-110 transition-all'/>
              <div className='text-black p-4 font-bold flex flex-col justify-between'>
                <div>
                  <h1 className='text-sm text-stone-600'>HISTORY & CULTURE</h1>
                  <p>What declassified Cold-War spy photos tell us about ancient Rome</p>
                </div>
                <a href="" className='flex gap-2 items-center pt-5'><BiMenu/> READ</a>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}