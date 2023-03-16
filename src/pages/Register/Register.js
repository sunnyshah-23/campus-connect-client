import React, { useContext, useRef, useState } from 'react'
import "./Register.css"
import logo from "../../assets/unh.jpeg"
import { useNavigate } from "react-router-dom"
import { register } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
function Register() {
    const { error, dispatch } = useContext(AuthContext)
    const username = useRef()
    const name = useRef()
    const email = useRef()
    const password = useRef()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        register({ username: username.current.value, name: name.current.value, email: email.current.value, password: password.current.value }, navigate, dispatch)

    }
    return (
        <div className='register'>
            <div className='row' id="register-card">
                <div className='col-md-8'>
                    <div className="card">
                        <div className='row'>
                            <div className='col-md-6 left'>
                                <img src={logo} />
                            </div>
                            <div className='col-md-6'>
                                <h2>Register</h2>
                                {error && <p style={{ color: "red" }}>{error}</p>}
                                <form onSubmit={handleSubmit}>
                                    <div classname="row">
                                        <div className="col-md-7">
                                            <label for="exampleFormControlInput1" className="form-label">Username</label>
                                            <input type="text" required className="form-control" ref={username} />
                                        </div>
                                    </div>
                                    <div classname="row">
                                        <div className="col-md-7">
                                            <label for="exampleFormControlInput1" className="form-label">Name</label>
                                            <input type="text" required className="form-control" ref={name} />
                                        </div>
                                    </div>
                                    <div classname="row">
                                        <div className="col-md-7">
                                            <label for="exampleFormControlInput1" className="form-label">Email address</label>
                                            <input type="email" required className="form-control" placeholder="name@unh.newhaven.edu" ref={email} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-7">
                                            <label for="exampleFormControlTextarea1" className="form-label">Password</label>
                                            <input type="password" required className="form-control" ref={password} />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-3">Sign Up</button>
                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register