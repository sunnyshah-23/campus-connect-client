import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { getTokenFromLocalStorage } from '../../lib/common'
import { BASE_URL } from '../../lib/constant'
import Post from '../Post/Post'
import "./Feed.css"

function Feed({ username }) {
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const token = getTokenFromLocalStorage()
    const getComments = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/comment`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setComments(res.data)

        }
        catch (err) {
            console.log(err)
        }
    }
    const getPost = async () => {
        try {
            const res = username ? await axios.get(`${BASE_URL}/post/profile/` + username, {
                headers: {
                    'Access-Control-Allow-Origin': "*"
                }
            }) : await axios.get(`${BASE_URL}/post/timeline`, {
                headers: {
                    'Access-Control-Allow-Origin': "*",
                    'Cross-Origin-Resource-Policy': 'same-site'
                }
            })
            setPosts(res.data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPost()
        getComments()
    }, [username])
    return (
        <div className='feed'>
            <div class="row">
                {posts.length > 0 ? (
                    <div>
                        {posts.map((p) => (

                            <Post key={p._id} post={p} comment={comments.filter(c => c.postId == p._id.toString())} />
                            // <>
                            //     {p._id.toString() == comments[0].postId && <h1>match found</h1>}

                            // </>
                        ))}
                    </div>
                ) : <h3>No posts yet</h3>}


            </div>
        </div>
    )
}

export default Feed