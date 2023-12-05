"use client";
import React, { useState } from 'react';
import PostItem from './PostItem';


const PostList = () => {
  const [posts, setPosts] = useState<Array<{
    id: number;
    author: string;
    content: string;    
    likes: number;
    comments: number;
  }>>([
    { id: 1, author: 'Omer Siddiqui', content: 'I\'m considering studying abroad next year. Any recommendations for programs in Europe?', likes: 0, comments: 0 },
    { id: 2, author: 'Yamal Ali', content: 'Has anyone studied in Australia? What was your experience like?',  likes: 0, comments: 0 },
    { id: 3, author: 'Osama Nasim', content: 'Looking for advice on the best universities in Canada for Computer Science.', likes: 0, comments: 0 },
    { id: 4, author: 'Osama Nasim', content: 'Thinking of studying languages abroad. Any suggestions?',  likes: 0, comments: 0 },
   
  ]);

  const handleLike = (postId: number) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  

  return (
    <div>
        <h2 className="text-2xl font-bold mb-4 text-center">Forum</h2>
        {posts.map((post) => (
          <div key={post.id} className="post">
            <PostItem post={post} />           
          </div>
        ))}
      
    </div>
  );
};

export default PostList;