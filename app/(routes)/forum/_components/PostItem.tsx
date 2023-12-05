import React, { useState } from 'react';
import CommentList from './CommentList';

interface Post {
  id: number;  
  content: string;
  author: string;
  timestamp: number;
}

const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className='py-24'>
        <div className="container">
            <div className="bg-white border border-gray-200 p-4 rounded-md shadow-md mb-0">
                <h3 className="text-lg font-bold mb-2">{post.author} at {post.timestamp}</h3>
                <p className="text-gray-700 mb-2">{post.content}</p>
                <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                onClick={() => setShowComments(!showComments)}>
                    
                    {showComments ? 'Hide Comments' : 'Show Comments'}
                </button>
                {showComments && <CommentList postId={post.id} />}
            </div>
            
        </div>
    </div>
  );
};

export default PostItem;