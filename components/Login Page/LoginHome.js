'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import LPImage from '../../assets/images/LP-Image.png'
import LPImageSM from '../../assets/images/BG - SM.jpg'
import Button from '../UI/Button/Button'
import TextInput from '../UI/Text Input/TextInput'
import { setCookie } from 'cookies-next'

function LoginHome() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const [users, setUsers] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")

    useEffect(() => {
        fetch('/api/auth')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data)
            })
    }, [])

    function handleSubmitThirdForm(e) {
        e.preventDefault();

        const selectedUser = users.find(
            (user) => user.email === email
        );
        setCookie('email', email)
        setCookie('userData', selectedUser)

        if (!selectedUser) {
            setErrorMessage('Account not found. Please try again')
        } else {
            if (selectedUser.password === password) {
                router.push('../../feed')
            } else {
                setPasswordErrorMessage("Incorrect Email/Password!")
            }
        }
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
            <span className='absolute z-50 -bottom-20 rounded-t-full lg:top-[30vh] lg:left-[30%]'>
                <div className=' lg:max-w-[100px] rounded-t-full'>
                    <div className=" bg-white/5 rounded-3xl bg-opacity-20 pt-8 lg:py-12  space-y-12 backdrop-blur-lg w-screen   col-span-6 flex-col  text-white flex  items-center px-12 lg:max-w-[500px]">
                        <div className='flex flex-col space-y-4 items-start w-full'>
                            <p className='text-4xl font-bold '>Sign Up</p>
                            <div className='text-red-600'>
                                <p>{errorMessage}</p>
                                <p>{passwordErrorMessage}</p>
                            </div>
                        </div>
                        <div className='w-full space-y-12'>
                            <TextInput label={'Email'} value={email} onChange={(e) => setEmail(e.target.value)} />
                            <TextInput type={'password'} label={'Password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <div className='flex texm'>
                                <p>Don't have an account yet? </p>
                                <p className='font-bold text-blue-600 hover:underline active:scale-105 cursor-pointer'>Sign Up</p>
                            </div>
                        </div>
                        <div>
                            <Button label="Login" variant={"primary"} onClick={handleSubmitThirdForm} />
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

export default LoginHome