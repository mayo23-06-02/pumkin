import Image from 'next/image'
import React from 'react'
import { BiPlus, BiUser } from 'react-icons/bi'
import ImageProfile from '../../../assets/images/User-Ex.jpg'
import Button from '../Button/Button'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export default function ShooterRequest({senderProfile, message, hint, specialName}) {
    const router = useRouter()
    return (
        <div className='bg-white p-12 space-y-12  w-[90vw]  lg:w-[500px] rounded-3xl shadow-md '>
            <div className='flex w-full items-center justify-between'>
                <p className='font-bold text-2xl lg:text-3xl'>Shooter Request</p>
                <BiPlus className='rotate-45 text-4xl hidden' />
            </div>
        
            <div className='space-y-4'>
                <div className='space-y-1'>
                    <p className='font-semibold'>Your Message</p>
                    <p>{message} </p>
                </div>
                <div className='space-y-1'>
                    <p className='font-semibold'>Hint</p>
                    <p>{hint} </p>
                </div>

            </div>
            <div>
                
            </div>
        </div>
    )
}
