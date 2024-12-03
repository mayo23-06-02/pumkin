"use client"
import React, { useEffect, useState } from 'react'
import Logo from  '../../assets/images/logo 1.png'	
import Image from 'next/image'
import Button from '../UI/Button/Button'
import { useCookies } from 'next-client-cookies'

function NewUserPopUp() {
    const cookies = useCookies()
    const [showUserData, setShowUserData] = useState(false)

    useEffect(() => {
        const userData = JSON.parse( cookies.get('userData'))
        console.log("ff",userData);
        
        if (!userData.profilePicture || !userData.bio  || userData.hobbies < 0 || userData.passions?.length < 0) {
            setShowUserData(true)
            alert("Please complete your profile")
        } else {
            setShowUserData(false)
            alert("Please complete yoyyur profile")

        }

        console.log(showUserData);
        
    }, [])

    function closePopUp() {
        setShowUserData(false)
    }

  return (
    <div className={`bg-white flex-col flex items-center px-6 py-8 space-y-8 rounded-2xl shadow-sm ${showUserData ? 'hidden' : 'inline'}`}>
        <div>
            <Image src={Logo} width={100} height={100} className='' alt='profile' />
        </div>
        <div className='flex items-center flex-col'>
            <p className='text-xl font-bold'>Welcome to Pumpkin</p>
            <p className='text-sm text-gray-700'>We need you to complete your profile to get started</p>   
            <p></p>
        </div>
        <div className='flex w-full'>
            <Button label={"Close"}  variant={'primary'} onClick={closePopUp}/>
        </div>
    </div>
  )
}

export default NewUserPopUp