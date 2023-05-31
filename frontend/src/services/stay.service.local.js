import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STAY_STORAGE_KEY = 'stay'


let gStays

_createDemoStays()

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
    var stays = await storageService.query(STAY_STORAGE_KEY)
    if (filterBy.name) {
        const regex = new RegExp(filterBy.txt, 'i')
        stays = stays.filter(stay => regex.test(stay.name) || regex.test(stay.description))
    }
    if (filterBy.price) {
        stays = stays.filter(stay => stay.price <= filterBy.price)
    }
    return stays
}

function getById(stayId) {
    return storageService.get(STAY_STORAGE_KEY, stayId)
}

async function remove(stayId) {
    // throw new Error('Nope')
    await storageService.remove(STAY_STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await storageService.put(STAY_STORAGE_KEY, stay)
    } else {
        // Later, owner is set by the backend
        stay.owner = userService.getLoggedinUser()
        savedStay = await storageService.post(STAY_STORAGE_KEY, stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    // Later, this is all done by the backend
    const stay = await getById(stayId)
    if (!stay.msgs) stay.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    stay.msgs.push(msg)
    await storageService.put(STAY_STORAGE_KEY, stay)

    return msg
}

function getEmptyStay() {
    return {
        name: '',
        description: '',
        price: '',
        type: '',
        imgUrls: [],
        summary: '',
        capacity: '',
    }
}




// *********************** PRIVATE FUNCTIONS ***********************
// TEST DATA

// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))

function _createDemoStays() {
    gStays = JSON.parse(localStorage.getItem(STAY_STORAGE_KEY)) || []
    if (gStays.length > 0) return gStays

    gStays.push(_createDemoStay(
        'Once in a lifetime experience - bedroom room view beside seaside cliff',
        'A single bedroom cabin with an enormous glass window facing the ocean from a cliff',
        'Cabin',
        { country: "Portugal", countryCode: "PT", city: "Lisbon" }
    ))
    gStays.push(_createDemoStay(
        'Enormous Duplex apartment in a lively downtown block',
        'Fantastic duplex apartment with an elevator and a balcony adorned with potted greenery....',
        'House',
        { country: "Israel", countryCode: "IL", city: "Haifa" }
    ))
    gStays.push(_createDemoStay(
        'High-rise building apartment - fantastic view of the beautiful city',
        'An apartment in a high-rise building',
        'Apartment',
        { country: "Israel", countryCode: "IL", city: "Eilat" }
    ))
    gStays.push(_createDemoStay(
        'Comfy single bed room for single night\'s nap',
        '1 small neat and compact room with a bed and a small window facing the tram train passing by',
        'Room',
        { country: "Israel", countryCode: "IL", city: "Tel Aviv" }
    ))
    localStorage.setItem(STAY_STORAGE_KEY, JSON.stringify(gStays))
}


function _createDemoStay(name, summary, type, loc) {
    return {
        name,
        summary,
        description: '<Enter Description Here>',
        type,
        price: utilService.getRandomIntInclusive(100, 9000),
        capacity: utilService.getRandomIntInclusive(1, 10),
        imgUrls: [],
        loc: {
            country: loc.country,
            countryCode: loc.countryCode,
            city: loc.city,
        },
        //below is temp!
        checkIn: Date.now(),//today
        checkOut: Date.now() + 86400000 * 3//in 3 days
    }
}



