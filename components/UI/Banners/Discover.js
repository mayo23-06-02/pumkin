"use client"
import React from 'react'
import Button from '../Button/Button'
import { useRouter } from 'next/navigation'

function DiscoverBanner() {
    const router = useRouter()
    return (
        <div className='px-8 py-10 bg-gradient-to-b from-[#C3530A] flex flex-col space-y-6  to-[#8E2842]'>
            <div>
                <div className='text-white font-bold lg:text-6xl text-4xl '>
                    <p>Discover</p>
                    <p>More People</p>
                </div>
                <div className='text-gray-300 text-lg pt-2 '>
                    <p>Where true love meets fortune</p>
                </div>
            </div>
            <div className='max-w-16'>
                <Button label={'Search'} variant={"primary"} onClick={() => router.push('../../../discover')} />
            </div>

        </div>
    )
}

export default DiscoverBanner