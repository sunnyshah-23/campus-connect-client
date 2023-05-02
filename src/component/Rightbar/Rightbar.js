

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { getTokenFromLocalStorage } from '../../lib/common'
import { BASE_URL } from '../../lib/constant'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom'
import Followers from '../Followers/Followers'
import "./Rightbar.css"
import { NavLink } from 'react-router-dom';


function Rightbar({ user }) {
    const [file, setFile] = useState(null)
    const { navigate } = useNavigate()
    const [postError, setPostError] = useState("")
    const token = getTokenFromLocalStorage()
    const [followings, setFollowings] = useState([])
    const [followers, setFollowers] = useState([])
    const { user: loggedInUser, dispatch } = useContext(AuthContext)
    const [followed, setFollowed] = useState(
        loggedInUser.user.followings.includes(user._id)
    );

    const cancelProfile = () => {
        setFile(null)
    }
    const updateProfile = async (e) => {
        e.preventDefault()
        if (file) {
            const data = new FormData()
            const filename = Date.now() + "profile" + file.name
            data.append("name", filename)
            data.append("file", file)
            try {
                await axios.post(`${BASE_URL}/upload`, data)

            } catch (err) {
                setPostError(err)
            }

        }

    }

    const handleClick = async () => {
        try {
            if (followed) {
                await axios.put(`${BASE_URL}/user/unfollow`, {
                    id: user._id
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
                await axios.put(`${BASE_URL}/user/follow`, {
                    id: user._id
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                dispatch({ type: "FOLLOW", payload: user._id });
            }
            setFollowed(!followed);
        } catch (err) {
        }
    }
    const getFriends = async () => {
        const res = await axios.get(`${BASE_URL}/user/friends/` + user._id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setFollowings(res.data.friendList)
        setFollowers(res.data.followersList)
    }
    useEffect(() => {
        setFollowed(loggedInUser.user.followings.includes(user._id));
    }, [loggedInUser.user.followings, user._id]);
    useEffect(() => {
        getFriends()

    }, [user, followed])
    return (
        <div className='rightbar'>


            {user.username === loggedInUser.user.username && (
                <div className='edit_profile row'>
                    <div className='col-md-4'>
                        {user.profilePicture ? (
                            <img className="profilepicutre" src={'https://unh-server.onrender.com/images/' + user.profilePicture} />
                        ) : (

                            <AccountCircleIcon className='profilepic' style={{ fontSize: "70px" }} />
                        )}
                    </div>
                    <div className='col-md-4'>
                        {loggedInUser?.user.username}
                    </div>
                    <div className='col-md-4'>
                        <NavLink to="/account/edit"> <button className='btn btn-primary' >Edit</button></NavLink>
                    </div>

                </div>
            )}
            <div className="row details">


                <div className='col-md-6'>

                    {loggedInUser.user.username !== user.username && (
                        <button className='btn btn-primary' onClick={handleClick}>{followed ? "Unfollow" : "Follow"}</button>
                    )}
                </div>
                <div className='col-md-12'>
                    <b>Email:</b>{user.email}<br />
                    <b>Major:</b> {user.major}<br />
                    <b>Origin:</b>{user.origin}<br />
                    <b>City:</b> {user.city}
                </div>
                <div className='followers'>
                    <b>Followers:{followers.length}</b>
                    <div className='row'>
                        {followers.length > 0 && (
                            <div>
                                {followers.map((friend) => (<Followers key={friend._id} friends={friend} />))}
                            </div>
                        )}

                    </div>
                </div>
                <div className='following'>
                    <b>Following:{followings.length}</b>
                    <div className='row'>
                        {followings.length > 0 && (
                            <div>
                                {followings.map((friend) => (<Followers key={friend._id} friends={friend} />))}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rightbar