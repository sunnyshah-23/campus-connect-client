import React, { useContext, useEffect, useRef, useState } from 'react'
import img from "../../assets/doremon.png"
import "./Post.css"
import { format } from "timeago.js";
import Comment from "./Comment"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
import { BASE_URL } from '../../lib/constant';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getTokenFromLocalStorage } from '../../lib/common';
import ScrollToTopOnMount from "../../component/Scroll/ScrollToTopOnMount"
function Post({ post }) {

    const [postComment, setPostComment] = useState([])
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const token = getTokenFromLocalStorage()
    const content = useRef()
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
    const handleKeyPress = (e) => {

        if (e.key === 'Enter') {
            addComment()
        }
    }
    const getUpdatedComment = async () => {
        const res = await axios.get(`${BASE_URL}/comment/${post._id.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`,

            }
        }).then((res) => {
            console.log(res)
            setPostComment(res.data)

        }).catch(err => console.log(err))
    }
    const addComment = async (e) => {

        axios.post(`${BASE_URL}/comment`, { postId: post._id.toString(), author: loggedInUser?.user.username, comment: content.current.value },
            {
                headers: {
                    Authorization: `Bearer ${token}`,

                }
            })
            .then((res) => {
                content.current.value = ''
                getUpdatedComment()
            })
            .catch((err) => console.log(err))
    }
    const likeHandler = () => {
        try {
            axios.put(`${BASE_URL}/post/like/` + post._id, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,

                }
            });
        } catch (err) { }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    useEffect(() => {
        getUser()
        getUpdatedComment()
    }, [])
    return (
        <div className="post">
            <ScrollToTopOnMount />
            <div className='row'>
                <div className='col-md-7'>
                    <div className='card'>
                        <div className='header'>

                            {user.profilePicture ? (
                                <img src={'http://3.19.255.76:9006/images/' + user.profilePicture} />
                            ) : (
                                <AccountCircleIcon />
                            )}
                            {isAuthenticated ? (
                                <div>
                                    <NavLink to={`/profile/${user.username}`} className="username" style={{ textDecoration: "none", color: "#000000", display: "flex" }}>
                                        <h5>{user.username}</h5> <span className="dot">.</span>  <span className="postDate">{format(post.createdAt)}</span>
                                    </NavLink>
                                </div>
                            ) : (
                                <div>
                                    <NavLink to="/login" style={{ textDecoration: "none", color: "#000000", display: "flex" }}>
                                        <h5>{user.username}</h5>  <span className="dot">.</span> <span className="postDate">{format(post.createdAt)}</span>
                                    </NavLink>
                                </div>
                            )}
                        </div>
                        <NavLink target="_blank" to={post?.link}><img className='card-img-top' src={'http://3.19.255.76:9006/images/' + post.img} /></NavLink>

                        <div className='card-body'>
                            {isAuthenticated ? isLiked ? <FavoriteIcon style={{ color: "red" }} onClick={likeHandler} /> : <FavoriteBorderIcon onClick={likeHandler} /> : <></>}

                            <h6>Likes: {like}</h6>
                            <div className="caption">
                                <h6>{user.username}</h6>

                                <p>{post.desc}</p>
                            </div>
                            {isAuthenticated && (
                                <div className='comment-add mt-2'>
                                    <input type="text" placeholder='Add a comment..' ref={content} onKeyDown={handleKeyPress} />
                                    {/* <button onClick={(e) => addComment(e)}>Add</button> */}
                                </div>
                            )}

                            <div className="row">
                                {postComment.map((c) => (
                                    <Comment postComment={c} />

                                ))}


                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Post