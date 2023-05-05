
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Sidebar from '../../component/Sidebar/Sidebar'
import Topbar from '../../component/Topbar/Topbar'
import { AuthContext } from '../../context/AuthContext'
import { getTokenFromLocalStorage } from '../../lib/common'
import { BASE_URL } from '../../lib/constant'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ToastContainer, toast } from 'react-toastify';

import "./accountedit.css"
import { updateUser } from '../../apiCalls'


function AccountEdit() {
    const token = getTokenFromLocalStorage()
    const { user: loggedInUser, dispatch } = useContext(AuthContext)
    const [file, setFile] = useState(null)
    const [error, setError] = useState("")
    const major = useRef()
    const city = useRef()
    const origin = useRef()
    const password = useRef()
    const [user, setUser] = useState({})
    const getUser = async () => {
        const res = await axios.get(`${BASE_URL}/user?username=${loggedInUser?.user.username}`)
            .then((res) => setUser(res.data))
            .catch((e) => console.log(e));

    }
    useEffect(() => {

    }, [loggedInUser])
    const update = async (e) => {
        e.preventDefault()
        let updateValues = {}
        if (password.current.value) {
            updateValues = {
                city: city.current.value,
                origin: origin.current.value,
                major: major.current.value,
                password: password.current.value
            }
        }
        else {
            updateValues = {
                city: city.current.value,
                origin: origin.current.value,
                major: major.current.value,

            }
        }
        if (file) {
            const data = new FormData()
            const filename = Date.now() + "profilepic" + file.name
            data.append("name", filename)
            data.append("file", file)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            try {
                await axios.post(`${BASE_URL}/upload`, data)
                updateValues.profilePicture = filename

            } catch (err) {
                setError(err)
                setFile(null)
            }
        }
        if (!error) {
            const res = await axios.put(`${BASE_URL}/user/${loggedInUser?.user._id}`,
                updateValues
                , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((res) => {
                    setFile(null)
                    updateUser(dispatch, res.data)
                    toast("Profile Update")
                }).catch(err => console.log(err))
        }

    }
    return (
        <div>
            <Topbar />
            <div class="row">
                <div className='col-md-4'>
                    <Sidebar />
                </div>
                <div className='col-md-6'>
                    <ToastContainer toastStyle={{ backgroundColor: "#56B55E", color: "#ffffff" }} />
                    {error && <h5>{error}</h5>}
                    <form>
                        {loggedInUser?.user?.profilePicture ? (
                            <div>
                                <label htmlFor="file" className="profilepic">
                                    {file ? (
                                        <img src={URL.createObjectURL(file)} />
                                    ) : (
                                        <img src={'https://fair-puce-angelfish-sari.cyclic.app/images/' + loggedInUser?.user.profilePicture} />
                                    )}
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    accept=".png,.jpeg,.jpg"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />

                            </div>
                        ) : (
                            <div>
                                <label htmlFor='file'>
                                    <AccountCircleIcon style={{ fontSize: "100px", cursor: "pointer" }} />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    accept=".png,.jpeg,.jpg"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />

                            </div>
                        )}
                        {file && (
                            <div className='col-md-4 update_btn'>
                                <button className='btn btn-primary' onClick={() => setFile(null)}>Cancel</button>
                            </div>
                        )}
                        {loggedInUser?.user && (

                            <div className='edit'>
                                <form>
                                    <div className="row">
                                        <div className="col-md-7">
                                            <label for="exampleFormControlTextarea1" className="form-label">Major</label>
                                            <input required type="text" className="form-control" id="exampleFormControlTextarea1" defaultValue={loggedInUser?.user.major} ref={major} />
                                        </div>
                                        <div className="col-md-7">
                                            <label for="exampleFormControlTextarea1" className="form-label">Origin</label>
                                            <input required type="text" className="form-control" id="exampleFormControlTextarea1" defaultValue={loggedInUser?.user.origin} ref={origin} />
                                        </div>
                                        <div className="col-md-7">
                                            <label for="exampleFormControlTextarea1" className="form-label">City</label>
                                            <input required type="text" className="form-control" id="exampleFormControlTextarea1" defaultValue={loggedInUser?.user.city} ref={city} />
                                        </div>
                                        <div className="col-md-7">
                                            <label for="exampleFormControlTextarea1" className="form-label">New Password</label>
                                            <input type="password" className="form-control" id="exampleFormControlTextarea1" ref={password} />
                                        </div>
                                        <div className='form-label'>
                                            <button type="submit" className='btn btn-primary' onClick={update} style={{ marginTop: "10px" }}>Update</button>
                                        </div>
                                    </div>
                                </form>

                            </div>

                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AccountEdit