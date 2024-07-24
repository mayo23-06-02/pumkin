import Image from 'next/image'
import React from 'react'
import { BiPlus } from 'react-icons/bi'
import ImageProfile from '../../../assets/images/User-Ex.jpg'
import Button from '../Button/Button'

export default function ShooterRequest() {
    return (
        <div className='bg-white p-12 space-y-12  w-[500px] rounded-3xl shadow-md '>
            <div className='flex w-full items-center justify-between'>
                <p className='font-bold text-3xl'>Shooter Request</p>
                <BiPlus className='rotate-45 text-4xl' />
            </div>
            <div>
                <div className=' flex space-x-6'>
                    <Image src={ImageProfile} width={50} height={50} className='rounded-full' />
                    <div>
                        <div className='font-bold flex text-xl space-x-2'>
                            <p>Mayo</p>
                            <p>Mahlalela</p>
                        </div>
                        <ul className='flex space-x-3'>
                            <li className='flex space-x-1'>
                                <p className='font-bold text-gray-800'>0</p>
                                <p>Hickies</p>
                            </li>
                            <li className='flex space-x-1'>
                                <p className='font-bold text-gray-800'>0</p>
                                <p>Pumpkins</p>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            <div>
                <div className='flex items-center space-x-4'>
                    <Button label={'Pumpkin'} variant={'tertiary'} />
                    <Button label={'View Profile'} variant={'primary'} />
                </div>
            </div>
        </div>
    )
}
