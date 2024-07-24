'use client'
import React, { useEffect, useState } from 'react'
import UserPost from '../UI/Post/ImagePost'

function FeedPosts() {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([]) // Corrected variable name to 'users'
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    const fetchUsersAndPosts = async () => {
      try {
        const [authRes, postRes] = await Promise.all([
          fetch('/api/auth'),
          fetch('/api/post-image')
        ]);

        const [authData, postData] = await Promise.all([
          authRes.json(),
          postRes.json()
        ]);

        setUsers(authData);
        setPosts(postData);

        // Process and match posts with users
        const processedPosts = postData.map(post => {
          const user = authData.find(user => user.email === post.email);
          return {
            ...post,
            profilePicture: user?.profilePicture,
            name: user?.name,
            surname: user?.surname
          };
        });

        setUserPosts(processedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsersAndPosts();
  }, []);

  return (
    <div>
      {userPosts.map(post => (
        <UserPost 
          key={post.id} 
          username={post.name} 
          surname={post.surname}
          email={post.email}
          caption={post.caption} 
          image={post.imagePost} 
          profilePicture={post.profilePicture} // Assuming UserPost component can handle this prop
        />
      ))}
    </div>
  )
}

export default FeedPosts
