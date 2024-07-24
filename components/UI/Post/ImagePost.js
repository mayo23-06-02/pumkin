'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import UserImage from '../../../assets/images/User01.png'
import { BiDotsHorizontal, BiDotsVerticalRounded, BiHeart } from 'react-icons/bi'
import Button from '../Button/Button'
import { useCookies } from 'next/navigation'

function UserPost({surname, profilePicture, username, image, caption}) {
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
      <div className='bg-white shadow flex justify-between items-center px-8 py-4'>
        <div className='flex space-x-4 items-center '>
          <div>
            <Image src={profilePicture} width={50} height={50} className='rounded-full' />
          </div>
          <div className=''>
            <div className='flex text-2xl space-x-2 font-bold'>
              <p>{username}</p>
              <p>{surname}</p>
            </div>
            <div>
              <p className='flex text-gray-500  text-lg'>Manzini</p>
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
                  <p className='whitespace-nowrap'>View Profile</p>
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
          <Image src={image} width={500} height={800} />
          <div className='text-xl font-semibold'>
            <p>{caption}</p>
          </div>
        </div>
      </div>
      <div className='flex px-8 py-6 items-center space-x-6'>
        <div className='flex items-center flex-col space-y-1'>
          <BiHeart className='text-4xl' />
        </div>
        <div className='flex w-full'>
          <input placeholder='Type comment...' className='rounded-full bg-gray-100 h-16 px-6 w-full' />
        </div>
        <div>
          <Button variant={'primary'} label={'Share'} />
        </div>
      </div>
    </div>
  )
}

export default UserPost