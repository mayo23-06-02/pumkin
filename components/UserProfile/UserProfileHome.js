'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Button from '../UI/Button/Button'
import { useRouter } from 'next/navigation'
import { getCookie, setCookie } from 'cookies-next'
import { useCookies } from 'next-client-cookies'
import ImageInput from '../UI/ImageInput/ImageInput'
import TextInput from '../UI/Text Input/TextInput'
import { BiImageAdd, BiPlus, BiUser } from 'react-icons/bi'


function UserProfileHome() {
    const cookies = useCookies();
    const router = useRouter()
    const [selectedUserData, setUserSelectedUserData] = useState(null)
    const [users, setUsers] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
    const [isShooter, setIsShooter] = useState(true)
    const [showShooter, setShowShooter] = useState(true)
    const [setspecialName, setSetspecialName] = useState("")
    const [message, setMessage] = useState("")
    const [hint, setHint] = useState("")

    function toggleShooter() {
        setShowShooter(!showShooter)
    }

    function toggleIsShooter() {
        setIsShooter(!isShooter)
    }

    useEffect(() => {
        const _id = cookies.get('selectedUserProfile')
        fetch('/api/auth')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data)
                const selectedUser = data.find(
                    (user) => user.email === _id
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

    const [shooterRequest, setShooterRequest] = useState([])

    function handleSubmit(e) {
        setShowShooter(true)
        e.preventDefault();
        const timestamp = new Date().toISOString(); // Create a timestamp
        const senderEmail = cookies.get('email');
        const senderData = JSON.parse(cookies.get('userData'))
        const shooterRequestData = {
            "specialName": setspecialName,
            "hint": hint,
            "message": message
        }
        setShooterRequest(shooterRequestData)
        let res = fetch("/api/shooter", {
            method: "POST",
            body: JSON.stringify({
                "senderEmail": senderEmail,
                "senderData": senderData,
                "email": selectedUserData.email,
                "shooter": shooterRequestData,
                "timestamp": timestamp,
                "seen": false
            }),
        }).then(async (response) => {
            const result = await response.json();
            alert("Shoter Request Submitted")

        });

    }



    if (selectedUserData) {
        return (
            <div className=' relative bg-gradient-to-b space-y-12 from-black/5 to-white/0 lg:py-20 py-6 px-8 lg:px-16'>
                <div className={`${showShooter ? 'hidden' : 'block'}`}>
                    {isShooter ?
                        <div className='fixed text-white     flex flex-col py-16 px-6 l space-y-10  items-center lg:left-[35%] lg:w-[30vw] w-[88vw]  bg-[#FF7518] rounded-3xl'>

                            <div className=' flex flex-col items-center text-lg font-semibold'>
                                <p>Heey, {selectedUserData.name}</p>
                                <p>Welcome to Pumpkins Shot Shooter</p>
                            </div>
                            <div className='text-justify'>
                                <p>Shot Shooter lets you hit your crush up without having to go through the gwaabs, aka - gwababa, coz weve got you. This happens anonymously, and they never get to know its you. Take the chance, send them a sweet text. </p>
                            </div>
                            <div className='flex flex-col items-center space-y-2'>
                                <button onClick={toggleIsShooter} className='bg-black px-24 text-white rounded-full font-bold py-4'>
                                    <p>Shoot</p>
                                </button>
                                <p className='hover:underline cursor-pointer' onClick={toggleShooter}>Cancel</p>
                            </div>
                        </div>
                        :
                        <div className='fixed text-white     flex flex-col py-16 px-6 l space-y-6  items-center lg:left-[35%] lg:w-[30vw] w-[88vw]  bg-[#FF7518] rounded-3xl'>
                            <div className='w-full space-y-2'>
                                <p className='text-sm'>What special name no you want them to know you by?</p>
                                <input type="text" className='w-full py-2 px-4 rounded-xl text-black' value={setspecialName} onChange={(e) => setSetspecialName(e.target.value)} />
                            </div>
                            <div className='w-full space-y-2'>
                                <p className='text-sm'>Shoot your shot player, Whats your message to them?</p>
                                <textarea type="text" className='w-full py-2 px-4 rounded-xl text-black' value={message} onChange={(e) => setMessage(e.target.value)} />
                            </div>
                            <div className='w-full space-y-2'>
                                <p className='text-sm'>Wanna drop a young hint, dont be too obvious now!</p>
                                <input type="text" className='w-full py-2 px-4 rounded-xl text-black' value={hint} onChange={(e) => setHint(e.target.value)} />
                            </div>
                            <div className='flex flex-col items-center space-y-2'>
                                <button onClick={handleSubmit} className='bg-black px-24 text-white rounded-full font-bold py-4'>
                                    <p>Shoot</p>
                                </button>
                                <p className='hover:underline cursor-pointer' onClick={() => {
                                    toggleShooter()
                                    toggleIsShooter()
                                }}>Cancel</p>
                            </div>
                        </div>
                    }
                </div>
                <div className='flex flex-col lg:flex-row items-center lg:space-y-0 space-y-6 lg:space-x-12'>
                    <div>
                        {selectedUserData.profilePicture ?
                            <Image src={selectedUserData.profilePicture} width={150} height={150} className='rounded-full' alt='profile' />
                            : <div  className='bg-gray-300 flex items-center justify-center  h-[150px] w-[150px] rounded-full p-6'>
                                <BiUser className='text-5xl cursor-pointer active:scale-105' />
                            </div>
                        }
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
                        <p onClick={toggleShooter} className='hover:scale-105 cursor-pointer'>Shoot Your Shot</p>
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
                            <div className=" flex space-x-2 sm:w-[90vw] overflow-auto  py-2">
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