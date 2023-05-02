import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { getTokenFromLocalStorage } from '../../lib/common'
import { BASE_URL } from '../../lib/constant'
import Post from '../Post/Post'
import "./Feed.css"
import CircularProgress from '@mui/material/CircularProgress';

function Feed({ username }) {
    const [posts, setPosts] = useState([])
    const token = getTokenFromLocalStorage()
    const [loading, setLoading] = useState(true)
    const { isAuthenticated, user: loggedInUser } = useContext(AuthContext);


    const getPost = async () => {
        try {
            let res = null

            if (username) {

                res = await axios.get(`${BASE_URL}/post/profile/` + username, {
                    headers: {
                        'Access-Control-Allow-Origin': "*"
                    }
                })
                setLoading(false)
            }
            else if (isAuthenticated) {
                console.log("isauth")
                res = await axios.get(`${BASE_URL}/post/filter`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                setLoading(false)
            }
            else {

                res = await axios.get(`${BASE_URL}/post/timeline`)
                setLoading(false)
            }

            setPosts(res.data)


        } catch (err) {
            console.log(err)
        }
    }
    const loadFeed = () => {
        if (loading) {
            return <CircularProgress value={100} thickness={4} />
        }
        else {
            if (posts.length === 0) {
                return <h1>No Posts yet</h1>
            }
            else {
                return (

                    posts.map((p) => (

                        <Post key={p._id} post={p} />

                    ))

                )
            }
        }
    }

    useEffect(() => {
        getPost()
    }, [username])

    return (
        <div className='feed'>
            <div class="row">
                {/* {posts?.length > 0 ? (
                    <div>
                        {posts.map((p) => (

                            <Post key={p._id} post={p} />

                        ))}
                    </div>
                ) : <h3>No Posts yet</h3>} */}
                {loadFeed()}
            </div>
        </div>
    )
}

export default Feed