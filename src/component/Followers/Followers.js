import React from 'react'
import "./Followers.css"
import profile from "../../assets/profile.JPG"
import { NavLink } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Followers({ friends }) {
    console.log("followers", friends.username)
    return (
        <div className='col-md-3 followers'>
            <div className='detail'>
                {friends.profilePicture ? (
                    <img src={"http://localhost:9006/images/" + friends.profilePicture} />

                ) : (
                    <AccountCircleIcon className='profilepic' style={{ fontSize: "40px" }} />

                )}

                <NavLink to={`/profile/${friends.username}`} style={() => { return { textDecoration: "none", color: "#000000" } }}><p>{friends.username}</p></NavLink>
            </div>

        </div>
    )
}

export default Followers