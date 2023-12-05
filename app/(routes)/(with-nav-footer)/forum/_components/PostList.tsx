"use client";
import React, { useState } from 'react';
import PostItem from './PostItem';
import { timeStamp } from 'console';

const PostList = () => {
  const [posts, setPosts] = useState<Array<{ id: number; author: string; content: string;timestamp: number; }>>([
    { id: 1, author: 'Omer', content: 'This is the first post', timestamp : Date.now()},
    { id: 2, author: 'Yamal', content: 'This is the second post', timestamp : Date.now() },
    // Additional mock posts...
  ]);

  return (
    
    <div className='py-24'>
        <div className="container">
            <h2>Posts</h2>
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    </div>
  );
};

export default PostList;