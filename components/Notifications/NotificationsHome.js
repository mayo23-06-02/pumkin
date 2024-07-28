'use client'
import React, { useEffect, useState } from 'react'
import NotificationItem from '../UI/Notifications/NotificationItem'
import ShooterRequest from '../UI/Pop-Up/ShooterRequest'
import { useCookies } from 'next-client-cookies'

export default function NotificationsHome() {

    const [shooterNotification, setShooterNotification] = useState([])
    const [userNotifications, setUserNotifications] = useState([])
    const [unseenNotifications, setUnseenNotifications] = useState([])
    const cookies = useCookies()

    useEffect(() => {
        const email = cookies.get('email')
        console.log(email);
        fetch('/api/shooter')
            .then((res) => res.json())
            .then((data) => {
                setShooterNotification(data)
                const selectedNotifications = data.filter(
                    (post) => post.email === email
                );

                console.log(selectedNotifications);
                if (selectedNotifications.length > 0) {
                    setUserNotifications(selectedNotifications.reverse());
                }
            })


    }, [])

    useEffect(() => {
        const unseenNotifications = userNotifications.filter(
          (post) => post.seen === false
        );
      
        if (unseenNotifications.length > 0) {
          setUnseenNotifications(unseenNotifications);
      
          // Iterate through each unseen notification and update its status
          unseenNotifications.forEach(async (notification) => {
            await handleSubmitStatus(notification._id);
          });
        }
      }, [userNotifications]);
      
      async function handleSubmitStatus(_id) {
        try {
          // Make a PUT request to update the notification status
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
        const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`; // Ensure minutes are zero-padded if needed
        return formattedTime;
      }

    console.log(unseenNotifications, "sila");

    if (!userNotifications) return <div>No notifications</div>

    return (
        <div className='lg:pt-24 pt-6 space-y-12  relative w-full items-center'>
            <div className='space-y-2 px-6'>
                <p className='font-bold text-3xl'>Notifcations</p>
                <p className='text-gray-700'>You have {unseenNotifications.length} new notifications</p>
            </div>
            <div>
                <div>
                   {userNotifications.map((post) => (
                        <NotificationItem
                            key={post._id}
                            profilePicture={post.senderData.profilePicture}
                            name={post.name}
                            surname={post.surname}
                            time={extractTimeFromTimestamp(post.timestamp)}
                            senderData={post.senderData}
                            message={post.shooter.message}
                            specialName={post.shooter.specialName}
                            hint={post.shooter.hint}
                        />
                    ))}
                </div>
            </div>
            
        </div>
    )
}
