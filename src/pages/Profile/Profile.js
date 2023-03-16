
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Feed from '../../component/Feed/Feed'
import Rightbar from '../../component/Rightbar/Rightbar'
import Sidebar from '../../component/Sidebar/Sidebar'
import Topbar from '../../component/Topbar/Topbar'
import { BASE_URL } from '../../lib/constant'
import "./Profile.css"
function Profile() {
    const username = useParams().username
    const [user, setUser] = useState({})
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${BASE_URL}/user?username=${username}`);
            setUser(res.data);
            console.log("profilepage-user", res.data)
        };
        fetchUser();
    }, [username]);
    return (
        <>
            <Topbar />
            <div>
                <div className='row'>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-6'>
                        <Feed username={username} />
                    </div>
                    <div className='col-md-3'>
                        <Rightbar user={user} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Profile