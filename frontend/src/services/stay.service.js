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
    addStayMsg,
    getDate,
    calculateHowManyNights
}
window.cs = stayService


async function query(filterBy = {
    country: '',
    city: '',
    from: '',
    to: '',
    capacity: 0,
    label: '',
}) {
    const { country, city, from, to, capacity, label } = filterBy
    const filter = {
        country,
        city,
        from,
        to,
        capacity,
        label,
    }
    console.log('hi from stayService frontend')
    return httpService.get(STORAGE_KEY, filter)
}

async function getById(stayId) {
    console.log('service:', stayId);
    return httpService.get(`stay/${stayId}`)
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

async function remove(stayId) {
    return httpService.delete(`stay/${stayId}`)
}

// Not Yet In Use
async function addStayMsg(stayId, txt) {
    const savedMsg = await httpService.post(`stay/${stayId}/msg`, { txt })
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
        reviews: [],
    }
}

export function getDate(timeStamp) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })

    const formattedDate = formatter.format(timeStamp)
    return formattedDate.replace(/^0(\d)/, '$1')
}


function calculateHowManyNights(checkInDate, checkOutDate) {
    const firstDate = new Date(checkInDate)
    const secondDate = new Date(checkOutDate)
    const timeDiff = secondDate.getTime() - firstDate.getTime()
    const nightsCount = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return nightsCount
}


// *********************** PRIVATE FUNCTIONS ***********************
