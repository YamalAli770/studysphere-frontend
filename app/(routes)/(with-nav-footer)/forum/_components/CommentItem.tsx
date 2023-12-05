import React from 'react';
import { mentorCarouselData } from '@/data/mentor-carousel-data'

interface Comment {
  id: number;
  text: string;
  likes: number;
  author:string;
}

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <div>
        <div className="bg-gray-100 border border-gray-200 p-3 rounded-md mb-2">
        <div className="flex items-center">
        <img src={mentorCarouselData[0].src} className="rounded-full w-8 h-8 mr-2 mb-2" />
        <h3 className="text-base font-bold">{comment.author}</h3>
      </div>

          <p className="text-gray-700">{comment.text}</p>
          <span className="comment-likes">
            <i className="fa fa-heart"></i> {comment.likes}
          </span>
        </div>
      
    </div>
  );
};

export default CommentItem;