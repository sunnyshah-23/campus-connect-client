import React from 'react'
import "./Followers.css"
import profile from "../../assets/profile.JPG"
import { NavLink } from 'react-router-dom'
function Followers({ friends }) {
    console.log("followers", friends.username)
    return (
        <div className='col-md-3 followers'>
            <div className='detail'>
                <img src={profile} />

                <NavLink to={`/profile/${friends.username}`} style={() => { return { textDecoration: "none", color: "#000000" } }}><p>{friends.username}</p></NavLink>
            </div>

        </div>
    )
}

export default Followers