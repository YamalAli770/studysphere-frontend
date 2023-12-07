import React, { useState } from 'react';
import { mentorCarouselData } from '@/data/mentor-carousel-data';

interface Comment {
  id: number;
  text: string;
  likes: number;
  author: string;
}

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
  const [likes, setLikes] = useState(comment.likes);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div>
      <div className="bg-gray-100 border border-gray-200 p-3 rounded-md mb-2">
        <div className="flex items-center">
          <img src={mentorCarouselData[0].src} className="rounded-full w-8 h-8 mr-2 mb-2" />
          <h3 className="text-base font-bold">{comment.author}</h3>
        </div>

        <p className="text-gray-700">{comment.text}</p>
        <span className="comment-likes" onClick={handleLike}>
          <i className={`fa fa-heart mr-1 ${liked ? 'text-red-500' : ''}`}></i> {likes}
        </span>
      </div>
    </div>
  );
};

export default CommentItem;