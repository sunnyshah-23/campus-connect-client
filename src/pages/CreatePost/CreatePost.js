import React, { useContext, useRef, useState } from 'react'
import Topbar from "../../component/Topbar/Topbar"
import Sidebar from "../../component/Sidebar/Sidebar"
import "./CreatePost.css"
import { Cancel, PermMedia } from '@mui/icons-material'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../lib/constant'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../../lib/common'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function CreatePost() {
    const [file, setFile] = useState(null)
    const desc = useRef('')
    const link = useRef('')
    const formref = useRef()
    const [postError, setPostError] = useState(null)
    const { user } = useContext(AuthContext)
    const token = getTokenFromLocalStorage()
    const submitHandler = async (e) => {
        e.preventDefault()
        const Post = {
            userId: user.user._id,
            desc: desc.current.value
        }
        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file", file)
            try {
                await axios.post(`${BASE_URL}/upload`, data)

            } catch (err) {
                setPostError(err)
            }
            try {
                Post.img = filename
                await axios.post(`${BASE_URL}/post`, Post, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                toast("Post uploaded successfully")
                formref.current.reset()
                setFile(null)
                setPostError(null)
            } catch (err) {
                setPostError(err)
            }
        }
        else {
            setPostError("Please upload a file")
        }
    }
    return (
        <>
            <Topbar />
            <div className='row'>
                <div className='col-md-3'>
                    <Sidebar />
                </div>

                <div className='col-md-6'>
                    <ToastContainer toastStyle={{ backgroundColor: "#56B55E", color: "#ffffff" }} />
                    {file && (
                        <div className="shareImgContainer">
                            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                        </div>
                    )}
                    {postError && (
                        <h1 style={{ color: "red" }}>{postError}</h1>
                    )}
                    <div class="create-post">
                        <form onSubmit={submitHandler} ref={formref}>

                            <label htmlFor="file" className="btn btn-primary mb-3">Upload Image</label>
                            <input
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                            <div classname="row">
                                <div className="col-md-7">
                                    <label for="exampleFormControlInput1" className="form-label">Caption</label>
                                    <textarea className="form-control" placeholder="Description" ref={desc}></textarea>
                                </div>
                                <div className="col-md-7">
                                    <label for="exampleFormControlInput1" className="form-label">Link</label>
                                    <input className="form-control" placeholder="Place your research/project link here" ref={link} />
                                </div>
                                {/* <div className="col-md-7">
                                <label for="exampleFormControlInput1" className="form-label mt-3">Post Category:</label>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-danger dropdown-toggle" style={{ marginLeft: 10 }} data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Select
                                    </button>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Separated link</a>
                                    </div>
                                </div>
                            </div> */}
                            </div>
                            <button type="Submit" className="btn btn-primary">Create Post</button>
                        </form>

                    </div>

                </div>
            </div>
        </>
    )
}

export default CreatePost