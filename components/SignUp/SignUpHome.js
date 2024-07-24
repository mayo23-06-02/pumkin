'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import LPImage from '../../assets/images/LP-Image.png'
import LPImageSM from '../../assets/images/BG - SM.jpg'
import Button from '../UI/Button/Button'
import TextInput from '../UI/Text Input/TextInput'

function SignUpHome() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    function handleSubmitThirdForm(e) {
        e.preventDefault();
        if (password === verifyPassword) {
            nextSection()
            let res = fetch("/api/auth", {
                method: "POST",
                body: JSON.stringify({
                    "name": firstName,
                    "surname": lastName,
                    "email": email,
                    "username": username,
                    "password": password,
                    "hobbies": [],
                    "passions": [],
                    "bio": "",
                    "profilePicture": "",
                    "posts": [],
                    "hickies": 0,
                    "pumpkins": 0,
                    "dob": "",
                    "joined": "",
                    "gender": "",
                    "city": "",
                    "state": "",
                    "country": "Eswatini",
                }),
            }).then(async (response) => {
                const result = await response.json();
                router.push('../../login')
            });
        } else {
            alert("Passwords don't match")
        }
    }

    function nextSection() {
        // Add your logic to move to the next section here
    }

    return (
        <div className="relative items-center justify-center flex h-full w-full">
            <div className="lg:grid grid-cols-12 items-center">
                <div className='hidden lg:inline col-span-6'>
                    <div className="  col-span-6 flex-col space-y-3 text-white flex  items-start px-12 ">
                        <div className="text-white flex justify-start flex-col items-start font-bold space-y-2 text-8xl">
                            <p>Welcome</p>
                            <p>To Pumpkin</p>
                        </div>
                        <p className='text-xl'>Where true love meets fortune</p>
                        <div className='pt-12'>
                            <Button label="Create Account" variant={"secondary"} />
                        </div>
                    </div>
                </div>
                <div className="  col-span-6">
                    <Image src={LPImage} width={1200} height={500} className='hidden lg:inline' />
                    <Image src={LPImageSM} width={1200} height={500} className='lg:hidden ' />
                </div>
            </div>
            <span className='absolute z-50 -bottom-20 rounded-t-full lg:top-[20vh] lg:left-[30%]'>
                <div className=' lg:max-w-[100px] rounded-t-full'>
                    <div className=" bg-white/5 rounded-3xl bg-opacity-20 py-8 lg:py-12 space-y-12 backdrop-blur-lg w-screen   col-span-6 flex-col  text-white flex  items-center px-12 lg:max-w-[500px]">
                        <div className='flex items-start w-full'>
                            <p className='text-4xl font-bold '>Create Account</p>
                        </div>
                        <div className='w-full space-y-12 '>
                            <TextInput label={'First Name'} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <TextInput label={'Last Name'} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <TextInput label={'Email'} value={email} onChange={(e) => setEmail(e.target.value)} />
                            <TextInput label={'Stem (username)'} value={username} onChange={(e) => setUsername(e.target.value)} />
                            <TextInput type={'password'} label={'Password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                            <TextInput type={'password'} label={'Confirm Password'} value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
                        </div>
                        <div>
                            <div className='flex texm'>
                                <p>Already have an account? </p>
                                <p className='font-bold text-blue-600 hover:underline active:scale-105 cursor-pointer'>Login</p>
                            </div>
                        </div>
                        <div>
                            <Button label="Create Account" variant={"primary"} onClick={handleSubmitThirdForm} />
                        </div>
                    </div>
                </div>
            </span>
            <span className='absolute z-40 -'>
                <div className='bg-black h-screen w-screen opacity-60' />
            </span>
        </div>
    )
}

export default SignUpHome