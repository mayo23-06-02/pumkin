import React from 'react'
import UserImage from '../../../assets/images/User01.png'
import Image from 'next/image'
import Button from '../Button/Button';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import ImageCArd from '../../../assets/images/Bottom Bar.png'
function ProfileCardMatches({ id ,username,email, name, image, surname = '', hickies, pumpkins, dob }) {
    function getSurnameInitials(surname) {
        // Split the surname into an array of words
        const surnameWords = (surname || '').trim().split(' ');

        // Extract the initial of each word
        const initials = surnameWords.map(word => word.charAt(0).toUpperCase());

        // Join the initials into a single string
        const initialsString = initials.join('');

        return initialsString;
    }

    const router = useRouter()
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
    return (
        <div className=' relative px-4 items-center space-y-4 lg:space-y-6 flex-col flex w-full' onClick={() => {
            setCookie('selectedUserProfile', email)
            router.push(`../../user-profile`)
        }}>
            <Image src={image} width={200} height={200} className='rounded-full' />
            <span className='  bottom-0    rounded-b-[12px] px-2 lg:px-6'>
                <div  className='text-white  lg:space-y-2 -space-y-1 lg:-space-x-2 flex flex-col w-full items-center '>
                    <div className='flex font-bold  text-xl lg:text-3xl space-x-3'>
                        <div className='space-x-1 flex'>
                            <p>{name}</p>
                            <p>{getSurnameInitials(surname)},</p>
                        </div>
                        <p>{calculateAge(dob)}</p>
                    </div>
                    <div className='flex  lg:text-xl pt-2 text-xs  line-clamp-1 text-nowrap space-x-2'>
                        <p className=' text-nowrap line-clamp-1'>{pumpkins} Pumkins - {hickies} Hickies</p>
                    </div>
                    <div className='hidden lg:inline pt-6'>
                        <Button label={'View Profile'} variant={"primary"} onClick={() => {
                            setCookie('selectedUserProfile', id)
                            router.push(`../../user-profile`)
                        }} />
                    </div>
                </div>
            </span>
            <Image src={ImageCArd} width={200} height={50} alt='no' className=' pt-16' />
        </div>
    )
}

export default ProfileCardMatches