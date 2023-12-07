import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { mentorCarouselData } from '@/data/mentor-carousel-data';

interface CreatePostProps {
  onCreatePost: (newPost: { author: string; content: string }) => void;
  posts: Array<{
    id: number;
    author: string;
    content: string;
    likes: number;
    comments: number;
  }>;
  currentUser: string; 
}

const CreatePost: React.FC<CreatePostProps> = ({ onCreatePost, posts, currentUser }) => {
  const [newPost, setNewPost] = useState({
    author: currentUser, // Use the provided signed-in user's name
    content: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleCreatePost = () => {
    onCreatePost(newPost);
    setNewPost({ author: currentUser, content: '' }); // Update author to the signed-in user again
  };

  return (
    <div className="bg-white border border-gray-200 p-4 rounded-md shadow-md mb-4">
      <div className="flex items-center">
        <img src={mentorCarouselData[0].src} alt={newPost.author} className="rounded-full w-8 h-8 mr-2 mb-2" />
        <span className="text-lg font-bold">{newPost.author}</span>
      </div>

      <textarea
        name="content"
        placeholder="Post content"
        value={newPost.content}
        onChange={handleChange}
        className="text-gray-700 mb-2 outline-none"
      ></textarea>
      <div className="interaction-icons">
        <button onClick={handleCreatePost} className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Create Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;