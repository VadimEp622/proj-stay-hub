import { httpService } from './http.service.js'
import { userService } from './user.service.js'


const BASE_URL = 'auth'


export const authService = {
    login,
    signup,
    logout
}

// TODO: (important) research "redux-persist" for handling session persistence with redux
// NOTE: sessionStorage or similiar operation MAY FAIL and cause an error, due to certain browser configurations.
//     Since redux reducers should not have any side effects (sessionStorage fail is considered a side effect,
//     sessionStorage CANNOT be there. 
async function login(userCred) {
    try {
        const user = await httpService.post(`${BASE_URL}/login`, userCred)
        if (user) {
            return userService.saveLocalUser(user)
        }
    } catch (err) {
        console.log('Could not log in', err)
        throw err
    }
}

async function signup(userCred) {
    try {
        userCred.trip = []
        userCred.wishlist = []
        if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
        const user = await httpService.post(`${BASE_URL}/signup`, userCred)
        return userService.saveLocalUser(user)
    } catch (err) {
        console.log('Could not sign up', err)
        throw err
    }
}

async function logout() {
    try {
        await httpService.post(`${BASE_URL}/logout`)
        userService.clearLocalUser()
    } catch (err) {
        console.log('Could not logout', err)
        throw err
    }
}