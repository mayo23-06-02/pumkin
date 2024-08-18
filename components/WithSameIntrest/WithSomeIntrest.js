'use client'
import React, { useEffect, useState } from 'react'
import ProfileCard from '../UI/Card/ProfileCard'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from 'next/navigation';
import { useCookies } from 'next-client-cookies'

function WithSomeInterest() {
    const cookies = useCookies();
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

    const selectedUserEmail = "emily.johnson@example.com"

    useEffect(() => {
        // const userData = cookies.get('userData')
        // if (userData) {
        //     setUser(JSON.parse(userData))
        // }
        fetch('/api/auth')
            .then((res) => res.json())
            .then((data) => {
                // Filter out the user with the selectedUserEmail
                const filteredUsers = data.filter(u => u.email !== selectedUserEmail);
                // Randomize the order of the users
                const randomizedUsers = filteredUsers.sort(() => Math.random() - 0.5);
                setUsers(randomizedUsers)
            })
    }, [cookies])

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };

    return (
        <div className='max-w-[100vw]  px-6 pt-6 lg:p-0 lg:max-w-[1280px]'>
            <p className='text-xl  lg:py-12 py-8  font-bold text-[#2C2A2A]'>People With Some Interest</p>
            <div className=''>
                <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    infinite={true}
                    responsive={responsive}
                    className=''>
                    {users.map((user) => (
                        <div key={user._id}>
                            <ProfileCard
                                username={user.username}
                                surname={user.surname}
                                name={user.name}
                                image={user.profilePicture}
                                id={user._id}
                                hickies={user.hickies}
                                pumpkins={user.pumpkins}
                                dob={user.dob}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default WithSomeInterest