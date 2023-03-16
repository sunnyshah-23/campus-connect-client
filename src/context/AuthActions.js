export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START"
})

export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
})
export const LoginFailure = (msg) => ({
    type: "LOGIN_FAILURE",
    payload: msg
})
export const RegisterSuccess = () => ({
    type: "REGISTER_SUCCESS",

})

export const RegisterFailure = (msg) => ({
    type: "REGISTER_FAILURE",
    payload: msg
})

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});

export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});
