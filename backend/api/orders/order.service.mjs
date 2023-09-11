import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { asyncLocalStorage } from '../../services/als.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

// ============== Verified being used ==============
async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('order')
        const orders = await collection.find(criteria).toArray()
        const updatedOrders = orders.map(order => {
            order.byUser = { _id: order.content.buyer._id, fullname: order.content.buyer.fullname }
            order.aboutUser = { _id: order.content.seller._id, fullname: order.content.seller.fullname }
            delete order.byUserId
            delete order.aboutUserId
            return order
        })
        return updatedOrders
    } catch (err) {
        logger.error('cannot retrieve orders from Database', err)
        throw err
    }
}
// =================================================

async function getById(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        const order = await collection.findOne({ _id: new ObjectId(orderId) })
        return order
    } catch (err) {
        logger.error(`while finding order ${orderId}`, err)
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
        const orderToAdd = {
            byUserId: new ObjectId(order.buyer._id),
            aboutUserId: new ObjectId(order.seller._id),
            content: order
        }
        const collection = await dbService.getCollection('order')
        await collection.insertOne(orderToAdd)
        // mongoDB adds _id key to orderToAdd!
        return orderToAdd
    } catch (err) {
        logger.error('cannot add order', err)
        throw err
    }
}

async function update(order) {
    try {
        console.log('update order in order.service.mjs', order)
        const orderToUpdate = {
            ...order
            // byUserId: new ObjectId(order.buyer._id),

            // aboutUserId: new ObjectId(order._id),
            // ...query({order:aboutU})
            // content: {
            //     status: order.status
            // }
        }
        // const collection = await dbService.getCollection('order')
        // await collection.insertOne(orderToUpdate)
        // return orderToAdd


        // const stayToSave = {
        //     vendor: stay.vendor,
        //     price: stay.price
        // }
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ _id: new ObjectId(orderToUpdate._id) }, { $set: orderToUpdate })
        return orderToUpdate

    } catch (err) {
        logger.error('cannot update order', err)
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
    getById,
    remove,
    add,
    update
}


