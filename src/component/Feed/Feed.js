import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { getTokenFromLocalStorage } from '../../lib/common'
import { BASE_URL } from '../../lib/constant'
import Post from '../Post/Post'
import "./Feed.css"

function Feed({ username }) {
    const [posts, setPosts] = useState([])
    const token = getTokenFromLocalStorage()
    const { isAuthenticated, user: loggedInUser } = useContext(AuthContext);


    const getPost = async () => {
        try {
            let res = null

            if (username) {
                console.log("username")
                res = await axios.get(`${BASE_URL}/post/profile/` + username, {
                    headers: {
                        'Access-Control-Allow-Origin': "*"
                    }
                })
            }
            else if (isAuthenticated) {
                console.log("isauth")
                res = await axios.get(`${BASE_URL}/post/filter`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            }
            else {

                res = await axios.get(`${BASE_URL}/post/timeline`)
            }
            // const res = username ? await axios.get(`${BASE_URL}/post/profile/` + username, {
            //     headers: {
            //         'Access-Control-Allow-Origin': "*"
            //     }
            // }) : await axios.get(`${BASE_URL}/post/timeline`, {
            //     headers: {
            //         'Access-Control-Allow-Origin': "*",
            //         'Cross-Origin-Resource-Policy': 'same-site'
            //     }
            // })
            setPosts(res.data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

        getPost()
    }, [username])
    return (
        <div className='feed'>
            <div class="row">
                {posts.length > 0 ? (
                    <div>
                        {posts.map((p) => (

                            <Post key={p._id} post={p} />

                        ))}
                    </div>
                ) : <h3>No posts yet</h3>}


            </div>
        </div>
    )
}

export default Feed