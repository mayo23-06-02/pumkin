import Image from 'next/image'
import React from 'react'
import ImageProfile from '../../../assets/images/User-Ex.jpg'

export default function NotificationItem() {
    return (
        <div className='flex items-center justify-between cursor-pointer hover:bg-gray-200 py-2 px-4 bg-opacity-30'>
            <div className='flex items-center space-x-4'>
                <Image src={ImageProfile} width={50} height={50} className='rounded-full' />
                <div className='flex items-center space-x-2 text-lg'>
                    <div className='flex font-bold space-x-1'>
                        <p>Mayo</p>
                        <p>Mahlalela</p>
                    </div>
                    <p>liked your photo</p>
                </div>
            </div>
            <div className='font-semibold text-gray-800'>
                <p>12:01pm</p>
            </div>
        </div>
    )
}
