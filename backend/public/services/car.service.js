
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'



export const carService = {
    query,
    getById,
    save,
    remove,
    getEmptyCar,
    addCarMsg
}
window.cs = carService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get('stay', filterBy)
}
function getById(carId) {
    return httpService.get(`stay/${carId}`)
}

async function remove(carId) {
    return httpService.delete(`stay/${carId}`)
}
async function save(car) {
    var savedCar
    if (car._id) {
        savedCar = await httpService.put(`stay/${car._id}`, car)

    } else {
        savedCar = await httpService.post('stay', car)
    }
    return savedCar
}

async function addCarMsg(carId, txt) {
    const savedMsg = await httpService.post(`stay/${carId}/msg`, {txt})
    return savedMsg
}


function getEmptyCar() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}





