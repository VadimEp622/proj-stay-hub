import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { reviewService } from '../review/review.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

export const userService = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    updateWishlist,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find(criteria).toArray()
        users = users.map(user => {
            delete user.password
            user.createdAt = ObjectId(user._id).getTimestamp()
            // Returning fake fresh data
            // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return user
        })
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}


async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ _id: ObjectId(userId) })
        delete user.password

        user.givenReviews = await reviewService.query({ byUserId: ObjectId(user._id) })
        user.givenReviews = user.givenReviews.map(review => {
            delete review.byUser
            return review
        })

        return user
    } catch (err) {
        logger.error(`while finding user by id: ${userId}`, err)
        throw err
    }
}
async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        logger.error(`while finding user by username: ${username}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ _id: ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(user) {
    try {
        // peek only updatable properties
        const userToSave = {
            _id: ObjectId(user._id), // needed for the returnd obj
            fullname: user.fullname,
            wishlist: user.wishlist,
            trip: user.trip,
            username: user.username
        }
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
        return userToSave
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function updateWishlist(user, stay) {
    try {
        const isWishlist = user.wishlist.some(wishlist => wishlist._id === stay._id)
        const collection = await dbService.getCollection('user')

        if (isWishlist) {
            // removing from wishlist here

            await collection.updateOne(
                { _id: ObjectId(user._id) },
                { $pull: { wishlist: { _id: stay._id } } }
            )
            console.log('wishlist removed')
            return { stayId: stay._id, wishlistStatus: 'removed' }
        } else {
            // adding to wishlist here

            collection.updateOne(
                { _id: ObjectId(user._id) },
                {
                    $push: {
                        wishlist: {
                            $each: [stay],
                            $position: 0
                        }
                    }
                }
            )
            console.log('wishlist added')
            return { stayId: stay._id, wishlistStatus: 'added' }
        }
    } catch (err) {
        logger.error(`cannot update user ${user._id} wishlist for stay ${stay._id}`, err)
        throw err
    }
}

async function add(user) {
    try {
        // peek only updatable fields!
        const userToAdd = {
            username: user.username,
            password: user.password,
            fullname: user.fullname,
            imgUrl: user.imgUrl,
            wishlist: [],
            trip: [],
        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot add user', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.score = { $gte: filterBy.minBalance }
    }
    return criteria
}




