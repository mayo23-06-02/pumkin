'use client'
import React, { useEffect, useState } from 'react'
import NotificationItem from '../UI/Notifications/NotificationItem'
import { useCookies } from 'next-client-cookies'

export default function NotificationsHome() {

    const [userNotifications, setUserNotifications] = useState([])
    const [unseenNotifications, setUnseenNotifications] = useState([])
    const cookies = useCookies()

    useEffect(() => {
        const email = cookies.get('email')

        const fetchNotifications = async () => {
            try {
                const [shooterResponse, pumpkinResponse] = await Promise.all([
                    fetch('/api/shooter'),
                    fetch('/api/pumpkin')
                ]);

                const shooterData = await shooterResponse.json();
                const pumpkinData = await pumpkinResponse.json();

                // Combine the notifications
                const combinedNotifications = [...shooterData, ...pumpkinData];

                // Filter notifications for the current user and sort by timestamp
                const selectedNotifications = combinedNotifications
                    .filter(post => post.email === email)
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

                setUserNotifications(selectedNotifications);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, [cookies]);

    useEffect(() => {
        const unseenNotifications = userNotifications.filter(post => !post.seen);
        
        if (unseenNotifications.length > 0) {
            setUnseenNotifications(unseenNotifications);

            // Update the status of unseen notifications
            unseenNotifications.forEach(async (notification) => {
                await handleSubmitStatus(notification._id);
            });
        }
    }, [userNotifications]);

    async function handleSubmitStatus(_id) {
        try {
            await fetch("/api/shooter", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: _id,
                    seen: true,
                }),
            });
        } catch (error) {
            console.error("Error updating notification status:", error);
        }
    }

    function extractTimeFromTimestamp(timestamp) {
        const dateObject = new Date(timestamp);
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`; // Zero-padded minutes
    }

    if (!userNotifications.length) return <div>No notifications</div>

    return (
        <div className='lg:pt-24 pt-6 space-y-12 relative w-full items-center'>
            <div className='space-y-2 px-6'>
                <p className='font-bold text-3xl'>Notifications</p>
                <p className='text-gray-700'>You have {unseenNotifications.length} new notifications</p>
            </div>
            <div>
                {userNotifications.map(post => (
                    <NotificationItem
                        key={post._id}
                        profilePicture={post.senderData.profilePicture}
                        name={post.name}
                        surname={post.surname}
                        time={extractTimeFromTimestamp(post.timestamp)}
                        senderData={post.senderData}
                        shooter={post.shooter}
                     
                    />
                ))}
            </div>
        </div>
    )
}