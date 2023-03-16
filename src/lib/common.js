export const storeTokenInLocalStorage = (token) => {
    localStorage.setItem('token', token)
}

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token')
}
export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('token')
}