import React, { useState, useEffect } from "react";
import { commentService } from "../services/CommentService";
import useAuth from "../hooks/useAuth";
import { authService } from "../services/AuthService";
import Button from 'react-bootstrap/Button';

export default function Comments(galley_id) {
    const { user } = useAuth();
    const [comments, setComments] = useState();
    const [newComment, setNewComment] = useState({
        user_id: user.id,
        gallery_id: galley_id.galley_id,
        comment: ""
    });

    const handleGetComments = async () => {
        const commentsData = await commentService.get(galley_id.galley_id)
        setComments(commentsData.comment)
    };
    const handleChange = async (e) => {
        e.preventDefault();
        const data = await commentService.add(newComment);
        data.comment.user = user;
        comments.push(data.comment);
        setComments(comments)
        setNewComment({
            user_id: user.id,
            gallery_id: galley_id.galley_id,
            comment: ""
        });
    }
   
    const handleRemoveComment = async (commentId) => {
        const response = window.confirm(
            'Are you sure you want to delete comment?'
        );
        if (response === 'Ok') {
            return;
        }
        const data = await commentService.delete(commentId);
        if (data.status === 'success') {
            setComments(comments.filter(({ id }) => id !== commentId));
        }
    };


    useEffect(() => {
        handleGetComments();
    }, []);

    return (
        <div>
            <ul>
                {comments && comments.map((comment) =>
                    <li key={comment.id}>
                        <div><h3>Author:{comment.user.name}</h3>
                            <p>Created at:{comment.created_at}</p>
                            <p>Comment:{comment.comment}</p>
                            {user.id === comment.user.id ? <Button onClick={() => handleRemoveComment(comment.id)}>Delete comment</Button> : ""}
                        </div></li>)}
            </ul>
            <div>
                <input
                    required
                    type="text"
                    aria-label="text"
                    minLength='1'
                    maxLength='1000'
                    value={newComment.comment}
                    onChange={({ target }) =>
                        setNewComment({ ...newComment, comment: target.value })
                    } />
                <Button onClick={handleChange}> Add Comment</Button>
            </div>
        </div>
    )
}