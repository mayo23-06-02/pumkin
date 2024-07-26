'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Button from '../UI/Button/Button'
import { useRouter } from 'next/navigation'
import { getCookie, setCookie } from 'cookies-next'
import { useCookies } from 'next-client-cookies'
import ImageInput from '../UI/ImageInput/ImageInput'


function UserProfileHome() {
    const cookies = useCookies();
    const router = useRouter()
    const [selectedUserData, setUserSelectedUserData] = useState(null)
    const [users, setUsers] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")

    useEffect(() => {
        const _id = cookies.get('selectedUserProfile')
        fetch('/api/auth')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data)
                const selectedUser = data.find(
                    (user) => user._id === _id
                );
                setUserSelectedUserData(selectedUser)
            })
    }, [cookies])

    function formatDate(dateString) {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const monthIndex = date.getMonth();
        const month = months[monthIndex];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }

    // Example usage
    const dateString = "1990-01-01";
    const formattedDate = formatDate(dateString);
    console.log(formattedDate); // Output: "01 January 1990"

    function calculateAge(dateString) {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    // Example usage
    const dateOfBirth = "1990-01-01";
    const age = calculateAge(dateOfBirth);
    console.log(`Your age is ${age} years.`); // Output: Your age is 33 years.


    if (selectedUserData) {
        return (
            <div className=' relative bg-gradient-to-b space-y-12 from-black/5 to-white/0 py-20 px-8 lg:px-16'>
                <div className='flex flex-col lg:flex-row items-center lg:space-y-0 space-y-6 lg:space-x-12'>
                    <div>
                        <Image src={selectedUserData.profilePicture} width={200} height={200} className='rounded-full' />
                    </div>
                    <div className='flex flex-col items-center lg:items-start space-y-2'>
                        <div className='flex font-bold text-3xl space-x-2 lg:space-x-4 lg:text-5xl'>
                            <p className=''>{selectedUserData.name}</p>
                            <p className=''>{selectedUserData.surname},</p>
                            <p>{calculateAge(selectedUserData.dob)}</p>
                        </div>
                        <div className='flex flex-col  lg:text-2xl text-lg space-y-2 '>
                            <p className='text-gray-600'>@{selectedUserData.username}</p>
                            <p>Born {formatDate(selectedUserData.dob)}</p>
                        </div>
                    </div>
                </div>
                <div className='flex space-y-16 lg:space-y-0  flex-col lg:flex-row items-center lg:justify-between w-full'>
                    <div className='flex items-center space-x-6'>
                        <div className='flex  space-x-2 lg:text-2xl text-xl'>
                            <p className='font-bold'>{selectedUserData.posts.length}</p>
                            <p>Posts</p>
                        </div>
                        <div className='flex  space-x-2 lg:text-2xl text-xl'>
                            <p className='font-bold'>{selectedUserData.pumpkins}</p>
                            <p>Pumkins</p>
                        </div>
                        <div className='flex  space-x-2 lg:text-2xl text-xl'>
                            <p className='font-bold'>{selectedUserData.hickies}</p>
                            <p>Hickies</p>
                        </div>
                    </div>

                    <div className='flex lg:space-x-16 font-bold lg:flex-row text-xl lg:text-xl items-center space-y-10 flex-col lg:space-y-0 '>
                        <p className='hover:scale-105 cursor-pointer'>Shoot Your Shot</p>
                        <div>
                            <Button label={"Pumkin"} variant={"primary"} onClick={() => {
                                router.push('../../post')
                            }} />
                        </div>
                    </div>
                </div>

                <div className=' grid grid-rows-2 lg:grid-cols-2 lg:grid-flow-row grid-flow-col'>
                    <div className='space-y-12'>
                        <div className='space-y-4'>
                            <div className='font-bold text-2xl'>
                                <p>Bio</p>
                            </div>
                            <div className=' max-w-[400px] text-xl'>
                                <p>
                                    {selectedUserData.bio}
                                </p>
                            </div>
                        </div>
                        <div className='space-y-4'>
                            <div className='font-bold text-2xl'>
                                <p>Hobbies</p>
                            </div>
                            <div className="flex space-x-2 max-w-[90vw] overflow-auto py-2">
                                {selectedUserData.hobbies.map((hobbie, index) => (
                                    <div key={index} className='flex'>
                                        <p key={index} className='bg-[#D9D9D9] flex-wrap px-4 py-1 rounded-full font-semibold'>{hobbie}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='space-y-4'>
                            <div className='font-bold text-2xl'>
                                <p>Passions</p>
                            </div>
                            <div className=" flex space-x-2 max-w-[90vw] overflow-auto py-2">
                                {selectedUserData.passions.map((passion, index) => (
                                    <div key={index} className='flex '>
                                        <p key={index} className='bg-[#D9D9D9] text-nowrap flex-wrap px-4 py-1 rounded-full font-semibold'>{passion}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='space-y-6 pt-6 lg:pt-0'>
                        <div className='font-bold text-2xl'>
                            <p>Posts</p>
                        </div>
                        <div className='grid grid-cols-3 gap-3'>

                            {selectedUserData.posts.map((post, index) => (
                                <Image key={index} src={post.image} width={400} height={200} className='object-contain' />
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <div className='w-full flex items-center justify-center h-96 text-xl'>Loading...</div>
    }
}

export default UserProfileHome