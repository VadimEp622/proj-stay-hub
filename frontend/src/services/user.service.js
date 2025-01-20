import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { profilePics } from './resources-pics-profile.service.js'


const BASE_URL = 'user'


export const userService = {
    // ========================= Checked and in use =========================
    // ******* C.R.U.D.L *******
    addUserTrip,
    getById,
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


// ========================= Checked and in use =========================
// ******* C.R.U.D.L *******
function addUserTrip(userId, orderId) {
    return httpService.post(`${BASE_URL}/${userId}/trip`, orderId)
}

function getById(userId) {
    return httpService.get(`${BASE_URL}/${userId}`)
}
// *************************

function randomHostImg() {
    return profilePics[utilService.getRandomIntInclusive(0, profilePics.length - 1)]
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