import { OrderModel } from '../../model/order.ts'
import { logger } from '../../service/logger.service.js'


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
        return orders
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
    if (filterBy.byUserId) criteria['content.buyer._id'] = filterBy.byUserId
    if (filterBy.aboutUserId) criteria['content.seller._id'] = filterBy.aboutUserId
    return criteria
}

function _buildUpdateMethod(order) {
    // TODO: improve upon this order update method
    let updateMethod = { $set: {} }
    if (order.content.status) updateMethod.$set["content.status"] = order.content.status

    return updateMethod
}
