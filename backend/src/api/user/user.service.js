import { UserModel } from '../../database/model/user.ts'
import { logger } from '../../service/logger.service.js'


export const userService = {
    // ====================== Confirmed Being Used ======================
    getById,
    getByUsername,
    create,
    addTrip,
    // ==================================================================
    // =================== Confirmed works but unused ===================
    remove,
    // ==================================================================
}

// ====================== Confirmed Being Used ======================
async function getById(userId) {
    try {
        const user = await UserModel.findById(userId)
        return user
    } catch (err) {
        logger.error(`while finding user by id: ${userId}`, err)
        throw err
    }
}

async function getByUsername(username) {
    try {
        const user = await UserModel.findOne({ username })
        return user
    } catch (err) {
        logger.error(`while finding user by username: ${username}`, err)
        throw err
    }
}

async function create(user) {
    try {
        const userToAdd = {
            username: user.username,
            password: user.password,
            fullname: user.fullname,
            imgUrl: user.imgUrl
        }
        await UserModel.create(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot add user', err)
        throw err
    }
}

async function addTrip(userId, orderId) {
    try {
        const updatedUser = await UserModel.findOneAndUpdate({ _id: userId }, { $push: { trip: { orderId } } }, { returnOriginal: false })
        return updatedUser
    } catch (err) {
        logger.error(`failed to add order ${orderId} to user ${userId}`, err)
        throw err
    }
}


// ==================================================================
// =================== Confirmed works but unused ===================
async function remove(userId) {
    try {
        await UserModel.deleteOne({ _id: userId })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}
// ==================================================================