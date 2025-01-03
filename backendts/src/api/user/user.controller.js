import { userService } from './user.service.js'
import { logger } from '../../service/logger.service.js'

// ====================== Confirmed Being Used ======================
export async function getUser(req, res) {
    try {
        const userId = req.params.id
        const user = await userService.getById(userId)
        // logger.info('Get user by userId:', userId)
        res.send(user)
    } catch (err) {
        logger.error('Failed to get user', err)
        res.status(400).send({ err: 'Failed to get user' })
    }
}

export async function addUserTrip(req, res) {
    const userId = req.params.id
    const orderId = req.body.orderId
    try {
        const updatedUser = await userService.addTrip(userId, orderId)
        // logger.info('Update user - add tripId to trips array',userId)
        res.send(updatedUser)
    } catch (err) {
        logger.error('Failed adding trip to user', err)
        res.status(400).send({ err: 'Failed adding trip to user' })
    }
}

// TODO: needs to be improved
export async function updateUserWishlist(req, res) {
    const userId = req.params.id
    const { _id, imgUrls, loc, type, bedrooms, price, availableDates, reviews } = req.body
    const wishlistStay = { _id, imgUrls, loc, type, bedrooms, price, availableDates, reviews }
    try {
        const user = await userService.getById(userId)
        if (!user) throw new Error('User not found')
        const updateReport = await userService.updateWishlist(user, wishlistStay)
        // logger.info('Updated wishlist', updateReport.wishlistStatus, `stayId: ${updateReport.stayId}`)
        res.send(updateReport)
    } catch (err) {
        logger.error('Failed to update user wishlist', err)
        res.status(400).send({ err: 'Failed to update user wishlist' })
    }
}
// ==================================================================
// =================== Confirmed works but unused ===================
export async function getUsers(req, res) {
    try {
        const filterBy = {
            txt: req.query?.txt || '',
            minBalance: +req.query?.minBalance || 0
        }
        const users = await userService.query(filterBy)
        res.send(users)
    } catch (err) {
        logger.error('Failed to get users', err)
        res.status(400).send({ err: 'Failed to get users' })
    }
}

export async function updateUser(req, res) {
    const userId = req.params.id
    const user = req.body
    try {
        const savedUser = await userService.update(userId, user)
        res.send(savedUser)
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(400).send({ err: 'Failed to update user' })
    }
}

export async function deleteUser(req, res) {
    const userId = req.params.id
    try {
        await userService.remove(userId)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete user', err)
        res.status(400).send({ err: 'Failed to delete user' })
    }
}
// ==================================================================