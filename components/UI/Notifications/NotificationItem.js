import Image from 'next/image'
import React, { useState } from 'react'
import ImageProfile from '../../../assets/images/User-Ex.jpg'
import { BiUser } from 'react-icons/bi'
import ShooterRequest from '../Pop-Up/ShooterRequest'

export default function NotificationItem({ profilePicture, name, shooter, time, surname, senderData, message, hint, specialName,  }) {
    const [showShooter, setShowShooter] = useState(false)

    function handleShooter(params) {
        setShowShooter(!showShooter)
    }

    return (
        <div onClick={handleShooter} className='flex   items-center justify-between cursor-pointer bg-white hover:bg-gray-200 py-2 px-4 '>
            <div onClick={handleShooter} className='flex items-center space-x-4'>
                {profilePicture ?
                    <Image src={profilePicture} width={50} height={50} className='rounded-full' />
                    :
                    <div className='bg-gray-300 flex items-center justify-center  h-[50px] w-[0px] rounded-full p-6'>
                        <BiUser className='text-xl cursor-pointer active:scale-105' />
                    </div>


                }
                <div onClick={handleShooter} className='flex items-center space-x-2 text-lg'>
                    <div className='flex font-bold space-x-1'>
                        <p>{name}</p>
                        <p>{surname}</p>
                    </div>
                    <p className='font-bold text-sm lg:text-base'>You have a Shooter Request</p>
                </div>
            </div>
            <div className='font-semibold text-gray-800'>
                <p>{time}</p>
            </div>

            <span className={`absolute top-[20%] lg:top-[50%] left-[5%] lg:left-[30vw]  w-full ${showShooter ? 'block' : 'hidden'}`}>
                <ShooterRequest senderProfile={senderData} message={shooter?.message} hint={shooter?.hint} specialName={shooter?.specialName}/>
            </span>
        </div>
    )
}
