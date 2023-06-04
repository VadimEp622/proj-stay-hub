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
    gStays = utilService.loadFromStorage(STAY_STORAGE_KEY) || []
    if (gStays.length > 0) return gStays

    gStays.push(_createDemoStay(
        'Once in a lifetime experience - bedroom room view beside seaside cliff',
        'A single bedroom cabin with an enormous glass window facing the ocean from a cliff',
        'Cabin',
        { country: "Portugal", countryCode: "PT", city: "Lisbon", lat: 38.7223, lng: -9.142685 },
        [
            'https://a0.muscache.com/im/pictures/0f7a9ab8-6b60-45cb-8e00-02b7fbbe19f0.jpg',
            'https://a0.muscache.com/im/pictures/b567fde4-e9fd-401c-82ae-90e375adcc0c.jpg',
            'https://a0.muscache.com/im/pictures/125b284a-7775-497f-86f4-f0c2de7dfbb3.jpg',
            'https://a0.muscache.com/im/pictures/143bbdc0-a455-49cc-b502-30984666c0a7.jpg',
            'https://a0.muscache.com/im/pictures/434a3847-56d5-4454-b956-189a3c610088.jpg',
            'https://a0.muscache.com/im/pictures/890d442c-bf11-44f8-8636-73c35f709e33.jpg',
        ]
    ))
    gStays.push(_createDemoStay(
        'Enormous Duplex apartment in a lively downtown block',
        'Fantastic duplex apartment with an elevator and a balcony adorned with potted greenery....',
        'House',
        { country: "Israel", countryCode: "IL", city: "Haifa", lat: 32.7940, lng: 34.9896 },
        [
            'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
            'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
            'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
            'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
            'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
            'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
        ]
    ))
    gStays.push(_createDemoStay(
        'High-rise building apartment - fantastic view of the beautiful city',
        'An apartment in a high-rise building',
        'Apartment',
        { country: "Israel", countryCode: "IL", city: "Eilat", lat: 29.5581, lng: 34.9482 },
        [
            'https://a0.muscache.com/im/pictures/0f7a9ab8-6b60-45cb-8e00-02b7fbbe19f0.jpg',
            'https://a0.muscache.com/im/pictures/b567fde4-e9fd-401c-82ae-90e375adcc0c.jpg',
            'https://a0.muscache.com/im/pictures/125b284a-7775-497f-86f4-f0c2de7dfbb3.jpg',
            'https://a0.muscache.com/im/pictures/143bbdc0-a455-49cc-b502-30984666c0a7.jpg',
            'https://a0.muscache.com/im/pictures/434a3847-56d5-4454-b956-189a3c610088.jpg',
            'https://a0.muscache.com/im/pictures/890d442c-bf11-44f8-8636-73c35f709e33.jpg',
        ]
    ))
    gStays.push(_createDemoStay(
        'Comfy single bed room for single night\'s nap',
        '1 small neat and compact room with a bed and a small window facing the tram train passing by',
        'Room',
        { country: "Israel", countryCode: "IL", city: "Tel Aviv", lat: 32.0853, lng: 34.7818 },
        [
            'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
            'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
            'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
            'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
            'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
            'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
        ]
    ))
    gStays.push(_createDemoStay(
        'Comfy single bed room for single night\'s nap',
        '1 small neat and compact room with a bed and a small window facing the tram train passing by',
        'Room',
        { country: "Israel", countryCode: "IL", city: "Tel Aviv", lat: 32.0853, lng: 34.7818 },
        [
            'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
            'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
            'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
            'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
            'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
            'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
        ]
    ))
    gStays.push(_createDemoStay(
        'Comfy single bed room for single night\'s nap',
        '1 small neat and compact room with a bed and a small window facing the tram train passing by',
        'Room',
        { country: "Israel", countryCode: "IL", city: "Tel Aviv", lat: 32.0853, lng: 34.7818 },
        [
            'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
            'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
            'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
            'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
            'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
            'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
        ]
    ))

    utilService.saveToStorage(STAY_STORAGE_KEY, gStays)
}

// function calculateRate(stay) {
//     const reviewInputs = stay.reviews.map(review => review.reviewInputs)
//     const reviewCount = reviewInputs.length
//     const reviewInputsTotal = reviewInputs.reduce((acc, inputs) => {
//         for (const key in inputs) {
//             acc[key] = (acc[key] || 0) + inputs[key]
//         }
//         return acc
//     }, {})
//     const reviewInputsAverage = {};
//     for (const key in reviewInputsTotal) {
//         reviewInputsAverage[key] = reviewInputsTotal[key] / reviewCount
//     }
//     const rate = Object.values(reviewInputsAverage).reduce(
//         (sum, value) => sum + value,
//         0
//     ) / Object.keys(reviewInputsAverage).length;

// }

function _createDemoStay(name, summary, type, loc, imgUrls) {
    return {
        _id: utilService.makeId(),
        name,
        summary,
        description: '<Enter Description Here>',
        type,
        price: utilService.getRandomIntInclusive(100, 9000),
        capacity: utilService.getRandomIntInclusive(1, 10),
        imgUrls,
        reviews: [
            {
                id: "madeId",
                txt: "Very helpful hosts. Cooked traditional Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, incidunt corrupti illo animi hic voluptatum corporis ullam natus! Qui, expedita animi magnam harum iusto mollitia itaque voluptas unde obcaecati aut.",
                reviewInputs: {
                    cleanliness: 4.8,
                    communication: 5,
                    checkin: 5,
                    accuracy: 4.8,
                    location: 4.8,
                    value: 4.4
                },
                rate: 5,
                by: {
                    _id: "u102",
                    fullname: "Jack",
                    date: "May 2023",
                    imgUrl: "https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/60.jpg"
                }
            },
            {
                id: "madeId",
                txt: "Very helpful hosts. Cooked traditional Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, incidunt corrupti illo animi hic voluptatum corporis ullam natus! Qui, expedita animi magnam harum iusto mollitia itaque voluptas unde obcaecati aut.",
                reviewInputs: {
                    cleanliness: 4.2,
                    communication: 1,
                    checkin: 5,
                    accuracy: 4.5,
                    location: 4.8,
                    value: 4.4
                },
                rate: 4,
                by: {
                    _id: "u103",
                    fullname: "Patricia",
                    date: "September 2022",
                    imgUrl: "https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/14.jpg"
                }
            },
            {
                id: "madeId",
                txt: "Very helpful hosts. Cooked traditional Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, incidunt corrupti illo animi hic voluptatum corporis ullam natus! Qui, expedita animi magnam harum iusto mollitia itaque voluptas unde obcaecati aut.",
                reviewInputs: {
                    cleanliness: 4.8,
                    communication: 4,
                    checkin: 1,
                    accuracy: 4.8,
                    location: 3.8,
                    value: 4.4
                },
                rate: 5,
                by: {
                    _id: "u104",
                    fullname: "Lina & Alexis",
                    date: "January 2023",
                    imgUrl: "https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/63.jpg"
                }
            },
            {
                id: "madeId",
                txt: "Very helpful hosts. Cooked traditional Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, incidunt corrupti illo animi hic voluptatum corporis ullam natus! Qui, expedita animi magnam harum iusto mollitia itaque voluptas unde obcaecati aut.",
                reviewInputs: {
                    cleanliness: 4.8,
                    communication: 5,
                    'check-in': 5,
                    accuracy: 4.8,
                    location: 4.8,
                    value: 4.4
                },
                rate: 5,
                by: {
                    _id: "u105",
                    fullname: "Juan Carlo",
                    date: "May 2023",
                    imgUrl: "https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/51.jpg"
                }
            },
        ],
        loc: {
            country: loc.country,
            countryCode: loc.countryCode,
            city: loc.city,
            coordinates: {
                lat: loc.lat,
                lng: loc.lng
            }
        },
        amenities: [
            "TV",
            "Wifi",
            "Kitchen",
            "Refrigerator",
            "Pets allowed",
            "Cooking basics",
            "Hot tub",
            "Air conditioning",
            "Gym"
        ],
        labels: [
            "Top of the world",
            "Trending",
            "Play",
            "Tropical"
        ],
        owner: 'Juan',
        //below is temp!
        checkIn: 1685116800000,
        checkOut: 1685116800000 + 86400000 * 3,//in 3 days

        availableDates: [
            {
                from: utilService.getFutureTime(),
                to: utilService.getFutureTime(3, 'day'),
            },
            {
                from: utilService.getFutureTime(6, 'day'),
                to: utilService.getFutureTime(9, 'day'),
            }
        ],
    }
}



