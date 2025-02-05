import { httpService } from './http.service'
import { utilService } from './util.service'
import { explorePics } from './resources-pics-explore.service'


const BASE_URL = 'order'


export const orderService = {
    // ==================== REST API ==================== //
    getOrders,
    addOrder,
    updateOrderStatus,
    // ====================== OTHER ===================== //
    getDemoOrders,
    getOrderExploreList,
    // ================================================== //
}


// ====================== REST API ====================== //
function getOrders(filterBy) {
    return httpService.get(`${BASE_URL}`, filterBy)
}

function addOrder(order) {
    return httpService.post(BASE_URL, order)
}

function updateOrderStatus(order) {
    return httpService.put(`${BASE_URL}/${order._id}`, order)
}
// ============================= Other ============================= //

function getDemoOrders() {
    return [
        {
            _id: 1,
            content: {
                buyer: {
                    img: 'https://a0.muscache.com/im/pictures/user/74afa56b-cc05-4701-a2ce-f4de5e435504.jpg?im_w=240',
                    fullname: 'John Doe',
                    joined: 'Mar 2023'
                },
                orderDetails: {
                    checkIn: 'Jun 23 2023',
                    checkOut: 'Jun 27 2023',
                },
                status: 'Pending'
            }
        },
        {
            _id: 2,
            content: {
                buyer: {
                    img: 'https://a0.muscache.com/im/pictures/user/596bca9e-ef37-4f41-b41c-a0904c47ca93.jpg?im_w=240',
                    fullname: 'Jane Smith',
                    joined: 'Jun 2015'
                },
                orderDetails: {
                    checkIn: 'Mar 11 2023',
                    checkOut: 'Mar 17 2023',
                },
                status: 'Approved'
            }
        },
        {
            _id: 3,
            content: {
                buyer: {
                    img: 'https://a0.muscache.com/im/pictures/user/cee1b931-2952-4fc0-9b78-3fb70324c397.jpg?im_w=240',
                    fullname: 'Michael Johnson',
                    joined: 'Nov 2020'
                },
                orderDetails: {
                    checkIn: 'Feb 15 2023',
                    checkOut: 'Feb 18 2023',
                },
                status: 'Rejected'
            }
        }
    ]
}

function getOrderExploreList() {
    return _createOrderExploreItems()
}

// ====================== PRIVATE FUNCTIONS ====================== //

function _createOrderExploreItems() {
    return [
        _createOrderExploreItem('just-for-you', 'Just For You', utilService.getRandomIntInclusive(10, 20), _getRandomExploreImg('just-for-you')),
        _createOrderExploreItem('top-rated', 'Top Rated', utilService.getRandomIntInclusive(30, 50), _getRandomExploreImg('top-rated')),
        _createOrderExploreItem('sports', 'Sports', utilService.getRandomIntInclusive(30, 60), _getRandomExploreImg('sports')),
        _createOrderExploreItem('tours', 'Tours', utilService.getRandomIntInclusive(50, 120), _getRandomExploreImg('tours')),
        _createOrderExploreItem('sightseeing', 'Sightseeing', utilService.getRandomIntInclusive(50, 120), _getRandomExploreImg('sightseeing')),
        _createOrderExploreItem('more', 'Show More', utilService.getRandomIntInclusive(300, 500)),
    ]
}

function _createOrderExploreItem(label, title, amount, img = null) {
    return {
        label,
        title,
        amount,
        img
    }
}

function _getRandomExploreImg(label) {
    const arrayLength = explorePics[label].length
    return explorePics[label][utilService.getRandomIntInclusive(0, arrayLength - 1)]
}
// ================================================================= //
