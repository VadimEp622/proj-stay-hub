import { OrderModel } from '../../model/order.ts'
import { logger } from '../../service/logger.service.js'
// import mongodb from 'mongodb'
// const { ObjectId } = mongodb

export const orderService = {
    query,
    getById,
    create,
    remove,
    update
}

// ======================= Verified being used =======================
async function query(filterBy = {}) {
    try {
        const filterCriteria = _buildFilterCriteria(filterBy)
        const orders = await OrderModel.find(filterCriteria)

        // // TODO: find out why below is happening, make a detailed note of related cmps/files, and make a todo note to fix it

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

async function create(order) {
    try {
        const filterCriteria = _buildFilterCriteria({
            byUserId: order.buyer._id,
            aboutUserId: order.seller._id
        })
        const orderToAdd = {
            ...filterCriteria,
            content: order
        }

        const returnedOrder = await OrderModel.create(orderToAdd)
        return returnedOrder
    } catch (err) {
        logger.error('cannot add order', err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const order = await OrderModel.findById(orderId)
        return order
    } catch (err) {
        logger.error(`while finding order ${orderId}`, err)
        throw err
    }
}

async function update(filterBy, order) {
    try {
        const filterCriteria = _buildFilterCriteria(filterBy)
        logger.debug('filterCriteria', filterCriteria)
        const updateMethod = _buildUpdateMethod(order)
        logger.debug('updateMethod', updateMethod)

        const updatedOrder = await OrderModel.findOneAndUpdate(filterCriteria, updateMethod, { returnOriginal: false, upsert: false })
        if (!updatedOrder) throw new Error('Error updating order') // TODO: clearly understand the scenarios where updatedOrder is null, and mention them here

        return updatedOrder
    } catch (err) {
        logger.error('cannot update order', err)
        throw err
    }
}
// ===================================================================
// ============== Verified working - but NOT being used ==============
async function remove(orderId) {
    try {
        const filterCriteria = _buildFilterCriteria({ orderId })
        const { deletedCount } = await OrderModel.deleteOne(filterCriteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}
// ===================================================================



function _buildFilterCriteria(filterBy) {
    let criteria = {}
    if (filterBy.orderId) criteria._id = filterBy.orderId
    if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
    if (filterBy.aboutUserId) criteria.aboutUserId = filterBy.aboutUserId
    return criteria
}

function _buildUpdateMethod(order) {
    // TODO: improve upon this order update method
    let updateMethod = { $set: {} }
    if (order.content.status) updateMethod.$set["content.status"] = order.content.status

    return updateMethod
}
