import React from 'react';

interface Comment {
  id: number;
  text: string;
}

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <div className='py-24'>
        <div className="container">
            <div className="bg-gray-100 border border-gray-200 p-3 rounded-md mb-1">
                <p className="text-gray-700">{comment.text}</p>
            </div>
            
        </div>
    </div>
  );
};

export default CommentItem;