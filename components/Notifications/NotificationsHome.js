import React from 'react'
import NotificationItem from '../UI/Notifications/NotificationItem'
import ShooterRequest from '../UI/Pop-Up/ShooterRequest'

export default function NotificationsHome() {
    return (
        <div className='pt-24 space-y-12  relative w-full items-center'>
            <div className='space-y-2'>
                <p className='font-bold text-3xl'>Notifcations</p>
                <p className='text-gray-700'>You have 2 new notifications</p>
            </div>
            <div>
                <div>
                    <NotificationItem />
                </div>
            </div>
            <span className='absolute top-[50%] left-[15%] lg:left-[30vw]  w-full'>
                <ShooterRequest />
            </span>
        </div>
    )
}
