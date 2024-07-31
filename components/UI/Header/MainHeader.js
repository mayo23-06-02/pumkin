'use client'
import React, { useEffect, useState } from 'react'

import Logo from '../../../assets/images/logo 2.png'
import Pumpkin from '../../../assets/images/Pumpkin 2.png'
import Image from 'next/image'
import Button from '../Button/Button'
import Link from 'next/link'
import { BiAlarm, BiBell, BiMenu, BiMessage, BiMessageAlt, BiMessageAltDetail, BiNotification, BiPlus, BiUser } from 'react-icons/bi'
import { useCookies } from 'next-client-cookies'

function MainHeader() {
    const [showSideDrawer, setshowSideDrawer] = useState(false)
    const [shooterNotification, setShooterNotification] = useState([])
    const [userNotifications, setUserNotifications] = useState([])
    const [unseenNotifications, setUnseenNotifications] = useState([])

    function onToggleSideDrawer(params) {
        if (showSideDrawer == false) {
            setshowSideDrawer(true)
        } else {
            setshowSideDrawer(false)
        }
    }

    const cookies = useCookies()

    useEffect(() => {
        const email = cookies.get('email')
        console.log(email);
        fetch('/api/shooter')
            .then((res) => res.json())
            .then((data) => {
                setShooterNotification(data)
                const selectedNotifications = data.filter(
                    (post) => post.email === email
                );

                console.log(selectedNotifications);
                if (selectedNotifications.length > 0) {
                    setUserNotifications(selectedNotifications);
                }
            })


    }, [])

    useEffect(() => {
        const unseenNotifications = userNotifications.filter(
            (post) => post.seen === false
        );
        if (unseenNotifications.length > 0) {
            setUnseenNotifications(unseenNotifications);
        }
    }, [userNotifications]);

    console.log(unseenNotifications, "sila");


    return (
        <div className="relative w-full   bg-white
             lg:bg-white/5 lg:bg-opacity-20 lg:backdrop-blur-lg  grid grid-cols-3 grid-flow-col lg:flex justify-between  px-6 items-center  lg:px-8 py-4">
            <div className='lg:hidden relative'>
                <dvi>
                    {showSideDrawer ? <BiPlus className='text-3xl rotate-45' onClick={onToggleSideDrawer} /> : <BiMenu className='text-3xl' onClick={onToggleSideDrawer} />}
                </dvi>
                <span className={`absolute bg-white py-8 rounded-lg  px-6 w-36 -left-3 ${showSideDrawer ? 'block' : 'hidden'}`}>
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
            <div className='flex space-x-12 items-center'>
                <Link href={'../../feed'}>
                    <div className="flex lg:w-72  lg:space-x-7 items-center ">
                        <Image src={Logo} width={50} height={50} className='hidden lg:inline' />
                        <Image src={Pumpkin} width={100} height={80} className='lg:scale-150' />
                    </div>
                </Link>
                <div className='hidden lg:inline'>
                    <ul className='flex space-x-12 '>
                        <li className='font-bold hover:scale-105 cursor-pointer'>
                            <Link href={'../../feed'}>
                                <p>Home</p>
                            </Link>
                        </li>
                        <li className='font-bold  hover:scale-105 cursor-pointer'>
                            <Link href={'../../discover'}>
                                <p>Discover</p>
                            </Link>
                        </li>
                        <li className='font-bold  hover:scale-105 cursor-pointer'>
                            <Link href={'../../matches'}>
                                <p>Matches</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className=''>
                <div className="flex  space-x-12 items-center "	>
                    <div className='flex items-center justify-center '>
                        <div className='font-bold  hidden lg:inline hover:scale-105 cursor-pointer'>
                            <Link href={'../../'}>
                                <p className='whitespace-nowrap '>Log Out</p>
                            </Link>
                        </div>
                    </div>
                    <div className='flex space-x-4 lg:space-x-6 items-center'>
                        <div className='relative cursor-pointer active:scale-105'>
                            <Link href={'../../../notifications'}>
                                <BiBell className='lg:text-2xl text-2xl' />
                            </Link>
                            <span className='absolute text-white lg:-right-1 right-0 font-semibold -top-2  bg-black lg:h-4 h-4 lg:w-4 w-4 text-xs  flex items-center justify-center p-1 rounded-full'>
                                <p>{unseenNotifications.length}</p>
                            </span>
                        </div>
                        <div>
                            <Link href={'../../../profile'}>
                                <BiUser className='lg:text-2xl text-2xl cursor-pointer active:scale-105' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MainHeader