import { format, startOfDay } from 'date-fns'

export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    getFutureTime,
    saveToStorage,
    loadFromStorage,
    getFormattedTimeRange,
    getTimeDiffBy,
}

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

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
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


function getFutureTime(amount, item) {
    const date = Date.now()
    const TODAY = Date.parse(startOfDay(date))


    const MINUTE = 1000 * 60
    const HOUR = MINUTE * 60
    const DAY = HOUR * 24
    const WEEK = DAY * 7
    const MONTH = WEEK * 4
    const YEAR = MONTH * 12

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
