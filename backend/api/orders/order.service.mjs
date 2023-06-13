import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { asyncLocalStorage } from '../../services/als.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        console.log('criteria', criteria)
        const collection = await dbService.getCollection('order')
        // const reviews = await collection.find(criteria).toArray()
        var orders = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    from: 'user',
                    localField: 'byUserId',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup:
                {
                    from: 'user',
                    localField: 'aboutUserId',
                    foreignField: '_id',
                    as: 'aboutUser'
                }
            },
            {
                $unwind: '$aboutUser'
            }
        ]).toArray()
        // console.log('orders', orders)
        orders = orders.map(order => {
            order.byUser = { _id: order.content.buyer._id, fullname: order.content.buyer.fullname }
            order.aboutUser = { _id: order.content.seller._id, fullname: order.content.seller.fullname }
            delete order.byUserId
            delete order.aboutUserId
            return order
        })
        console.log('orders', orders)

        return orders
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }

}

async function remove(orderId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { loggedinUser } = store
        const collection = await dbService.getCollection('review')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(orderId) }
        if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove review ${orderId}`, err)
        throw err
    }
}


async function add(order) {
    try {
        console.log('order in order.service.mjs', order)
        const orderToAdd = {
            byUserId: new ObjectId(order.buyer._id),
            aboutUserId: new ObjectId(order.seller._id),
            content: order
            //     txt: order.txt
        }
        const collection = await dbService.getCollection('order')
        await collection.insertOne(orderToAdd)
        return orderToAdd
    } catch (err) {
        logger.error('cannot add order', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.byUserId) criteria.byUserId = new ObjectId(filterBy.byUserId)
    return criteria
}

export const orderService = {
    query,
    remove,
    add
}


