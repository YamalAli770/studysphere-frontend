import React, { useState } from 'react';
import CommentItem from './CommentItem';

interface Comment {
  id: number;
  postId: number;
  text: string;
}

const CommentList: React.FC<{ postId: number }> = ({ postId }) => {
  const [comments, setComments] = useState<Array<Comment>>([
    { id: 1, postId: 1, text: 'First comment on post 1' },
    { id: 2, postId: 1, text: 'Second comment on post 1' },
    // Additional mock comments...
  ]);

  const postComments = comments.filter((comment) => comment.postId === postId);

  return (
    <div className='py-24'>
        <div className="container">
            <h4>Comments</h4>
            {postComments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    </div>
  );
};

export default CommentList;