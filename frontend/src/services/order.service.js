import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service'

const STORAGE_KEY = 'orders'


const explore = {
    'just-for-you': [
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-1226627-media_library/original/1641efa4-73ba-4037-9f2b-bdb3fd94943b.jpeg?im_w=1440',
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-1295231-media_library/original/dda27602-1822-4f04-9a99-d5753e5a7a8c.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-1295231-media_library/original/df3c75bb-5d1c-493b-9980-e8e9ae3dc229.jpeg?im_w=1440',
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-4291306-media_library/original/ad7c2318-c13b-4d30-abba-3ad07a66db4b.png?im_w=1440',
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-4527793-media_library/original/0ed36c15-16ae-45cd-8264-aaae30d32481.jpg?im_w=1440',
    ],
    'top-rated': [
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-378164-media_library/original/be3797e8-dc34-49f8-99c2-63d0f4a2ea2b.jpeg?im_w=1440',
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-378164-media_library/original/0a6dcbe4-81e6-4359-8a9d-e6417482d938.jpeg?im_w=1440',
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-5102308-media_library/original/f8578b0b-a655-4704-8ef1-025ff458dfdf.jpeg?im_w=1440',
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-37654-active_media/original/90fe2f1f-227b-4141-8801-b6aaff1eb709.jpeg?im_w=1440',
        'https://a0.muscache.com/im/pictures/86bed863-dc5b-4b78-8c43-bbb0f46f8217.jpg?im_w=1440',
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-94980-media_library/original/ca151df1-122f-4dad-bd27-78c6a175ed0a.jpeg?im_w=1440',
    ],
    'sports': [
        'https://a0.muscache.com/im/pictures/c49684a2-0242-4321-8d2a-70e4e9c59f02.jpg?im_w=1440',
        'https://a0.muscache.com/im/pictures/2c48518f-b085-4b47-ac96-2bd9597963df.jpg?im_w=1440',
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-215130-media_library/original/b2531d3d-dedb-425b-b453-06683a445d49.jpeg?im_w=1440',
        'https://a0.muscache.com/im/pictures/85826c51-22cf-4224-a703-1752535f3207.jpg?im_w=1440',
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-76136-media_library/original/e477f299-e86a-4df5-9835-50360c859072.jpeg?im_w=1440',
    ],
    'tours': [
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-241583-poster/original/c355acbe-b555-4562-b3c6-ad4d3dc426af.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-3941689-media_library/original/e12ee974-80c9-4fbe-8f12-a9b1e0a2024e.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-3941689-media_library/original/f3ff57d0-0afe-4448-a733-710db8502e2e.jpeg?im_w=1440',
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-2861715-media_library/original/c3105295-5e19-4528-9e82-7e22c0f3f41b.jpeg?im_w=1440',
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-2861715-media_library/original/79ed513c-a191-4115-8c32-97c3dd451b18.jpeg?im_w=1440',
    ],
    'sightseeing': [
        'https://a0.muscache.com/im/pictures/5edde511-ec43-4a36-ab2b-995c073747bf.jpg?im_w=1440',
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-298331-media_library/original/01b96675-6111-49d3-aef1-d7cb77466558.jpg?im_w=1440',
        'https://a0.muscache.com/im/pictures/78f227bf-9f95-4add-bf6e-13e14eaddf1c.jpg?im_w=1440',
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-298331-media_library/original/177c90ff-6914-4551-b7ee-5a26b74360e8.jpeg?im_w=1440',
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-298331-media_library/original/2d0762e4-1c67-4717-a246-3f0083f5f26d.jpg?im_w=1440'
    ]
}

export const orderService = {
    // ---- Verified Works ---- //
    getOrders,
    getOrderById,
    addOrder,
    getDemoOrders,
    getOrderExploreList,
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
                checkIn: 'Jun 23 2023',
                checkOut: 'Jun 27 2023',
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
                checkIn: 'Mar 11 2023',
                checkOut: 'Mar 17 2023',
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
                checkIn: 'Feb 15 2023',
                checkOut: 'Feb 18 2023',
                status: 'Rejected'
            }
        }
    ]
}

function getOrderExploreList() {
    return _createOrderExploreItems()
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




// ********************** PRIVATE FUNCTIONS **********************

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
    const arrayLength = explore[label].length
    return explore[label][utilService.getRandomIntInclusive(0, arrayLength - 1)]
}
// ***************************************************************