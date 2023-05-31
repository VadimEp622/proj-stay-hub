
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg
}
window.cs = stayService


async function query(filterBy = { name: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(stayId) {
    return httpService.get(`stay/${stayId}`)
}

async function remove(stayId) {
    return httpService.delete(`stay/${stayId}`)
}
async function save(stay) {
    let savedStay
    if (stay._id) {
        savedStay = await httpService.put(`stay/${stay._id}`, stay)

    } else {
        savedStay = await httpService.post('stay', stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    const savedMsg = await httpService.post(`Stay/${stayId}/msg`, { txt })
    return savedMsg
}


function getEmptyStay() {
    return {
        name: '',
        description: '',
        price: utilService.getRandomIntInclusive(100, 9000),
        type: "House",
        imgUrls: [],
        summary: "Fantastic duplex apartment...",
        capacity: utilService.getRandomIntInclusive(1, 10),
    }
}



// *********************** PRIVATE FUNCTIONS ***********************




