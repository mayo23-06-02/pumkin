'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import UserImage from '../../../assets/images/User01.png'
import { BiArrowBack, BiDotsHorizontal, BiDotsVerticalRounded, BiHeart } from 'react-icons/bi'
import Button from '../Button/Button'
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'

function UserPost({surname, profilePicture, username, image, caption, _id}) {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  function handleMenu(params) {
    if (showMenu === false) {
      setShowMenu(true)
    } else {
      setShowMenu(false)
    }
}
  const [liked, setLiked] = useState(false)

  function handleLike(params) {
    if (liked === false) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }

  
  function handleSubmit(e) {
    handleLike()
    e.preventDefault();
    let res = fetch("/api/edit-profile", {
        method: "PUT",
        body: JSON.stringify({
            "email": user.email,
            "likes:": likedUser
        }),
    }).then(async (response) => {
        const result = await response.json();
        setUser(selectedUser)
    });

}

  return (
    <div>
      <div className='bg-white shadow flex justify-between items-center px-4 lg:px-8 lg:py-4 py-2'>
        <div className='flex space-x-4 items-center '>
          <div>
            <Image src={profilePicture} width={50} height={50} className='rounded-full' />
          </div>
          <div className=''>
            <div className='flex lg:text-2xl text-xl space-x-2 font-bold'>
              <p>{username}</p>
              <p>{surname}</p>
            </div>
            
          </div>
        </div>
        <div className='relative'>
          <div className='text-3xl cursor-pointer active:scale-105' onClick={handleMenu}>
            <BiDotsVerticalRounded />
          </div>
          <span className={`right-0 top-[120%] absolute w-64  py-6 bg-white rounded-lg shadow ${showMenu? "block":" hidden"}`}>
              <ul>
                <li className='py-2 px-6 text-xl hover:bg-gray-100 cursor-pointer font-semibold'>
                  <p onClick={() => {
                    setCookie('selectedUserProfile', _id)
                    router.push('../../profile')
                  }} className='whitespace-nowrap'>View Profile</p>
                </li>
                <li className='py-2 px-6 text-xl hover:bg-gray-100 cursor-pointer font-semibold'>
                  <p className='whitespace-nowrap'>Block/Hide</p>
                </li>
                <li className='py-2 px-6 text-xl hover:bg-gray-100 cursor-pointer font-semibold'>
                  <p className='whitespace-nowrap'>Report</p>
                </li>
              </ul>
          </span>
        </div>
      </div>
      <div className='flex w-full  items-center justify-center'>
        <div className='space-y-4'>
          <Image src={image} width={600} height={800} />
          <div className='lg:text-xl sm:w-screen lg:w-[600px] px-4 lg:px-0 text-sm font-semibold'>
            <p>{caption}</p>
          </div>
        </div>
      </div>
      <div className='flex lg:px-8 px-4 lg:py-6 py-2 items-center lg:space-x-6 space-x-2'>
        <div className='flex items-center flex-col space-y-1'>
          <BiHeart className='lg:text-4xl text-3xl' />
        </div>
        <div className='flex w-full'>
          <input placeholder='Type comment...' className='rounded-full bg-gray-100 lg:h-16 h-10 px-6 w-full' />
        </div>
        <div>
          <Button variant={'primary'} label={'Share'} className='hidden lg:inline' />
          <button className='bg-black text-white rounded-full p-3'>
            <BiArrowBack className='rotate-180 ' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserPost