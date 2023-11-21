import React from 'react';
import {IoSearchOutline} from "react-icons/io5";
import {RxDoubleArrowDown} from "react-icons/rx"

export default function navbar() {
    return (
        <nav className='flex w-screen h-full justify-between py-2 px-4'>
            <img src="https://i.natgeofe.com/n/e76f5368-6797-4794-b7f6-8d757c79ea5c/ng-logo-2fl.png?w=109&h=32" alt="National Geographic" />
            <ul className='flex gap-5 text-md items-center pr-4'>
                <li>
                    <a href="/login" className='font-bold'>LOGIN</a>
                </li>
                <li>
                    <a href="/register" className='font-bold'>REGISTER</a>
                </li>
                <li>
                    <a href="/profil" className='font-bold'>PROFIL</a>
                </li>
                <li>
                    <a href="/explore" className='font-bold'>EXPLORE</a>
                </li>
                <li>
                    <a href=""><IoSearchOutline size="23"/></a>
                </li>
                <li>
                    <a href="" className='font-sans relative subscribe-main before:content-["Newsletters"]'>Newsletters</a>
                </li>
                <li className='bg-black h-full items-center'>
                    <a href="" className='subs-navbar text-xs font-bold tracking-widest bg-black text-white py-[17.9px] px-4 relative'>SUBSCRIBE</a>
                </li>
                <li>
                    <a href="" className='font-bold flex items-center gap-1'>MENU <RxDoubleArrowDown size="19"/></a>
                </li>
            </ul>
        </nav>
    )
}
