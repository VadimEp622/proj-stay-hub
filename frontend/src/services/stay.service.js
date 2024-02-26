import { httpService } from './http.service.js'
import { utilService } from './util.service.js'


const BASE_URL = 'stay'


export const stayService = {
    // =============== Checked and in use =============== 
    query,
    getById,
    getEmptyFilterBy,
    getStayCategoryScores,
    getStayScore,
    calculateHowManyNights,
    getDate,
    // ==================================================
}


// =============== Checked and in use =============== 
function query(filterBy = {
    where: '',
    from: '',
    to: '',
    capacity: 0,
    label: '',
    page: 0
}) {
    const { where, from, to, capacity, label, page } = filterBy
    const filter = {
        where,
        from,
        to,
        capacity,
        label,
        page
    }
    return httpService.get(BASE_URL, filter)
}

function getById(stayId) {
    return httpService.get(`${BASE_URL}/${stayId}`)
}

function getEmptyFilterBy() {
    return {
        where: '',
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

function calculateHowManyNights(checkInDate, checkOutDate) {
    const firstDate = new Date(checkInDate)
    const secondDate = new Date(checkOutDate)
    const timeDiff = secondDate.getTime() - firstDate.getTime()
    const nightsCount = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return nightsCount
}

function getDate(dateToFormat) {
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
// ==================================================
