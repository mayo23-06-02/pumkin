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
            <div>
                <div className=' flex space-x-6'>
                {senderProfile.profilePicture ?
                    <Image src={senderProfile.profilePicture} width={50} height={50} className='rounded-full' />
                    :
                    <div className='bg-gray-300 flex items-center justify-center  h-[50px] w-[0px] rounded-full p-6'>
                        <BiUser className='text-xl cursor-pointer active:scale-105' />
                    </div>

                }
                    <div>
                        <div className='font-bold flex text-xl space-x-2'>
                            <p>{senderProfile.name}</p>
                            <p>{senderProfile.surname}</p>
                        </div>
                        <ul className='flex space-x-3'>
                            <li className='flex space-x-1'>
                                <p className='font-bold text-gray-800'>{senderProfile.hickies}</p>
                                <p>Hickies</p>
                            </li>
                            <li className='flex space-x-1'>
                                <p className='font-bold text-gray-800'>{senderProfile.pumpkins}</p>
                                <p>Pumpkins</p>
                            </li>
                        </ul>
                    </div>

                </div>
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
                <div className='flex items-center lg:space-x-4 lg:flex-row flex-col  space-y-2 lg:space-y-0 space-x-0'>
                    <Button label={'View Profile'} variant={'primary'} onClick={() => {
                        setCookie('selectedUserProfile', senderProfile.email)
                        router.push(`../../user-profile`)
                    }} />
                </div>
            </div>
        </div>
    )
}
