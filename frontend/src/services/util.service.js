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
    checkMinMaxPrices,
    createDivsForButtonContainer,
    convertTimestampToDate,
    addCommas,
    getRandomNumberDecimal,
    getRandomMonthAndYear
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

function checkMinMaxPrices(stays) {
    if (stays.length === 0) return null
    let minPrice = stays[0].price
    let maxPrice = stays[0].price
    stays.forEach(stay => {
        const price = stay.price
        if (price < minPrice) minPrice = price
        if (price > maxPrice) maxPrice = price
    })
    return { minPrice, maxPrice }
}

function createDivsForButtonContainer() {
    const divElements = []
    for (let i = 0; i < 100; i++) {
        divElements.push(<div className="cell" key={i}></div>)
    }
    return divElements
}

function convertTimestampToDate(timestamp) {
    var targetDate = new Date(timestamp);

    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = targetDate.toLocaleDateString(undefined, options);

    return formattedDate;
}

function addCommas(num) {
    return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getRandomNumberDecimal(min, max) {
    const randomNum = Math.random() * (max - min) + min;
    const roundedNum = Math.floor(randomNum * 10) / 10;
    return roundedNum;
}

function getRandomMonthAndYear() {
    const startYear = 2014;
    const endYear = 2022;

    // const months = [
    //     "January", "February", "March", "April", "May", "June",
    //     "July", "August", "September", "October", "November", "December"
    // ];
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    const randomMonthIndex = Math.floor(Math.random() * 12);
    const randomMonth = months[randomMonthIndex];

    return `${randomMonth} ${randomYear}`;
}
