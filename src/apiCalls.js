import axios from "axios"
import { removeTokenFromLocalStorage, storeTokenInLocalStorage } from "./lib/common"
import { BASE_URL } from "./lib/constant"
export const loginCall = async (userCredential, dispatch, navigate) => {

    dispatch({ type: "LOGIN_START" })
    try {
        const res = await axios.post(`${BASE_URL}/auth/login`, userCredential)
        console.log(res.data)
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data })

        storeTokenInLocalStorage(res.data.accessToken)
        navigate("/")

    } catch (err) {

        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data.msg })

    }
}

export const getUser = async (token, dispatch) => {
    console.log("getUser", token)
    try {
        const res = await axios.get("http://localhost:9005/api/user/getUser", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE" })
    }
}

export const register = async (userCredential, navigate, dispatch) => {
    // dispatch({ type: "REGISTER_START" })
    try {
        const res = await axios.post(`${BASE_URL}/auth/register`, userCredential)
        dispatch({ type: "REGISTER_SUCCESS" })
        navigate("/login")
    } catch (err) {
        console.log(err.response.data.msg)
        dispatch({ type: "REGISTER_FAILURE", payload: err.response.data.msg })
    }
}
export const logout = (e, dispatch, navigate) => {
    e.preventDefault()
    dispatch({ type: "LOGOUT" })
    removeTokenFromLocalStorage()
    navigate("/login")
}