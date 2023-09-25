import { httpService } from './http.service.js'
import { utilService } from './util.service.js'


const STORAGE_KEY = 'stay'


export const stayService = {
    // =============== Checked and in use =============== 
    query,
    getById,
    getEmptyFilterBy,
    getStayCategoryScores,
    getStayScore,
    // ================================================== 
    save,
    remove,
    getEmptyStay,
    addStayMsg,
    getDate,
    calculateHowManyNights
}
window.cs = stayService


// =============== Checked and in use =============== 
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
    return httpService.get(STORAGE_KEY, filter)
}

async function getById(stayId) {
    return httpService.get(`stay/${stayId}`)
}

function getEmptyFilterBy() {
    return {
        filterText: '',
        from: '',
        to: '',
        capacity: 0,
        guests: {
            adults: 0,
            children: 0,
            infants: 0,
            pets: 0
        }
    }
}

function getStayCategoryScores(stayReviews) {
    const scores = stayReviews.reduce((acc, review) => {
        Object.entries(review.reviewInputs).forEach(([input, value]) => {
            acc[input] = utilService.floatify(acc[input] ? (acc[input] + value) : value)
        })
        return acc
    }, {})
    Object.entries(scores).forEach(([input, value]) => {
        const inputAverage = utilService.floatify(value / stayReviews.length)
        scores[input] = parseFloat(inputAverage.toFixed(1))
    })
    return scores
}

function getStayScore(stayReviews) {
    const scores = getStayCategoryScores(stayReviews)
    const stayScoresSum = Object.values(scores)
        .reduce((acc, value) => utilService.floatify(acc += value))
    const stayScore = utilService.floatify(stayScoresSum / Object.values(scores).length)
    return parseFloat(stayScore.toFixed(2))
}
// ================================================== 


async function save(stay) {
    let savedStay
    if (stay._id) {
        savedStay = await httpService.put(`stay/${stay._id}`, stay)
    } else {
        savedStay = await httpService.post('stay', stay)
    }
    return savedStay
}

function remove(stayId) {
    return httpService.delete(`stay/${stayId}`)
}

// Not Yet In Use
function addStayMsg(stayId, txt) {
    return httpService.post(`stay/${stayId}/msg`, { txt })
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

export function getDate(dateToFormat) {
    if (!dateToFormat) return ''
    const date = new Date(dateToFormat)
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })

    const formattedDate = formatter.format(date)
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
