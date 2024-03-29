import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

// ======================= Verified being used =======================
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

async function add(order) {
    try {
        const criteria = _buildCriteria({
            byUserId: order.buyer._id,
            aboutUserId: order.seller._id
        })
        const orderToAdd = {
            ...criteria,
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

async function getById(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        const criteria = _buildCriteria({ orderId })
        const order = await collection.findOne(criteria)
        return order
    } catch (err) {
        logger.error(`while finding order ${orderId}`, err)
        throw err
    }
}

async function update(order) {
    try {
        const criteria = _buildCriteria({ orderId: order._id })
        const orderToUpdate = { ...order }
        const collection = await dbService.getCollection('order')
        await collection.updateOne(criteria, { $set: orderToUpdate })
        return orderToUpdate
    } catch (err) {
        logger.error('cannot update order', err)
        throw err
    }
}
// ===================================================================
// ============== Verified working - but NOT being used ==============
async function remove(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        const criteria = _buildCriteria({ orderId })
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}
// ===================================================================




function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.orderId) criteria._id = new ObjectId(filterBy.orderId)
    if (filterBy.byUserId) criteria.byUserId = new ObjectId(filterBy.byUserId)
    if (filterBy.aboutUserId) criteria.aboutUserId = new ObjectId(filterBy.aboutUserId)
    return criteria
}


export const orderService = {
    query,
    getById,
    remove,
    add,
    update
}


