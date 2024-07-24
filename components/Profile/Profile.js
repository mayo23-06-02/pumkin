'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Button from '../UI/Button/Button'
import { useRouter } from 'next/navigation'
import { getCookie, setCookie } from 'cookies-next'
import { useCookies } from 'next-client-cookies'
import ImageInput from '../UI/ImageInput/ImageInput'
import { BiImageAdd, BiPlus, BiUserPlus } from 'react-icons/bi'
import ImageCropper from '../ImageCropper/ImageCropper'


function ProfileHome() {
    const cookies = useCookies();
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
    const [bio, setBio] = useState()
    const [hobby, setHobby] = useState()
    const [hobbies, setHobbies] = useState([])
    const [passion, setPassion] = useState()
    const [passions, setPassions] = useState([])
    const [setshowEditBox, setSetshowEditBox] = useState(false)
    const [DOB, setDOB] = useState()
    const [showCropper, setShowCropper] = useState(false)
    const [userPosts, setUserPosts] = useState([])
    const [posts, setPosts] = useState([])

    function handleSubmit(e) {
        e.preventDefault();

        let res = fetch("/api/edit-profile", {
            method: "PUT",
            body: JSON.stringify({
                "email": user.email,
                "dob": DOB,
                "bio": bio,
                "hobbies": hobbies,
                "passions": passions,
            }),
        }).then(async (response) => {
            const result = await response.json();
            alert("Profile Updated")
            setSetshowEditBox(false)
            const selectedUser = users.find(
                (used) => used.email === user.email
            );
            console.log(selectedUser);
            setCookie('userData', selectedUser)
            setUser(selectedUser)
        });

    }

    useEffect(() => {
        const email = cookies.get('email');
    
        fetch('/api/auth')
          .then((res) => res.json())
          .then((data) => {
            setUsers(data);
            const selectedUser = data.find(
              (user) => user.email === email
            );
            console.log(selectedUser);
            if (selectedUser) {
              setUser(selectedUser);
            }
          })
          .catch((error) => {
            console.error("Error fetching auth data:", error);
          });
    
        fetch('/api/post-image')
          .then((res) => res.json())
          .then((data) => {
            const selectedPosts = data.filter(
              (post) => post.email === email
            );
            console.log(selectedPosts);
            if (selectedPosts.length > 0) {
              setUserPosts(selectedPosts);
            }
          })
          .catch((error) => {
            console.error("Error fetching post data:", error);
          });
    
      }, [cookies]);
    
      useEffect(() => {
        console.log("userPosts",userPosts);
      }, [userPosts]);
    


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


    if (user) {
        return (
            <div className=' relative bg-gradient-to-b space-y-12 from-black/5 to-white/0 py-20 px-8 lg:px-16'>
                <span className={`absolute z-50 right-[80%]  ${showCropper ? "block" : "hidden"}`}>
                    <div className='relative flex-1'>
                        <div className='absolute'>
                            <BiPlus />
                        </div>
                        <ImageCropper />
                    </div>
                </span>
                <div className='flex flex-col lg:flex-row items-center lg:space-y-0 space-y-6 lg:space-x-12'>
                    <div className='relative'>
                        {user.profilePicture ?
                            <Image src={user.profilePicture} width={150} height={150} className='rounded-full' />
                            : <div onClick={() => setShowCropper(true)} className='bg-gray-300 flex items-center justify-center  h-[150px] w-[150px] rounded-full p-6'>
                                <BiImageAdd className='text-5xl cursor-pointer active:scale-105' />
                            </div>
                        }

                    </div>
                    <div className='flex flex-col items-center lg:items-start space-y-2'>
                        <div className='flex font-bold text-3xl space-x-2 lg:space-x-4 lg:text-5xl'>
                            <p className=''>{user.name}</p>
                            <p className=''>{user.surname}</p>
                            {user.dob ?
                                <p>{calculateAge(user.dob)}</p>
                                :
                                <p></p>
                            }
                        </div>
                        {user.dob ?
                            <div className='flex flex-col  lg:text-2xl text-lg space-y-2 '>
                                <p className='text-gray-600'>@{user.username}</p>
                                <p>Born {formatDate(user.dob)}</p>
                            </div>
                            :
                            <p ></p>
                        }
                    </div>
                </div>
                <div className='flex space-y-16 lg:space-y-0  flex-col lg:flex-row items-center lg:justify-between w-full'>
                    <div className='flex items-center space-x-6'>
                        <div className='flex  space-x-2 lg:text-2xl text-xl'>
                            <p className='font-bold'>{user.posts.length}</p>
                            <p>Posts</p>
                        </div>
                        <div className='flex  space-x-2 lg:text-2xl text-xl'>
                            <p className='font-bold'>{user.pumpkins ? user.pumpkins : 0}</p>
                            <p>Pumkins</p>
                        </div>
                        <div className='flex  space-x-2 lg:text-2xl text-xl'>
                            <p className='font-bold'>{user.hickies ? user.hickies : 0}</p>
                            <p>Hickies</p>
                        </div>
                    </div>

                    <div className='flex space-x-16 font-bold lg:flex-row text-xl lg:text-xl items-center space-y-12 flex-col lg:space-y-0 '>
                        <p className='hover:scale-105 cursor-pointer' onClick={() => setSetshowEditBox(true)}>Edit Profile</p>
                        <div>
                            <Button label={"Post"} variant={"primary"} onClick={() => {
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
                                    {user.bio}
                                </p>
                            </div>
                        </div>
                        <div className='space-y-4'>
                            <div className='font-bold text-2xl'>
                                <p>Hobbies</p>
                            </div>
                            <div className=" flex space-x-4">
                                {user.hobbies.map((hobbie, index) => (
                                    <p key={index} className='bg-[#D9D9D9] flex-wrap px-4 py-1 rounded-full font-semibold'>{hobbie}</p>
                                ))}
                            </div>
                        </div>
                        <div className='space-y-4'>
                            <div className='font-bold text-2xl'>
                                <p>Passions</p>
                            </div>
                            <div className=" flex space-x-4">
                                {user.passions.map((passion, index) => (
                                    <p key={index} className='bg-[#D9D9D9] flex-wrap px-4 py-1 rounded-full font-semibold'>{passion}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='space-y-6'>
                        <div className='font-bold text-2xl'>
                            <p>Posts</p>
                        </div>
                        <div className='grid grid-cols-3 gap-3 items-center'>
                            {userPosts.map((post, index) => (
                                <Image id={post._id} src={post.imagePost} width={200} height={200} className='object-contain' />
                            ))
                            }
                        </div>
                    </div>
                </div>
                <span className={`absolute z-50  lg:w-[50vw] w-[90vw] bg-white py-12 px-8 top-[20%] lg:right-[15%]  ${setshowEditBox ? 'block' : 'hidden'} `}>
                    <div className='flex justify-between py-6'>
                        <p className='font-bold text-2xl'>Edit Profile</p>
                        <BiPlus onClick={() => setSetshowEditBox(false)} className='rotate-45 text-3xl cursor-pointer' />
                    </div>
                    <div className='space-y-8'>
                        <div className='space-y-6'>
                            <div>
                                <div className='flex space-x-2'>
                                    <input type='date' value={DOB} onChange={(e) => setDOB(e.target.value)} placeholder='Add/Edit Date of Birth' className='w-full outline outline-1 outline-gray-300 p-2' />
                                    <button className='bg-blue-500 text-white px-4 py-1 rounded-full font-semibold' onClick={(e) => setDOB(e.target.value)}>Add</button>
                                </div>
                            </div>
                            <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder='Add/Edit Bio' className='w-full min-h-24 outline outline-1 outline-gray-300 p-2' />
                            <div>
                                <div className=" flex space-x-2 pb-2">
                                    {hobbies.map((hobby, index) => (
                                        <p key={index} className='bg-[#D9D9D9] flex-wrap px-4 py-1 rounded-full font-semibold'>{hobby}</p>
                                    ))}
                                </div>
                                <div className='flex space-x-2'>
                                    <input value={hobby} onChange={(e) => setHobby(e.target.value)} placeholder='Add/Edit Hobbies' className='w-full outline outline-1 outline-gray-300 p-2' />
                                    <button className='bg-blue-500 text-white px-4 py-1 rounded-full font-semibold' onClick={() => setHobbies([...hobbies, hobby])}>Add</button>
                                </div>
                            </div>
                            <div>
                                <div className=" flex space-x-2 pb-2">
                                    {passions.map((passion, index) => (
                                        <p key={index} className='bg-[#D9D9D9] flex-wrap px-4 py-1 rounded-full font-semibold'>{passion}</p>
                                    ))}
                                </div>
                                <div className='flex space-x-4'>
                                    <input value={passion} onChange={(e) => setPassion(e.target.value)} placeholder='Add/Edit Passions' className='w-full outline outline-1 outline-gray-300 p-2' />
                                    <button className='bg-blue-500 text-white px-4 py-1 rounded-full font-semibold' onClick={() => {
                                        setPassions([...passions, passion]

                                        )
                                    }}>Add</button>
                                </div>
                            </div>
                        </div>
                        <Button label={"Save"} variant={"primary"} onClick={handleSubmit} />
                    </div>
                </span>


            </div>
        )
    } else {
        return <div className='w-full flex items-center justify-center h-96 text-xl'>Loading...</div>
    }
}

export default ProfileHome