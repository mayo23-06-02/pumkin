import React from 'react'
import UserImage from '../../../assets/images/User01.png'
import Image from 'next/image'
import Button from '../Button/Button';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { BiImageAdd, BiUser } from 'react-icons/bi';

function ProfileCardPro({ id, username, email, coverPicture, name, image, surname = '', hickies, pumpkins, dob }) {
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
        <div className=' relative max-w-[300px] px-1 md:px-2 lg:px-2 items-center space-y-4 lg:space-y-6 cursor-pointer flex-col flex w-full' onClick={() => {
            setCookie('selectedUserProfile', email)
            router.push(`../../user-profile`)
        }}>
            {coverPicture ?
                <div className='relative  items-center justify-center flex'>
                    <Image src={coverPicture} width={300} height={800} className=' hidden lg:inline lg:rounded-3xl rounded-xl' alt='profile' />
                    <Image src={coverPicture} width={300} height={800} className=' lg:hidden lg:rounded-3xl rounded-xl' alt='profile' />
                    <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent rounded-b-3xl'></div>
                </div>
                : <div className='relative'>
                    <Image
                        src={'https://firebasestorage.googleapis.com/v0/b/pumpkin-web.appspot.com/o/posts%2FCImkQo7VhL6HSz8pu4sc%2Fimage?alt=media&token=8cc0a660-ca8b-461c-bfd3-a324aeeec56c'}
                        className='object-contain lg:rounded-3xl rounded-xl'
                        width={300}
                        height={800}
                    />
                    <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent rounded-b-3xl'></div>
                </div>
            }
            <span className='  bottom-5 lg:bottom-2 z-20 w-full  absolute  rounded-b-[12px] px-2 lg:px-6'>
                <div className='text-white   -space-y-1  flex px-2 flex-col w-full items-start '>
                    <div className='flex font-bold  lg:w-64 text-xs lg:text-base'>
                        <div className=' flex '>
                            <p className=' line-clamp-1 '>{name}</p>

                        </div>
                        <div className='ml-2 flex '>
                            <p className=' line-clamp-1 '>{surname}</p>
                        </div>
                    </div>
                    <div>
                        <p className='text-sm lg:text-base'>@{username}</p>
                    </div>
                    <div className='flex   pt-2 sm:text-[8px] lg:text-xs  line-clamp-1 text-nowrap space-x-2'>
                        <p className=' text-nowrap line-clamp-1'>{pumpkins} Pumkins - {hickies} Hickies</p>
                    </div>
                    <div className=' pt-4'>
                        <p className='bg-white px-2 py-1 rounded-full text-xs text-blue-600 font-bold'>New</p>
                    </div>
                </div>
            </span>
        </div>
    )
}

export default ProfileCardPro