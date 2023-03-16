import React, { useContext, useEffect, useState } from 'react'
import img from "../../assets/doremon.png"
import "./Post.css"
import Comment from "./Comment"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
import { BASE_URL } from '../../lib/constant';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getTokenFromLocalStorage } from '../../lib/common';
function Post({ post, comment }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const token = getTokenFromLocalStorage()

    const [user, setUser] = useState({})
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const { isAuthenticated, user: loggedInUser } = useContext(AuthContext);


    const getUser = async () => {
        const res = await axios.get(`${BASE_URL}/user?userId=${post.userId}`)
        setUser(res.data)
    }
    useEffect(() => {

        let loggeinUserid = loggedInUser?.user._id.toString()
        setIsLiked(post.likes.includes(loggeinUserid));
    }, [post.likes]);

    const likeHandler = () => {
        try {
            axios.put(`${BASE_URL}/post/like/` + post._id, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Access-Control-Allow-Origin': "*"
                }
            });
        } catch (err) { }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    useEffect(() => {
        getUser()
    }, [])
    return (
        <div className="post">
            <div className='row'>
                <div className='col-md-7'>
                    <div className='card'>
                        <div className='header'>
                            <AccountCircleIcon />
                            {isAuthenticated ? <NavLink to={`/profile/${user.username}`} className="username" style={() => { return { textDecoration: "none", color: "#000000" } }}><h5>{user.username}</h5></NavLink> : <NavLink to="/login" style={() => { return { textDecoration: "none", color: "#000000" } }}> <h5>{user.username}</h5></NavLink>}
                        </div>
                        <div className='card-body'>
                            <div>
                                <img src={'http://localhost:9005/images/' + post.img} />
                            </div>

                            {isAuthenticated ? isLiked ? <FavoriteIcon style={{ color: "red" }} onClick={likeHandler} /> : <FavoriteBorderIcon onClick={likeHandler} /> : <></>}

                            <h6>Likes: {like}</h6>
                            <div className="caption">
                                <h6>{user.username}</h6>
                                <p>{post.desc}</p>
                            </div>
                            {isAuthenticated && (
                                <div className='comment-add mt-2'>
                                    <input type="text" placeholder='Add a comment..' />
                                </div>
                            )}

                            <div class="row">
                                <Comment />
                                <Comment />
                                <Comment />

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Post