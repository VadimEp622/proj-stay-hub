import { startOfDay } from 'date-fns'

export const utilService = {
    // ==================== Checked Function Are Used ====================
    getStayPreviewDateRange,
    getFutureTime,
    getTimeDiffBy,
    getFormattedTimeRange,
    getFormattedDate,
    floatify,
    calculatePercentage,
    getRandomIntInclusive,
    createDivsForButtonContainer,
    addCommas,
    getRandomMonthAndYear,
    // ===================================================================
    // ===================== Unused, But Very Useful =====================
    makeId,
    makeLorem,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage
    // ===================================================================
}


// ==================== Checked Function Are Used ====================
function getStayPreviewDateRange(numDaysToStart, numDaysToEnd) {
    const startDate = getFutureTime(numDaysToStart, 'day')
    const endDate = getFutureTime(numDaysToEnd, 'day')
    return getFormattedTimeRange(startDate, endDate)
}

function getFutureTime(amount, item) {
    const date = Date.now()
    const TODAY = Date.parse(startOfDay(date))

    const MINUTE = 1000 * 60
    const HOUR = MINUTE * 60
    const DAY = HOUR * 24
    // const WEEK = DAY * 7
    // const MONTH = WEEK * 4
    // const YEAR = MONTH * 12

    if (item === 'day') return TODAY + (DAY * amount)

    return TODAY
}

function getTimeDiffBy(item) {
    const MINUTE = 1000 * 60
    const HOUR = MINUTE * 60
    const DAY = HOUR * 24
    const WEEK = DAY * 7
    const MONTH = WEEK * 4
    const YEAR = MONTH * 12

    if (item === 'minute') return MINUTE
    if (item === 'hour') return HOUR
    if (item === 'day') return DAY
    if (item === 'week') return WEEK
    if (item === 'month') return MONTH
    if (item === 'year') return YEAR
}

function getFormattedTimeRange(start, end) {
    const startDate = new Date(start)
    const endDate = new Date(end)

    const startMonth = startDate.toLocaleString('default', { month: 'short' })
    const endMonth = endDate.toLocaleString('default', { month: 'short' })

    let formattedRange = startMonth + ' ' + startDate.getDate()

    if (startMonth !== endMonth || startDate.getFullYear() !== endDate.getFullYear()) {
        formattedRange += ' - ' + endMonth + ' ' + endDate.getDate()
    } else {
        formattedRange += ' - ' + endDate.getDate()
    }

    return formattedRange
}

function getFormattedDate(dateToFormat, options) {
    const date = new Date(dateToFormat)
    return date.toLocaleDateString('en-US', options)
}

function floatify(number) {
    return parseFloat((number).toFixed(10))
}

function calculatePercentage(value, outOfValue = 5) {
    return utilService.floatify((value / outOfValue) * 100).toFixed(1)
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function createDivsForButtonContainer() {
    const divElements = []
    for (let i = 0; i < 100; i++) {
        divElements.push(<div className="cell" key={i}></div>)
    }
    return divElements
}

function addCommas(num) {
    return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getRandomMonthAndYear() {
    const startYear = 2014
    const endYear = 2022

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    const randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear
    const randomMonthIndex = Math.floor(Math.random() * 12)
    const randomMonth = months[randomMonthIndex]

    return `${randomMonth} ${randomYear}`
}
// ===================================================================
// ===================== Unused, But Very Useful =====================
function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function randomPastTime() {
    const MINUTE = 1000 * 60
    const HOUR = MINUTE * 60
    const DAY = HOUR * 24
    const WEEK = DAY * 7
    const MONTH = WEEK * 4
    const YEAR = MONTH * 12

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}
// ===================================================================