import React, { useContext, useEffect } from 'react'
import "./Topbar.css"
import AddIcon from '@mui/icons-material/Add';
import { NavLink, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../../context/AuthContext';
import { logout } from '../../apiCalls';
function Topbar() {
    const { dispatch, isAuthenticated, user } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {

    }, [user])
    return (
        <div class="navbar">
            <div class="brand">
                <NavLink to="/" ><a className="navbar-brand">Campus Connect</a></NavLink>
            </div>
            <div className='right'>
                {isAuthenticated && <NavLink to="/create/post"><AddIcon style={{ color: "#ffffff", fontSize: 30 }} /></NavLink>}
                {isAuthenticated && <NavLink to={`/profile/${user?.user?.username}`}>{user?.user?.profilePicture ? (

                    <img src={'https://fair-puce-angelfish-sari.cyclic.app/images/' + user?.user.profilePicture} />

                ) : (
                    <AccountCircleIcon style={{ fontSize: 40 }} />
                )}</NavLink>}
                {isAuthenticated ? <button className='btn btn-primary' onClick={(e) => logout(e, dispatch, navigate)}>Logout</button> : <button className="btn btn-primary" onClick={() => navigate("/login")}>Log In</button>}
            </div>
        </div >
    )
}

export default Topbar