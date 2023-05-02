
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import CreatePost from './pages/CreatePost/CreatePost';
import { getTokenFromLocalStorage } from './lib/common';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';
import { BASE_URL } from "./lib/constant"
import AccountEdit from './pages/AccountEdit/AccountEdit';



function App() {
  const { dispatch, isAuthenticated } = useContext(AuthContext)
  const getUser = async () => {
    let token = getTokenFromLocalStorage()
    if (token) {
      try {
        const res = await axios.get(`${BASE_URL}/user/getUser`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE" })
      }


    } else {
      dispatch({ type: "LOGIN_FAILURE" })
    }
  }
  useEffect(() => {
    getUser()
  }, [])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={isAuthenticated ? <Home /> : <Login />}></Route>
          <Route exact path="/register" element={isAuthenticated ? <Home /> : <Register />}></Route>
          <Route exact path="/profile/:username" element={isAuthenticated ? <Profile /> : <Login />}></Route>
          <Route exact path="/create/post" element={<CreatePost />}></Route>
          <Route exact path="/account/edit" element={isAuthenticated ? <AccountEdit /> : <Login />}></Route>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
