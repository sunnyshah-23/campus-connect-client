import React from 'react'
import "./Followers.css"
import profile from "../../assets/profile.JPG"
import { NavLink } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Followers({ friends }) {
    return (
        <div className='followerss'>
            <div className='detail'>
                {friends.profilePicture ? (
                    <img src={"https://unh-server.onrender.com/images/" + friends.profilePicture} />

                ) : (
                    <AccountCircleIcon className='profilepic' style={{ fontSize: "40px" }} />

                )}

                <NavLink to={`/profile/${friends.username}`} style={() => { return { textDecoration: "none", color: "#000000" } }}><p>{friends.username}</p></NavLink>
            </div>

        </div>
    )
}

export default Followers