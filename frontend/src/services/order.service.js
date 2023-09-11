import { storageService } from "./async-storage.service"
import { httpService } from "./http.service"

const STORAGE_KEY = 'orders'

export const orderService = {
    // ---- Verified Works ---- //
    getOrders,
    getOrderById,
    addOrder,
    getDemoOrders,
    // ------------------------ //
    removeOrder,
    updateOrderStatus
}

window.cs = orderService


// =========== Verified Works =========== //
function getOrders(userId) {
    return httpService.get(STORAGE_KEY, userId)
}

async function updateOrderStatus(order) {
    return httpService.put(`orders/${order._id}`, order)
}

async function addOrder(order) {
    return httpService.post(STORAGE_KEY, order)
}

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
                checkIn: 'Jun 23',
                checkOut: 'Jun 27',
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
                checkIn: 'Mar 11',
                checkOut: 'Mar 17',
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
                checkIn: 'Feb 15',
                checkOut: 'Feb 18',
                status: 'Rejected'
            }
        }
    ]


    // return [
    //     { guest: 'John Doe', imgUrl: 'https://a0.muscache.com/im/pictures/user/74afa56b-cc05-4701-a2ce-f4de5e435504.jpg?im_w=240', join: 'Mar 2023', dates: 'Jun 23-27', status: 'Pending' },
    //     { guest: 'Jane Smith', imgUrl: 'https://a0.muscache.com/im/pictures/user/596bca9e-ef37-4f41-b41c-a0904c47ca93.jpg?im_w=240', join: 'Jun 2015', dates: 'Mar 11-17', status: 'Approved' },
    //     { guest: 'Michael Johnson', imgUrl: 'https://a0.muscache.com/im/pictures/user/cee1b931-2952-4fc0-9b78-3fb70324c397.jpg?im_w=240', join: 'Nov 2020', dates: 'Feb 15-18', status: 'Rejected' }
    // ]
}
// ====================================== //


// NEED TO FIX AND CONNECTS ROUTES FOR BACKEND -> NEED TO THINK ABOUT WHAT EXACTLY WILL THE ORDER ROUTES BE.
async function getOrderById(orderID) {
    // console.log('getOrderById hi')
    const order = await storageService.get('orders', orderID)
    // return httpService.get(`order/${orderID}`)
    return order
}

async function removeOrder(orderId) {
    // console.log('removeOrder hi')
    return storageService.remove('orders', orderId)
    // return httpService.delete(`order/${orderId}`)
}

