import React from 'react'
import { useContext, useRef } from "react"
import { loginCall } from "../../apiCalls"
import { AuthContext } from '../../context/AuthContext'
import LoopIcon from '@mui/icons-material/Loop';
import "./Login.css"
import logo from "../../assets/unh.jpeg"
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
function Login() {
    const email = useRef()
    const password = useRef()
    const { isFetching, error, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        loginCall({
            email: email.current.value,
            password: password.current.value
        }, dispatch, navigate)
    }
    return (
        <div className='login'>
            <div className='row' id="login-card">
                <div className='col-md-8'>
                    <div className="card">
                        <div className='row'>
                            <div className='col-md-6 left'>
                                <img src={logo} />
                            </div>
                            <div className='col-md-6'>
                                <h2>Login</h2>
                                <form onSubmit={handleClick}>
                                    {error && <p style={{ color: "red" }}>{error}</p>}
                                    <div classname="row">
                                        <div className="col-md-7">
                                            <label for="exampleFormControlInput1" className="form-label" >Email address</label>
                                            <input type="email" className="form-control" id="exampleFormControlInput1" ref={email} placeholder="jane@unh.newhaven.edu" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-7">
                                            <label for="exampleFormControlTextarea1" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="exampleFormControlTextarea1" ref={password} />
                                        </div>
                                    </div>
                                    <button type="submit" disabled={isFetching} className="btn btn-primary mt-3 ">{
                                        isFetching ? (<LoopIcon />) : ("Log In")
                                    }</button>
                                </form>
                                <hr />
                                {isFetching ? (<LoopIcon />) : (
                                    <p>Dont have an account?&nbsp;<NavLink to="/register">Sign up</NavLink></p>
                                )}

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login