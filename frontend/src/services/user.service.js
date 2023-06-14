import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service'

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
    buildGuestsString,
    randomHostImg
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
async function update(_id, type, data, action = 'update') {
    // const user = await storageService.get('user', _id);
    const user = await httpService.get(`user/${_id}`);
    if (!user[type]) {
        user[type] = [];
    }
    if (action === 'update') {
        user[type].push(data);
    } else {
        const keyIndex = user[type].findIndex((typeItem) => typeItem._id === data._id)
        user[type].splice(keyIndex, 1)
    }
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
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, wishlist: user.wishlist, trip: user.trip }
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


export function randomHostImg() {
    
    return stayHostImgUrl[utilService.getRandomIntInclusive(0, stayHostImgUrl.length -1)]
}

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
// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()



