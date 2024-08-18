'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { BiArrowBack, BiDotsVerticalRounded, BiHeart } from 'react-icons/bi'
import Button from '../Button/Button'

import {} from "react-icons/fi"
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'
import { useCookies } from 'next-client-cookies'
import { FaHeart } from "react-icons/fa";
function UserPost({ surname, profilePicture, email, username, likes, likedUsersData, image, caption, _id }) {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const [likedUsers, setLikedUsers] = useState(likedUsersData || []);
  const [postLikes, setPostLikes] = useState(likes)
  const [liked, setLiked] = useState(false)
  const cookies = useCookies()

  useEffect(() => {
    // Fetch initial like status
    const emailUser = cookies.get('email')
    if (likedUsers?.includes(emailUser)) {
      setLiked(true)
    }

  }, [likedUsers])

  const handleMenu = () => {
    setShowMenu(prev => !prev)
  }

  const handleLike = () => {
    setLiked(true)
    const emailUser = cookies.get('email')
    likedUsers.push(emailUser)
    fetch('/api/like', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, likedUsers: likedUsers, likes: postLikes + 1 }),
    })
    setPostLikes(postLikes + 1)
  }

  const handleDislike = () => {
    const email = cookies.get('email')
    setLikedUsers(prevLikedUsers => prevLikedUsers.filter(userEmail => userEmail !== email));
    fetch('/api/like', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: _id, likedUsers: likedUsers, likes: postLikes - 1 }),
    })
    setPostLikes(postLikes - 1)
  }

  return (
    <div>
      <div className='bg-white shadow flex justify-between items-center px-4 lg:px-8 lg:py-4 py-2'>
        <div className='flex space-x-4 items-center'>
          <div>
            <Image src={profilePicture} width={50} height={50} className='rounded-full' />
          </div>
          <div>
            <div className='flex lg:text-xl text-lg space-x-2 font-bold'>
              <p>{username}</p>
              <p>{surname}</p>
            </div>
          </div>
        </div>
        <div className='relative'>
          <div className='text-3xl cursor-pointer active:scale-105' onClick={handleMenu}>
            <BiDotsVerticalRounded />
          </div>
          <span className={`right-0 top-[120%] absolute w-64 py-2 bg-white rounded-lg shadow ${showMenu ? 'block' : 'hidden'}`}>
            <ul>
              <li className='py-2 px-6 lg:text-xl text-sm hover:bg-gray-100 cursor-pointer font-semibold'>
                <p onClick={() => {
                  setCookie('selectedUserProfile', email)
                  router.push(`../../user-profile`)
                }}>View Profile</p>
              </li>
            </ul>
          </span>
        </div>
      </div>
      <div className='space-y-2'>
        <div className='flex space-y-2 items-center flex-col'>
          <div>
            <Image src={image} width={500} height={400} className='' />
          </div>
          <div className='flex w-full justify-start px-4 line-clamp-3'><p>{caption}</p></div>    
        </div>
        <div className='flex space-x-4 px-4  items-center'>
          <div className='flex space-x-2 items-center'>
            <div className='lg:text-3xl text-2xl  cursor-pointer active:scale-105' onClick={handleLike}>
                {liked? <FaHeart className='text-black' /> : <BiHeart onClick={handleLike} className='text-black' />}
            </div>
            <p className='text-lg font-bold'>{likedUsers.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPost
