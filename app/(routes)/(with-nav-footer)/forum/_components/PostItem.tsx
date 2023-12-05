import React, { useState } from 'react';
import CommentList from './CommentList';
import '@fortawesome/fontawesome-free/css/all.css';
import { mentorCarouselData } from '@/data/mentor-carousel-data'

interface Post {
  id: number;
  content: string;
  author: string;  
  likes: number;
  comments: number;
}

const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.likes);


  const handleLike = () => {
    
    
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div>
        <div className="bg-white border border-gray-200 p-4 rounded-md shadow-md mb-4">
        
        <div className="flex items-center">
        <img src={mentorCarouselData[0].src} alt={post.author} className="rounded-full w-8 h-8 mr-2 mb-2" />
        <h3 className="text-lg font-bold">{post.author}</h3>
      </div>

          <p className="text-gray-700 mb-2">{post.content}</p>
          <div className="interaction-icons">
            <span className="like-icon mr-2" onClick={handleLike}>
              <i className="fa fa-heart"></i> {post.likes}
            </span>
            <span className="comment-icon" onClick={toggleComments}>
              <i className="fa fa-comment"></i> {post.comments}
            </span>
          </div>
          {showComments && <CommentList postId={post.id} />}
        </div>
      
    </div>
  );
};

export default PostItem;