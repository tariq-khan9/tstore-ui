

/////////////*******************------Token storage and removal------------************//////////////////////// */
const storeToken = (value, value2, value3, value4) => {
    localStorage.setItem('token', value)
    localStorage.setItem('email', value2)
    localStorage.setItem('name', value3)
    localStorage.setItem('type', value4)
}
const getToken = () => {
   return localStorage.getItem('token')
}
const getEmail = () => {
    return localStorage.getItem('email')
 }
 const getName = () => {
    return localStorage.getItem('name')
 }
 const getType = () => {
    return localStorage.getItem('type')
 }
const removeToken = (value, value2, value3, value4) => {
    localStorage.removeItem(value)
    localStorage.removeItem(value2)
    localStorage.removeItem(value3)
    localStorage.removeItem(value4)
}



export {storeToken, getToken, getEmail,getType, getName, removeToken}