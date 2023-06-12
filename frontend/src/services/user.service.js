import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    buildGuestsString
}

window.userService = userService

function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}



async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

//NO UPDATE USER YET
async function update(_id, type, data) {
    // const user = await storageService.get('user', _id);
    const user = await httpService.get(`user/${_id}`);
    if (!user[type]) {
        user[type] = [];
    }
    user[type].push({ _id: data });
    // await storageService.put('user', user);
    await httpService.put(`user/${_id}`, user);

    if (getLoggedinUser()._id === user._id) {
        saveLocalUser(user);
    }

    return user;
}

async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        return saveLocalUser(user)
    }
}
async function signup(userCred) {
    userCred.trip = []
    userCred.wishlist = []
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, wishlist: user.wishlist, trips: user.trips }
    console.log('user from session storage', user)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

// function saveLocalUser(user) {
//     const userData = {
//         _id: user._id,
//         fullname: user.fullname,
//         imgUrl: user.imgUrl,
//         wishlist: [],
//         trips: []
//     }

//     const encodedData = encodeURIComponent(JSON.stringify(userData));
//     document.cookie = `loggedInUser=${encodedData}; path=/`;
//     return userData;
// }


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// function getLoggedinUser() {
//     const cookieValue = document.cookie
//         .split('; ')
//         .find(row => row.startsWith(`${STORAGE_KEY_LOGGEDIN_USER}=`))
//     console.log(cookieValue)

//     if (cookieValue) {
//         const decodedValue = decodeURIComponent(cookieValue.split('=')[1])
//         return JSON.parse(decodedValue)
//     }

//     return null
// }


function buildGuestsString(guestsObject) {
    const { adults = 0, children = 0, infants = 0, pets = 0 } = guestsObject
    const guestCount = (adults + children === 0) ? 1 : (adults + children)
    let guestsString = `${guestCount} guest${guestCount !== 1 ? 's' : ''}`
    if (infants > 0) guestsString += `, ${infants} infant${infants !== 1 ? 's' : ''}`
    if (pets > 0) guestsString += `, ${pets} pet${pets !== 1 ? 's' : ''}`
    return guestsString
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()



