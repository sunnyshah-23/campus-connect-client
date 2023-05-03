import React from 'react'
import "./Comment.css"
import { useNavigate } from 'react-router-dom'
function Comment({ postComment }) {
    const navigate = useNavigate()
    return (
        <div className="comments">
            <h6 onClick={() => navigate(`/profile/${postComment.author}`)}>{postComment.author}</h6>&nbsp;
            <p>{postComment.comment}</p>
        </div>
    )
}

export default Comment