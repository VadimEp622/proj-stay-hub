import { httpService } from './http.service.js'
import { utilService } from './util.service.js'


const BASE_URL = 'user'


const stayHostImgUrl = [
    'https://a0.muscache.com/im/pictures/user/e952cec2-7f68-46da-b732-4831bbba5411.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/08443d8e-33a3-4e5f-a7d6-39cabe336f5e.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/bb8fc936-6adc-4c85-9800-60fed98504ea.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/dcb6df90-32dd-44e5-85f6-e4497cb2bd44.jpg?im_w=240',
    'https://a0.muscache.com/im/users/2426121/profile_pic/1337598098/original.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/a89f9f4c-3478-4a76-89bc-e20de577aaf0.jpg?im_w=240',
    'https://a0.muscache.com/im/users/39955669/profile_pic/1438203306/original.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/4578d056-bd4d-41c1-bb24-69ee77897582.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/ba0b19fb-0e57-4a61-ae1c-a89cfdef189e.jpg?im_w=240',
    'https://a0.muscache.com/im/users/22237832/profile_pic/1417722073/original.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/78fe81e6-0acc-4fea-8db2-b4c27847a682.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/3792c319-9a5f-4f8d-9814-f6fe0ddafa75.jpg?im_w=240',
    'https://a0.muscache.com/im/users/7008216/profile_pic/1382866008/original.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/3542ce22-b7c8-4322-82bc-d2cb1bcaeaf9.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/428cfd4b-39f8-4d6b-ab53-dd21f87ef6ce.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/b439c665-54c8-429d-b5be-c2350d71168b.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/b7cd9e7e-3db8-42d3-88c0-f4cff501a6b3.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/95b747e0-2060-4f7b-b888-532a8e86dbeb.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/d29965c5-0e9f-4abf-bd1f-cb36868e705a.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/0c2b63ce-1ee4-413e-a84e-2f00446af4ac.jpg?im_w=240',
    'https://a0.muscache.com/im/users/1134592/profile_pic/1315585721/original.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/76fb4dde-f7d7-4bce-9126-5b19fac05b00.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/b06460bb-f8db-4dc0-a9f5-b8345c61c853.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/e4c75a01-f74f-4443-9cd1-47006362f5ec.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/ca548e1a-256c-4960-a9ab-acda731ea636.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/80686612-1378-45fe-8ac4-404366aebd93.jpg?im_w=240',
    'https://a0.muscache.com/im/users/43176153/profile_pic/1441211190/original.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/516167b0-1c97-4cf7-af18-7a629470495d.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/3a480638-55b6-411d-9afc-372976327eb0.jpg?im_w=240',
    'https://a0.muscache.com/im/users/6766455/profile_pic/1370509587/original.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/48f65872-c85b-40c4-b140-17fc2a502f03.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/1f148389-a8a8-480a-87a2-0f425f7f53b4.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/ef5cbcb3-b45f-4ecc-b8eb-db22d2c15f62.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/e890c19b-c43d-4e04-83c7-a10210d25b41.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/7647b99d-63d3-4c28-a473-03c8c171e134.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/9a5c8ac2-0d0e-472a-a0ce-379103a569b4.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/a4ea0c4b-2b71-4111-9a56-82c7636a2ee1.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/43328d30-2844-4bab-be12-a26125c59669.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/d46e6f5f-c676-4baf-b4ce-4c8ae6ad5239.jpg?im_w=240',
    'https://a0.muscache.com/im/pictures/user/59da4e65-e5a0-4fde-b4d9-e48f20c1ba43.jpg?im_w=240',
]


export const userService = {
    // ========================= Checked and in use =========================
    // ******* C.R.U.D.L *******
    addUserTrip,
    updateWishlist,
    getById,
    login,
    signup,
    logout,
    // *************************
    randomHostImg,
    getEmptyCredentials,
    getGuestCredentials,
    getNewUserCredentials,
    getUserDashboardData,
    getLoggedinUser,
    saveLocalUser,
    clearLocalUser,
    buildGuestsString,
    // ======================================================================
}
window.userService = userService


// ========================= Checked and in use =========================
// ******* C.R.U.D.L *******
function addUserTrip(userId, orderId) {
    return httpService.post(`${BASE_URL}/${userId}/trip`, orderId)
}

function updateWishlist(stay) {
    const loggedInUserId = getLoggedinUser()?._id
    return httpService.put(`${BASE_URL}/${loggedInUserId}/wishlist`, stay)
}

function getById(userId) {
    return httpService.get(`${BASE_URL}/${userId}`)
}

async function login(userCred) {
    try {
        const user = await httpService.post('auth/login', userCred)
        if (user) {
            return saveLocalUser(user)
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
        const user = await httpService.post('auth/signup', userCred)
        return saveLocalUser(user)
    } catch (err) {
        console.log('Could not sign up', err)
        throw err
    }
}

async function logout() {
    try {
        await httpService.post('auth/logout')
        clearLocalUser()
    } catch (err) {
        console.log('Could not logout', err)
        throw err
    }
}
// *************************

function randomHostImg() {
    return stayHostImgUrl[utilService.getRandomIntInclusive(0, stayHostImgUrl.length - 1)]
}

function getEmptyCredentials() {
    return { username: '', password: '', fullname: '' }
}

function getGuestCredentials() {
    return { username: 'guest123!aAsS', password: 'guest123!aAsS', fullname: '' }
}

function getNewUserCredentials() {
    return { username: 'newUser', password: 'newUser', fullname: 'New user' }
}

function getUserDashboardData() {
    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        revenue: [1710.5, 751.2, 2741.8, 1740, 2476, 857],
        occupancyRate: [74, 29, 90, 63, 81, 34]
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(BASE_URL))
}

function clearLocalUser() {
    sessionStorage.removeItem(BASE_URL)
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, wishlist: user.wishlist, trip: user.trip }
    sessionStorage.setItem(BASE_URL, JSON.stringify(user))
    return user
}

function buildGuestsString(guestsObject) {
    const { adults = 0, children = 0, infants = 0, pets = 0 } = guestsObject
    const guestCount = (adults + children === 0) ? 1 : (adults + children)
    let guestsString = `${guestCount} guest${guestCount !== 1 ? 's' : ''}`
    if (infants > 0) guestsString += `, ${infants} infant${infants !== 1 ? 's' : ''}`
    if (pets > 0) guestsString += `, ${pets} pet${pets !== 1 ? 's' : ''}`
    return guestsString
}
// ======================================================================