'use client'
import React, { useState } from 'react'

import Logo from '../../../assets/images/logo 2.png'
import Pumpkin from '../../../assets/images/Pumpkin 2.png'
import Image from 'next/image'
import Button from '../Button/Button'
import Link from 'next/link'
import { BiAlarm, BiBell, BiMenu, BiMessage, BiMessageAlt, BiMessageAltDetail, BiNotification, BiPlus, BiUser } from 'react-icons/bi'

function MainHeader() {
    const [showSideDrawer, setshowSideDrawer] = useState(false)

    function onToggleSideDrawer(params) {
        if (showSideDrawer == false) {
            setshowSideDrawer(true)
        } else {
            setshowSideDrawer(false)
        }
    }



    return (
        <div className="relative w-full h-16 lg:h-32 bg-white
             lg:bg-white/5 lg:bg-opacity-20 lg:backdrop-blur-lg  flex justify-between px-6 items-center  lg:px-24 py-12 lg:py-10">
            <div className='flex space-x-12 items-center'>
                <div className="flex lg:w-72  space-x-7 items-center ">
                    <Link href={'../../feed'}>
                        <Image src={Logo} width={50} height={50} className='hidden lg:inline' />
                    </Link>
                    <Link href={'../../feed'}>
                        <Image src={Pumpkin} width={100} height={80} className='scale-125' />
                    </Link>
                </div>
                <div className='hidden lg:inline'>
                    <ul className='flex space-x-12 text-lg'>
                        <li className='font-bold text-xl hover:scale-105 cursor-pointer'>
                            <Link href={'../../feed'}>
                                <p>Home</p>
                            </Link>
                        </li>
                        <li className='font-bold text-xl hover:scale-105 cursor-pointer'>
                            <Link href={'../../discover'}>
                                <p>Discover</p>
                            </Link>
                        </li>
                        <li className='font-bold text-xl hover:scale-105 cursor-pointer'>
                            <p>Matches</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='lg:hidden relative'>
                <dvi>
                    {showSideDrawer ? <BiPlus className='text-3xl rotate-45' onClick={onToggleSideDrawer} /> : <BiMenu className='text-3xl' onClick={onToggleSideDrawer} />}
                </dvi>
                <span className={`absolute bg-white py-8 rounded-lg  px-6 right-5 ${showSideDrawer ? 'block' : 'hidden'}`}>
                    <ul className='flex flex-col space-y-4  text-lg'>
                        <li className='font-bold text-xl hover:scale-105 cursor-pointer'>
                            <Link href={'../../feed'}>
                                <p>Home</p>
                            </Link>
                        </li>
                        <li className='font-bold text-xl hover:scale-105 cursor-pointer'>
                            <Link href={'../../discover'}>
                                <p>Discover</p>
                            </Link>
                        </li>
                        <li className='font-bold text-xl hover:scale-105 cursor-pointer'>
                            <Link href={'../../matches'}>
                                <p>Matches</p>
                            </Link>
                        </li>
                    </ul>
                </span>
            </div>
            <div className='hidden lg:inline'>
                <div className="flex justify-between space-x-12 items-center "	>
                    <div className='flex items-center justify-center space-x-24'>
                        <div className='font-bold text-xl hover:scale-105 cursor-pointer'>
                            <Link href={'../../'}>
                                <p className='whitespace-nowrap'>Log Out</p>
                            </Link>
                        </div>
                    </div>
                    <div className='flex space-x-6 items-center'>
                        <div className='relative cursor-pointer active:scale-105'>
                            <Link href={'../../../notifications'}>
                                <BiBell className='text-4xl' />
                            </Link>
                            <span className='absolute text-white -right-2 font-semibold -top-2 bg-black h-6 w-6 flex items-center justify-center p-1 rounded-full'>
                                <p>2</p>
                            </span>
                        </div>
                        <div>
                            <Link href={'../../../profile'}>
                                <BiUser className='text-4xl cursor-pointer active:scale-105' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainHeader