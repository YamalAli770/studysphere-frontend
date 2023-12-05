import React, { useState } from 'react';
import CommentItem from './CommentItem';

interface Comment {
  id: number;
  author:string;
  postId: number;
  text: string;
  likes: number;
}

const CommentList: React.FC<{ postId: number }> = ({ postId }) => {
  const [comments, setComments] = useState<Array<Comment>>([
    { id: 1, author:'Omer Siddiqui', postId: 1, text: 'I studied in Europe and it was an amazing experience!', likes: 0 },
    { id: 2, author:'Osama Nasim',postId: 1, text: 'Canberra University in Australia has a great program for international students.', likes: 0 },
    { id: 3, author:'Yamal Ali',postId: 2, text: 'Canberra University in Australia has a great program for international students.', likes: 0 },
    { id: 4, author:'Omer Siddiqui', postId: 2, text: 'Canberra University in Australia has a great program for international students.', likes: 0 },
    
  ]);

  const postComments = comments.filter((comment) => comment.postId === postId);

  const handleLike = (commentId: number) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
      <>
        <h4>Comments</h4>
        {postComments.map((comment) => (
          <div key={comment.id} className="comment">
            <CommentItem comment={comment} />
            <span className="comment-like-icon" onClick={() => handleLike(comment.id)}>
              
            </span>
          </div>
        ))}
      </>
  )
};

export default CommentList;